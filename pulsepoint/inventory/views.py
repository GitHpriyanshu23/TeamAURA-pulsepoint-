from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Medicine
from .forms import MedicineForm
import cv2
import json
import re
from django.shortcuts import render
from django.shortcuts import redirect
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MedicineSerializer
from rest_framework.views import APIView
from rest_framework import status
from .models import Hospital
from .serializers import HospitalSerializer
from .models import Patient, Bed
from .serializers import PatientSerializer
from django.utils.timezone import now
from django.db.models import Case, When
from django.utils import timezone
from .models import Patient
from .serializers import BedSerializer



def scan_qr_code(request):
    """
    Scans a QR code using the device camera and processes the data.
    If the QR code matches a medicine in the database, it updates the fields.
    Otherwise, it creates a new medicine entry.
    """
    
    cap = cv2.VideoCapture(0)

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                return JsonResponse({'error': 'Unable to access the camera.'}, status=500)

           
            detector = cv2.QRCodeDetector()
            data, _, _ = detector.detectAndDecode(frame)

            if data:  
                print(f"Scanned Data: {data}")  
                name_match = re.search(r"Name:\s*(.+)", data)
                description_match = re.search(r"Description:\s*(.+)", data)
                expiry_date_match = re.search(r"Expiry Date:\s*(.+)", data)

                if not (name_match and description_match and expiry_date_match):
                    cap.release()
                    cv2.destroyAllWindows()
                    return JsonResponse({'error': 'Invalid QR code format.'}, status=400)

                name = name_match.group(1).strip()
                description = description_match.group(1).strip()
                expiry_date = expiry_date_match.group(1).strip()

                try:
                    expiry_date = datetime.strptime(expiry_date, "%Y-%m-%d").date()
                except ValueError:
                    cap.release()
                    cv2.destroyAllWindows()
                    return JsonResponse({'error': 'Invalid expiry date format.'}, status=400)
                cap.release()
                cv2.destroyAllWindows()
                return redirect(
                    f"/admin/inventory/medicine/add/?name={name}&description={description}&expiry_date={expiry_date}"
                )

            cv2.imshow('QR Code Scanner', frame)

           
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()

    return JsonResponse({'error': 'No QR code detected.'}, status=400)

def edit_medicine(request, pk):
    """
    View to edit a medicine's details. This is the target page after a successful QR scan.
    """
    medicine = get_object_or_404(Medicine, pk=pk)
    if request.method == 'POST':
        form = MedicineForm(request.POST, instance=medicine)
        if form.is_valid():
            form.save()
            return redirect('admin:inventory_medicine_changelist')
    else:
        form = MedicineForm(instance=medicine)
    return render(request, 'edit_medicine.html', {'form': form})
    
@csrf_exempt
def update_stock(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            medicine_id = data['medicine_id']
            quantity_change = data['quantity_change']

            # Get the medicine
            medicine = Medicine.objects.get(id=medicine_id)

            # Update the stock quantity
            medicine.stock_quantity += quantity_change
            if medicine.stock_quantity < 0:
                return JsonResponse({'error': 'Insufficient stock'}, status=400)

            medicine.save()

            return JsonResponse({'message': 'Stock updated successfully'}, status=200)
        except Medicine.DoesNotExist:
            return JsonResponse({'error': 'Medicine not found'}, status=404)
        except KeyError:
            return JsonResponse({'error': 'Invalid data format'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def qr_scanner_view(request):
    if request.method == "POST":
        try:

            data = json.loads(request.body)
            medicine_name = data.get("name")
            stock_quantity = data.get("stock_quantity", 0)
            expiry_date = data.get("expiry_date")  
            medicine, created = Medicine.objects.get_or_create(name=medicine_name)

            if not created:
                
                medicine.stock_quantity += stock_quantity
            else:
                
                medicine.stock_quantity = stock_quantity
                medicine.expiry_date = expiry_date


            medicine.save()

            return JsonResponse({"message": "Medicine added/updated successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return render(request, "admin/qr_scanner.html")  
@api_view(['GET'])
def get_inventory(request):
    medicines = Medicine.objects.all()
    serializer = MedicineSerializer(medicines, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_medicine(request):
    serializer = MedicineSerializer(data=request.data)  
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)



class HospitalListView(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = HospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class QueueManagementView(APIView):
    def post(self, request):
        print("Incoming Data:", request.data)  
        
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Data Saved Successfully")  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log validation errors if the data is invalid
        print("Validation Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        # Prioritize critical patients first
        patients = Patient.objects.annotate(
            priority=Case(
                When(criticalness='critical', then=1), 
                When(criticalness='non-critical', then=2),  
                default=3
            )
        ).order_by('priority', 'arrival_time')  
        
        
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)
    


class AdmitPatientView(APIView):
    def post(self, request):
        patient_id = request.data.get('patient_id')
        bed_id = request.data.get('bed_id')

        try:
            # Get patient and bed objects
            patient = Patient.objects.get(id=patient_id)
            bed = Bed.objects.get(bed_id=bed_id)

            if not bed.is_available:
                return Response({'error': 'Bed is not available.'}, status=status.HTTP_400_BAD_REQUEST)

            # Admit the patient
            patient.is_admitted = True
            patient.admission_date = timezone.now()
            patient.bed_assigned = bed.bed_id
            patient.save()

            # Update bed status
            bed.is_available = False
            bed.assigned_to = patient
            bed.save()

            return Response({'success': 'Patient admitted successfully.'}, status=status.HTTP_200_OK)

        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Bed.DoesNotExist:
            return Response({'error': 'Bed not found.'}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
def get_beds(request):
    beds = Bed.objects.all()
    serializer = BedSerializer(beds, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_bed(request):
    serializer = BedSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PATCH'])
def update_bed_availability(request, bed_id):
    try:
        bed = Bed.objects.get(bed_id=bed_id)
        bed.is_available = request.data.get('is_available', bed.is_available)
        bed.save()
        serializer = BedSerializer(bed)
        return Response(serializer.data, status=200)
    except Bed.DoesNotExist:
        return Response({"error": "Bed not found"}, status=404)
