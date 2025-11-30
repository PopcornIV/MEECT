from django.contrib import admin
from django.utils.html import format_html
from django import forms
from zipfile import ZipFile
from django.core.files.base import ContentFile
from django.urls import path, reverse
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Publication, GalleryEvent, GalleryItem
import os


# ---------------------- #
# 📘 Publications Admin  #
# ---------------------- #
@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ("title", "uploaded_at", "file_link")

    def file_link(self, obj):
        if obj.file:
            url = reverse("view_publication", args=[obj.id])
            return format_html(
                '<a href="{}" target="_blank" style="color:white; background:#2a7a3d; padding:4px 8px; border-radius:4px; text-decoration:none;">View</a>',
                url
            )
        return "-"
    file_link.short_description = "PDF"

# ----------------------------- #
# 📦 Gallery Bulk Upload Form   #
# ----------------------------- #
class GalleryZipUploadForm(forms.Form):
    event_name = forms.CharField(max_length=200, label="Event name")
    zip_file = forms.FileField(label="Upload ZIP file with images")


# ----------------------------- #
# 🖼️ Gallery Events Admin       #
# ----------------------------- #
@admin.register(GalleryEvent)
class GalleryEventAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "image_count", "view_images_link")
    search_fields = ("name",)
    list_filter = ("created_at",)
    change_list_template = "admin/gallery_event_change_list.html"

    def image_count(self, obj):
        """Show how many images belong to this event."""
        return obj.images.count()
    image_count.short_description = "Images"

    def view_images_link(self, obj):
        """Display a 'View' button linking to the related images."""
        url = reverse("admin:resources_galleryitem_changelist") + f"?event__id__exact={obj.id}"
        return format_html(
            '<a href="{}" class="button" '
            'style="background-color:#2a7a3d;color:white;padding:4px 10px;'
            'border-radius:4px;text-decoration:none;">View</a>',
            url,
        )
    view_images_link.short_description = "Gallery"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "bulk-upload/",
                self.admin_site.admin_view(self.bulk_upload),
                name="resources_galleryevent_bulk_upload",
            ),
        ]
        return custom_urls + urls

    def bulk_upload(self, request):
        """Handle ZIP upload and create a new event with extracted images."""
        if request.method == "POST":
            form = GalleryZipUploadForm(request.POST, request.FILES)
            if form.is_valid():
                event_name = form.cleaned_data["event_name"]
                zip_file = form.cleaned_data["zip_file"]

                # Create the event first
                event = GalleryEvent.objects.create(name=event_name)

                # Extract ZIP and create images
                with ZipFile(zip_file) as zf:
                    for filename in zf.namelist():
                        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
                            data = zf.read(filename)
                            image_name = os.path.basename(filename)
                            GalleryItem.objects.create(
                                event=event,
                                image=ContentFile(data, name=image_name),
                            )

                messages.success(request, f"✅ {event_name} uploaded successfully!")
                return redirect("..")
        else:
            form = GalleryZipUploadForm()

        return render(request, "admin/bulk_upload_form.html", {"form": form})

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("event", "uploaded_at", "thumbnail", "is_cover")
    search_fields = ("event__name",)
    list_filter = ("uploaded_at", "event")

    def thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="70" height="50" style="object-fit:cover; border-radius:4px;" />',
                obj.image.url,
            )
        return "-"
    thumbnail.short_description = "Preview"
