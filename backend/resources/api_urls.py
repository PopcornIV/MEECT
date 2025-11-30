from rest_framework.routers import DefaultRouter
from .views import GalleryEventViewSet, PublicationViewSet
from projects.views import ProjectViewSet

router = DefaultRouter()
router.register(r'gallery', GalleryEventViewSet, basename='gallery')
router.register(r'publications', PublicationViewSet, basename='publications')
router.register(r'projects', ProjectViewSet, basename='projects')

urlpatterns = router.urls
