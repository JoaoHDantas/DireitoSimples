from rest_framework.routers import DefaultRouter
from django.urls import path
from .viewsets import EstudoDiarioViewSet

router = DefaultRouter()
router.register(r'estudo-diario', EstudoDiarioViewSet, basename='estudo-diario')
