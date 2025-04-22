from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from direitoapp.models import CustomUser, Question
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated 
from .serializers import UserSerializer, LoginSerializer, HomepageSerializer, QuestionSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Gera o refresh token e access token
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
        user = serializer.validated_data['user']  # Pega o usuário validado

        # Gerar o refresh token e access token
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

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