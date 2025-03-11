from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from direitoapp.models import CustomUser
from rest_framework.permissions import IsAuthenticated 
from .serializers import UserSerializer, LoginSerializer, HomepageSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Gerar o refresh token e access token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        return Response({
            'refresh': str(refresh),  # Token de refresh
            'access': str(access_token),  # Token de access
            'user_id': user.id,
        }, status=status.HTTP_201_CREATED)

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # Pega o usuário validado

        # Gerar o refresh token e access token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        return Response({
            'refresh': str(refresh),  # Token de refresh
            'access': str(access_token),  # Token de access
            'user_id': user.id,
        }, status=status.HTTP_200_OK)

class HomepageViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]  

    def list(self, request):
        data = {
            "message": "Bem-vindo à sua homepage!",
            "status": "sucesso",
            "items": ["Item 1", "Item 2", "Item 3"], 
        }
        serializer = HomepageSerializer(data)
        return Response(serializer.data)