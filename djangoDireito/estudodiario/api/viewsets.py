from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from datetime import date
from direitoapp.models import Question
from ..models import EstudoDiario, EstudoDiarioResposta
from .serializers import EstudoDiarioSerializer
import random


class EstudoDiarioViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # 🔍 Consulta o progresso do dia
    def list(self, request):
        estudo = EstudoDiario.objects.filter(usuario=request.user, data=date.today()).first()
        if estudo:
            serializer = EstudoDiarioSerializer(estudo)
            return Response(serializer.data)
        return Response({"mensagem": "Nenhum estudo diário iniciado hoje."})

    # 🚀 Inicia o estudo do dia (ou retorna existente)
    @action(detail=False, methods=['post'])
    def iniciar(self, request):
        estudo, created = EstudoDiario.objects.get_or_create(
            usuario=request.user, data=date.today()
        )
        if created:
            estudo.etapa_atual = 1
            estudo.save()
        return Response({'estudo_id': estudo.id, 'etapa_atual': estudo.etapa_atual})

    # 🔥 Retorna uma questão aleatória
    @action(detail=False, methods=['get'])
    def questao_random(self, request):
        questoes = Question.objects.all()

        if not questoes.exists():
            return Response({"erro": "Não há questões cadastradas."}, status=status.HTTP_404_NOT_FOUND)

        questao = random.choice(questoes)

        alternativas = {
            'A': questao.alternative_a,
            'B': questao.alternative_b,
            'C': questao.alternative_c,
            'D': questao.alternative_d,
            'E': questao.alternative_e,
        }

        return Response({
            "questao_id": questao.id,
            "texto": questao.question_text,
            "alternativas": alternativas
        })

    # ✅ Recebe a resposta do usuário
    @action(detail=False, methods=['post'])
    def responder(self, request):
        questao_id = request.data.get('questao_id')
        resposta_usuario = request.data.get('resposta')

        estudo = EstudoDiario.objects.get(usuario=request.user, data=date.today())
        questao = Question.objects.get(id=questao_id)

        correta = resposta_usuario == questao.correct_answer

        if correta:
            estudo.etapa_atual += 1
            if estudo.etapa_atual > 4:  # quantidade máxima de etapas
                estudo.finalizado = True
            estudo.save()

        EstudoDiarioResposta.objects.create(
            estudo_diario=estudo,
            questao=questao,
            resposta_usuario=resposta_usuario,
            correta=correta
        )

        return Response({
            'correta': correta,
            'etapa_atual': estudo.etapa_atual,
            'finalizado': estudo.finalizado
        })
    @action(detail=False, methods=['get'])
    def progresso(self, request):
        estudo = EstudoDiario.objects.filter(usuario=request.user, data=date.today()).first()
        if not estudo:
            return Response({"mensagem": "Estudo diário não iniciado."}, status=404)
        return Response({
            "etapa_atual": estudo.etapa_atual,
            "finalizado": estudo.finalizado
        })

