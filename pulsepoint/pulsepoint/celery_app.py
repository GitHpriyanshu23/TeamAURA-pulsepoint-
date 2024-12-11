from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pulsepoint.settings')

app = Celery('pulsepoint')


app.config_from_object('django.conf:settings', namespace='CELERY_')


app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

app.conf.beat_schedule = {
    'check-low-stock-daily': {
        'task': 'inventory.tasks.check_low_stock',
        'schedule': crontab(hour=9, minute=0), 
    },
}