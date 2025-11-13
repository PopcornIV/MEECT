from django.urls import path, include
from rest_framework.routers import DefaultRouter
from resources.views import PublicationViewSet, GalleryEventViewSet
from projects.views import ProjectViewSet
from .views import ContactMessageViewSet  # <- use the viewset here

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'publications', PublicationViewSet, basename='publications')
router.register(r'gallery', GalleryEventViewSet, basename='gallery')
router.register(r'contact', ContactMessageViewSet, basename='contact')  # <- add this

urlpatterns = [
    path('', include(router.urls)),
]
