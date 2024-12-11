from celery import shared_task
from django.core.mail import send_mail
from .models import Medicine
from django.db.models import F


@shared_task
def check_low_stock():
    medicines = Medicine.objects.filter(stock_quantity__lte=F('low_stock_threshold'))
    for medicine in medicines:
        send_mail(
            subject=f"Low Stock Alert: {medicine.name}",
            message=f"The stock for {medicine.name} is critically low.\n\n"
                    f"Current Stock: {medicine.stock_quantity}\n"
                    f"Threshold: {medicine.low_stock_threshold}\n"
                    f"Please restock immediately.",
            from_email="noreply@example.com",
            recipient_list=["Priyanshuurmaliya2323@gmail.com"],
        )
        medicine.alert_count += 1
        medicine.save()
        if medicine.alert_count >= 2: 
            send_mail(
                subject=f"Purchase Order: {medicine.name}",
                message=f"We are placing an order for {medicine.name}.\n\n"
                        f"Please supply {medicine.low_stock_threshold * 2} units.",
                from_email="noreply@example.com",
                recipient_list=["supplier@example.com"],
            )
            medicine.alert_count = 0
            medicine.save()
