from django.urls import path
from .viewsets import ConquistasDoUsuarioView

urlpatterns = [
    path('minhas-conquistas/', ConquistasDoUsuarioView.as_view(), name='minhas-conquistas'),
]