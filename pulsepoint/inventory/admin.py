from django.contrib import admin
from datetime import datetime, timedelta 
from .models import Supplier, Medicine, StockTransaction
from django.utils.html import format_html
from .models import PurchaseOrder
from django.urls import path
from .models import Medicine
from django.shortcuts import render
from .views import qr_scanner_view
import cv2
import re
from django.shortcuts import redirect

def qr_scanner_view(request):
    return render(request, 'qr_scanner.html')

admin.site.site_header = "Inventory Management Portal"
admin.site.site_title = "Inventory Portal"
admin.site.index_title = "Welcome to the Inventory Management Portal"


# from django.contrib import admin
# from django.apps import apps

# celery_models = [
#     'ClockedSchedule',
#     'CrontabSchedule',
#     'IntervalSchedule',
#     'PeriodicTask',
#     'SolarSchedule',
# ]

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'contact_person', 'phone_number', 'email']


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'supplier', 'stock_quantity', 'expiry_date', 'medicine_alerts']
    exclude = ['low_stock_threshold', 'last_alerted']

    def medicine_alerts(self, obj):
        if obj.expiry_date and obj.expiry_date <= datetime.now().date() + timedelta(days=30):
            return format_html('<span style="color: red;">Expiring Soon</span>')
        elif obj.stock_quantity <= 10:
            return format_html('<span style="color: orange;">Low Stock</span>')
        return "OK"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("qr-scanner/", self.admin_site.admin_view(self.qr_scanner_view), name="qr_scanner"),
        ]
        return custom_urls + urls

    def qr_scanner_view(self, request):
        cap = cv2.VideoCapture(0)
        detector = cv2.QRCodeDetector()

        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                data, _, _ = detector.detectAndDecode(frame)
                if data:
                    name_match = re.search(r"Name:\s*(.+)", data)
                    description_match = re.search(r"Description:\s*(.+)", data)
                    expiry_date_match = re.search(r"Expiry Date:\s*(.+)", data)

                    if not name_match or not description_match or not expiry_date_match:
                        cap.release()
                        cv2.destroyAllWindows()
                        return redirect("/admin/inventory/medicine/add/")

                    name = name_match.group(1).strip()
                    description = description_match.group(1).strip()
                    expiry_date = expiry_date_match.group(1).strip()

                    cap.release()
                    cv2.destroyAllWindows()

                    return redirect(
                        f"/admin/inventory/medicine/add/?name={name}&description={description}&expiry_date={expiry_date}"
                    )

                cv2.imshow("QR Code Scanner", frame)

                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break
        finally:
            cap.release()
            cv2.destroyAllWindows()

        return redirect("/admin/inventory/medicine/")

    def add_view(self, request, form_url="", extra_context=None):
        name = request.GET.get("name", "")
        description = request.GET.get("description", "")
        expiry_date = request.GET.get("expiry_date", "")

        request.GET = request.GET.copy()
        request.GET.update({"name": name, "description": description, "expiry_date": expiry_date})

        return super().add_view(request, form_url=form_url, extra_context=extra_context)


    def add_view(self, request, form_url="", extra_context=None):
        """
        Pre-fill the Add Medicine form with scanned QR data.
        """
        name = request.GET.get("name", "")
        initial = {"name": name}
        extra_context = extra_context or {}
        extra_context["form_initial"] = initial
        return super().add_view(request, form_url, extra_context)

@admin.register(StockTransaction)
class StockTransactionAdmin(admin.ModelAdmin):
    list_display = ['medicine', 'transaction_type', 'quantity', 'date']
    list_filter = ['transaction_type', 'date']

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ['medicine','supplier', 'quantity', 'order_date', 'status']
    list_filter = ['status', 'order_date']

