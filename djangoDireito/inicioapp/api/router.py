from rest_framework.routers import DefaultRouter
from inicioapp.api.viewsets import SimuladoViewSet, SimuladoRespondidoViewSet

router = DefaultRouter()
router.register(r'simulados', SimuladoViewSet, basename='simulado')
router.register(r'simulados-respondidos', SimuladoRespondidoViewSet, basename='simulado-respondido')