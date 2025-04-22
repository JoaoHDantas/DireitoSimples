from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from inicioapp.models import Simulado, SimuladoRespondido, Resposta
from .serializers import (
    SimuladoSerializer, CriarSimuladoSerializer,
    SimuladoRespondidoSerializer, RespostaSerializer
)
from direitoapp.models import Question

class SimuladoViewSet(viewsets.ModelViewSet):
    queryset = Simulado.objects.all()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CriarSimuladoSerializer
        return SimuladoSerializer

class SimuladoRespondidoViewSet(viewsets.ModelViewSet):
    serializer_class = SimuladoRespondidoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SimuladoRespondido.objects.filter(usuario=self.request.user)

    def create(self, request):
        simulado_id = request.data.get('simulado_id')
        simulado = Simulado.objects.get(id=simulado_id)

        # Criar novo simulado respondido
        simulado_respondido = SimuladoRespondido.objects.create(
            simulado=simulado,
            usuario=request.user
        )

        return Response({'simulado_respondido_id': simulado_respondido.id}, status=201)

    @action(detail=True, methods=['post'])
    def responder(self, request, pk=None):
        simulado_resp = self.get_object()
        questao_id = request.data.get('questao_id')
        resposta_usuario = request.data.get('resposta_usuario')

        resposta, created = Resposta.objects.update_or_create(
            simulado_respondido=simulado_resp,
            questao_id=questao_id,
            defaults={'resposta_usuario': resposta_usuario}
        )

        return Response({'status': 'resposta salva'})

    @action(detail=True, methods=['post'])
    def finalizar(self, request, pk=None):
        simulado_resp = self.get_object()
        simulado_resp.finalizado = True
        simulado_resp.save()

        resultados = []
        for resposta in simulado_resp.respostas.all():
            correta = resposta.questao.correct_answer
            resultados.append({
                'questao_id': resposta.questao.id,
                'questao_texto': resposta.questao.question_text,
                'sua_resposta': resposta.resposta_usuario,
                'resposta_correta': correta,
                'acertou': resposta.resposta_usuario == correta
            })

        return Response({'resultados': resultados})
