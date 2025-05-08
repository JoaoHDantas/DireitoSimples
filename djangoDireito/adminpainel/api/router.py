# adminpainel/router.py

from rest_framework.routers import DefaultRouter
from adminpainel.api.viewsets import AdminQuestionViewSet, AdminSimuladoViewSet

admin_router = DefaultRouter()
admin_router.register(r'questions', AdminQuestionViewSet, basename='admin-questions')
admin_router.register(r'simulados', AdminSimuladoViewSet, basename='admin-simulados')
