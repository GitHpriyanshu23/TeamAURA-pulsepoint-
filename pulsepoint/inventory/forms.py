from django import forms
from .models import Medicine

class MedicineForm(forms.ModelForm):
    class Meta:
        model = Medicine
        fields = '__all__'

    qr_data = forms.CharField(
        label='Scan QR Code (Optional)',
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Scan QR Code',
            'readonly': 'readonly',
            'style': 'background-color: #f5f5f5; cursor: pointer;'
        }),
    )
