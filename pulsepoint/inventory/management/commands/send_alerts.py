from django.core.management.base import BaseCommand
from inventory.utils import send_alert_email

class Command(BaseCommand):
    help = "Send email alerts for low stock and expiring medicines"

    def handle(self, *args, **kwargs):
        send_alert_email()
        self.stdout.write("Email alerts sent successfully.")
