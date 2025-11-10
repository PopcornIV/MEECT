from django.db import models
from django.core.files.base import ContentFile
from pdf2image import convert_from_path
from io import BytesIO
import os


class Publication(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="publications/")
    preview_image = models.ImageField(upload_to="publications/previews/", blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=True)


    def __str__(self):
        return self.title

    def generate_preview(self):
        """
        Creates a JPEG preview from the first page of the uploaded PDF.
        Requires Poppler to be installed and on PATH.
        """
        if not self.file:
            return

        try:
            # Convert the first page only
            pages = convert_from_path(self.file.path, dpi=100, first_page=1, last_page=1)

            if pages:
                image = pages[0]
                buffer = BytesIO()
                image.save(buffer, format="JPEG")
                image_content = ContentFile(buffer.getvalue())

                # Save to the preview_image field
                filename = os.path.splitext(os.path.basename(self.file.name))[0] + "_preview.jpg"
                self.preview_image.save(filename, image_content, save=False)
        except Exception as e:
            print("⚠️ Error generating PDF preview:", e)

    def save(self, *args, **kwargs):
        """
        Overridden save method to auto-generate preview after uploading.
        """
        super().save(*args, **kwargs)

        # Generate preview only if PDF file exists but no preview yet
        if self.file and not self.preview_image:
            self.generate_preview()
            super().save(update_fields=["preview_image"])

class GalleryEvent(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=True)


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
