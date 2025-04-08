from rest_framework.routers import DefaultRouter
from .viewsets import RegisterViewSet, LoginViewSet, HomepageViewSet, QuestionViewSet

router = DefaultRouter()
router.register('register', RegisterViewSet, basename="register")
router.register('login', LoginViewSet, basename="login")
router.register('home', HomepageViewSet, basename='homepage') 
router.register('questions', QuestionViewSet,  basename='question')
