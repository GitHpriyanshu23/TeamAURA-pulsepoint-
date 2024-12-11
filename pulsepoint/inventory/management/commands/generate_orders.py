from django.core.management.base import BaseCommand
from inventory.utils import auto_generate_purchase_orders

class Command(BaseCommand):
    help = "Auto-generate purchase orders for low-stock medicines"

    def handle(self, *args, **kwargs):
        auto_generate_purchase_orders()
        self.stdout.write("Purchase orders generated successfully.")
