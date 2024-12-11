import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pulsepoint.settings')
django.setup()

from inventory.utils import check_low_stock

# Run the low stock check
check_low_stock()
print("Low stock check completed.")
