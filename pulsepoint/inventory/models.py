from django.db import models
from decimal import Decimal
from bson.decimal128 import Decimal128

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return self.name


class Medicine(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    supplier = models.ForeignKey('Supplier', on_delete=models.CASCADE, related_name='medicines')
    stock_quantity = models.PositiveIntegerField(default=0)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateField(blank=True, null=True)
    low_stock_threshold = models.PositiveIntegerField(default=10)
    last_alerted = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if isinstance(self.price_per_unit, Decimal128):
            self.price_per_unit = self.price_per_unit.to_decimal()
        elif isinstance(self.price_per_unit, str):
            self.price_per_unit = Decimal(self.price_per_unit)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class StockTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
    ]
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    quantity = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.medicine.name}"
    
class PurchaseOrder(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]
    
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='purchase_orders')
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='purchase_orders', default=1)
    quantity = models.PositiveIntegerField()
    order_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Order for {self.medicine.name} from {self.supplier.name} - {self.quantity} units"

