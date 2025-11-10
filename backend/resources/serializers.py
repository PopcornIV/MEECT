from rest_framework import serializers
from .models import Publication, GalleryEvent, GalleryItem


# 📘 Publications Serializer
class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ["id", "title", "description", "file", "preview_image", "uploaded_at"]


# 🖼️ Gallery Item Serializer (images in each event)
class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = ["id", "image", "is_cover", "uploaded_at"]


# 📂 Gallery Event Serializer (each event with its images)
class GalleryEventSerializer(serializers.ModelSerializer):
    images = GalleryItemSerializer(many=True, read_only=True)

    class Meta:
        model = GalleryEvent
        fields = ["id", "name", "created_at", "images"]
