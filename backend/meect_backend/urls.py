"""
URL configuration for meect_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.template.response import TemplateResponse

from projects.models import Project
from resources.models import Publication, GalleryItem
from contact.models import ContactMessage
from django.conf import settings

admin.site.site_header = "MEECT Admin"
admin.site.site_title = "MEECT CMS"
admin.site.index_title = "Content Management"

# Set “View Site” button link
admin.site.site_url = settings.SITE_URL

# Custom admin index override
def custom_admin_dashboard(request):
    context = {
        **admin.site.each_context(request),
        "projects_count": Project.objects.count(),
        "publications_count": Publication.objects.count(),
        "gallery_count": GalleryItem.objects.count(),
        "contacts_count": ContactMessage.objects.count(),
    }
    return TemplateResponse(request, "admin/index.html", context)


admin.site.index = custom_admin_dashboard  # override admin dashboard

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
