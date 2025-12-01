from django.db import models
from django.core.files.base import ContentFile
from django.conf import settings
from pdf2image import convert_from_path, convert_from_bytes
from PIL import Image
import os
import io

class Publication(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="publications/")
    preview_image = models.ImageField(upload_to="publications/previews/", blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def generate_preview(self, force=False):
        if not self.file:
            return
        if self.preview_image and not force:
            return

        try:
            images = convert_from_path(self.file.path, first_page=1, last_page=1)
            preview = images[0].convert("RGB")

            buffer = io.BytesIO()
            preview.save(buffer, format="JPEG", quality=85)
            buffer.seek(0)

            base, _ = os.path.splitext(os.path.basename(self.file.name))
            preview_name = f"{base}_preview.jpg"

            self.preview_image.save(
                preview_name,
                ContentFile(buffer.read()),
                save=False
            )
            buffer.close()
            self.save(update_fields=["preview_image"])
        except Exception as e:
            print(f"[ERROR] Preview generation failed: {e}")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.generate_preview(force=False)


class GalleryEvent(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)  # ⭐ Add this

    def __str__(self):
        return self.name

    def image_count(self):
        return self.images.count()
    image_count.short_description = "Images"


class GalleryItem(models.Model):
    event = models.ForeignKey(
        GalleryEvent,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ImageField(upload_to="gallery/%Y/%m/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.event.name} - {self.image.name.split('/')[-1]}"
