from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from inventory.views import scan_qr_code,edit_medicine
from inventory.views import update_stock
from inventory.views import qr_scanner_view
from django.urls import path
from inventory import views
from django.urls import path
from inventory.views import HospitalListView
from inventory.views import QueueManagementView
from inventory.views import AdmitPatientView


def home_view(request):
    return HttpResponse("<h1>Welcome to the PulsePoint Inventory Management System!</h1>")

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', home_view),  
    path("qr-scanner/", qr_scanner_view, name="qr_scanner"),
    path('scan-qr/', views.scan_qr_code, name='scan_qr'),
    path('edit-medicine/<int:pk>/', edit_medicine , name='edit_medicine'),
    path('update-stock/', update_stock, name='update_stock'),
    path('api/inventory/', views.get_inventory, name='get_inventory'),
    path('api/inventory/add/', views.add_medicine, name='add_medicine'),
    path('api/hospitals/', HospitalListView.as_view(), name='hospital-list'),
    path('api/queue/', QueueManagementView.as_view(), name='queue-management'),
    path('api/queue/<int:pk>/', QueueManagementView.as_view(), name='queue-management-detail'),
    path('api/admit/', AdmitPatientView.as_view(), name='admit-patient'),
    

    path('api/beds/', views.get_beds, name='get_beds'),
    path('api/beds/add/', views.add_bed, name='add_bed'),
    path('api/beds/<str:bed_id>/', views.update_bed_availability, name='update_bed_availability'),
    
    
]
