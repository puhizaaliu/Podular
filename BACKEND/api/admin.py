from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Creator)
admin.site.register(models.PodcastCategory)
admin.site.register(models.Podcast)
admin.site.register(models.Customer)
admin.site.register(models.CustomerAddress)
admin.site.register(models.PodcastRating)
admin.site.register(models.PodcastImage)

