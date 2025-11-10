from django.urls import path, include
from rest_framework.routers import DefaultRouter
from resources.views import PublicationViewSet, GalleryEventViewSet
from projects.views import ProjectViewSet  # if you already have this

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'publications', PublicationViewSet, basename='publications')
router.register(r'gallery', GalleryEventViewSet, basename='gallery')      # <-- events (folders)


urlpatterns = [
    path('', include(router.urls)),
]
