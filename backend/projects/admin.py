from django.contrib import admin
from django.utils.html import format_html
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'preview')
    search_fields = ('title', 'summary')
    list_filter = ('created_at',)
    
    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" style="border-radius:6px;object-fit:cover;"/>', obj.image.url)
        return "-"
    preview.short_description = "Image"
