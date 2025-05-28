from rest_framework.routers import DefaultRouter
from .viewsets import RegisterViewSet, LoginViewSet, HomepageViewSet, QuestionViewSet, PerfilViewSet, FAQViewSet, ArtigoViewSet, DownloadViewSet

router = DefaultRouter()
router.register('register', RegisterViewSet, basename="register")
router.register('login', LoginViewSet, basename="login")
router.register('home', HomepageViewSet, basename='homepage') 
router.register('questions', QuestionViewSet,  basename='question')
router.register(r'perfil', PerfilViewSet, basename='perfil')
router.register(r'faq', FAQViewSet, basename='faq')
router.register(r'artigos', ArtigoViewSet, basename='artigo')
router.register(r'downloads', DownloadViewSet, basename='download')



