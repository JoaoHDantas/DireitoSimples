from django.contrib import admin
from django.urls import path, include
from direitoapp.api.router import router as direito_router
from inicioapp.api.router import router as simulado_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(direito_router.urls)),
    path('api/', include(simulado_router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
