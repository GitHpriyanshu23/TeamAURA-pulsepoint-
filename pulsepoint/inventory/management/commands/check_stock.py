from django.core.management.base import BaseCommand
from inventory.utils import check_low_stock

class Command(BaseCommand):
    help = 'Check for medicines with low stock and send alerts'

    def handle(self, *args, **kwargs):
        check_low_stock()
        self.stdout.write(self.style.SUCCESS('Low stock check completed successfully.'))
