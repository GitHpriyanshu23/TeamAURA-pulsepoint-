# Generated by Django 5.1.3 on 2024-12-11 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_patient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='queue_status',
        ),
        migrations.AddField(
            model_name='patient',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='department',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='doctor',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='hospital',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
