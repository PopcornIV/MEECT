from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.utils.html import format_html

admin.site.site_header = "MEECT Administration"
admin.site.site_title = "MEECT CMS"
admin.site.index_title = "Welcome to the MEECT Dashboard"

def custom_admin_css():
    return format_html('<link rel="stylesheet" type="text/css" href="{}">', staticfiles_storage.url('admin/custom.css'))

admin.site.index_template = 'admin/custom_index.html'
