from rest_framework import serializers
from .models import Publication, GalleryEvent, GalleryItem

# 📘 Publications Serializer
class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = [
            "id",
            "title",
            "description",
            "file",
            "preview_image",
            "is_featured",   
            "uploaded_at",
        ]


# 🖼️ Gallery Item Serializer
class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = [
            "id",
            "image",
            "is_cover",
            "uploaded_at",  
        ]


# 📂 Gallery Event Serializer
class GalleryEventSerializer(serializers.ModelSerializer):
    images = GalleryItemSerializer(many=True, read_only=True)

    class Meta:
        model = GalleryEvent
        fields = [
            "id",
            "name",
            "description",
            "created_at",
            "is_featured",   
            "images",
        ]
