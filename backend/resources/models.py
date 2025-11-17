from django.db import models

class Publication(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="publications/")
    preview_image = models.ImageField(upload_to="publications/previews/", blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)  # ⭐ Add this

    def __str__(self):
        return self.title


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
