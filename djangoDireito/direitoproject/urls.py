from django.contrib import admin
from django.urls import path, include
from direitoapp.api.router import router as direito_router
from inicioapp.api.router import router as simulado_router
from adminpainel.api.router import admin_router as admin_router
from estudodiario.api.router import router as estudo_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(direito_router.urls)),
    path('api/', include(simulado_router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/admin/', include(admin_router.urls)),
    path('api/gamificacao/', include('gamificacao.api.router')),
    path('api/', include(estudo_router.urls)),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
