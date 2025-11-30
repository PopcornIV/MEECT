import os
from django.core.wsgi import get_wsgi_application

# Set Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "meect_backend.settings")

# Initialize Django
application = get_wsgi_application()

# Serverless adapter
try:
    from mangum import Mangum
    handler = Mangum(application)
except ImportError:
    # Mangum not installed locally
    handler = application
