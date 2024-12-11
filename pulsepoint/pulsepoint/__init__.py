from __future__ import absolute_import, unicode_literals

# Updated import after renaming celery.py to celery_app.py
from .celery_app import app as celery_app

__all__ = ('celery_app',)
