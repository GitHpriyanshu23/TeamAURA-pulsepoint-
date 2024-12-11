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