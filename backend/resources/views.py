from rest_framework import viewsets
from .models import GalleryEvent, Publication
from .serializers import GalleryEventSerializer, PublicationSerializer


class GalleryEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryEvent.objects.prefetch_related("images").order_by("-created_at")
    serializer_class = GalleryEventSerializer


class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Publication.objects.all().order_by("-uploaded_at")
    serializer_class = PublicationSerializer
