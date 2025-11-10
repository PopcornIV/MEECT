from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)


    def __str__(self):
        return self.title
