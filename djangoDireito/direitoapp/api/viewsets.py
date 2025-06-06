from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from direitoapp.models import CustomUser, Question
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated 
from .serializers import UserSerializer, LoginSerializer, HomepageSerializer, QuestionSerializer, FAQSerializer, ArtigoSerializer, DownloadSerializer
from gamificacao.utils import adicionar_pontos
from gamificacao.utils import login_diario
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import UserSerializer
from direitoapp.models import CustomUser, FAQ, Artigo, Download


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas o próprio usuário autenticado
        return CustomUser.objects.filter(id=self.request.user.id)

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



class RegisterViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        return Response({
            'refresh': str(refresh),
            'access': str(access_token),  
            'user_id': user.id,
        }, status=status.HTTP_201_CREATED)

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        login_diario(user)


        return Response({
            'refresh': str(refresh),
            'access': str(access_token), 
            'user_id': user.id,
        }, status=status.HTTP_200_OK)

class HomepageViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        data = {
            "message": "Bem-vindo à sua homepage!",
            "status": "sucesso",
        }
        return Response(data)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    def list(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            question = Question.objects.get(pk=pk)
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        except Question.DoesNotExist:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def submit_answers(self, request):
        answers = request.data
        response_data = []
        adicionar_pontos(request.user, 1)
        for question_id, answer in answers.items():
            try:
                question = Question.objects.get(id=question_id)
                is_correct = (question.correct_answer == answer)
                response_data.append({
                    'question_id': question_id,
                    'your_answer': answer,
                    'correct_answer': question.correct_answer,
                    'is_correct': is_correct
                })
            except Question.DoesNotExist:
                response_data.append({
                    'question_id': question_id,
                    'error': 'Question not found'
                })

        return Response(response_data)
    

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [AllowAny] 

class ArtigoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artigo.objects.all().order_by('-criado_em')
    serializer_class = ArtigoSerializer
    permission_classes = [IsAuthenticated]


class DownloadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Download.objects.all().order_by('-criado_em')
    serializer_class = DownloadSerializer
    permission_classes = [IsAuthenticated]
