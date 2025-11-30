from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.http import FileResponse, Http404
from .models import GalleryEvent, Publication
from .serializers import GalleryEventSerializer, PublicationSerializer
import mimetypes

# ----------------------------
# 🔹 DRF ViewSets
# ----------------------------
class GalleryEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryEvent.objects.prefetch_related("images").order_by("-created_at")
    serializer_class = GalleryEventSerializer

class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Publication.objects.all().order_by("-uploaded_at")
    serializer_class = PublicationSerializer

# ----------------------------
# 🔹 PDF Inline View
# ----------------------------
def view_publication(request, pk):
    """
    Serve a PDF inline in browser (not download)
    """
    pub = get_object_or_404(Publication, pk=pk)
    if not pub.file:
        raise Http404("No file attached.")
    return FileResponse(
        pub.file.open("rb"),
        as_attachment=False,
        content_type=mimetypes.guess_type(pub.file.name)[0] or "application/pdf"
    )
