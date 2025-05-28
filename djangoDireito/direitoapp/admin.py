from django.contrib import admin
from .models import FAQ, Artigo, Download

admin.site.register(Artigo)
admin.site.register(Download)
admin.site.register(FAQ)

