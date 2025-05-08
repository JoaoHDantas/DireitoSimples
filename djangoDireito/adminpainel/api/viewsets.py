from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from direitoapp.models import Question
from direitoapp.api.serializers import QuestionSerializer

from inicioapp.models import Simulado
from inicioapp.api.serializers import SimuladoSerializer
from inicioapp.api.serializers import SimuladoSerializer, CriarSimuladoSerializer


class AdminQuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]

class AdminSimuladoViewSet(viewsets.ModelViewSet):
    queryset = Simulado.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CriarSimuladoSerializer
        return SimuladoSerializer

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()
