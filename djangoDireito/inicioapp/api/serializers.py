from rest_framework import serializers
from inicioapp.models import Simulado, SimuladoRespondido, Resposta
from direitoapp.models import Question
from direitoapp.api.serializers import QuestionSerializer

class SimuladoSerializer(serializers.ModelSerializer):
    questoes = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Simulado
        fields = ['id', 'titulo', 'descricao', 'criado_em', 'questoes']

class CriarSimuladoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Simulado
        fields = ['id', 'titulo', 'descricao', 'questoes']

class RespostaSerializer(serializers.ModelSerializer):
    questao = QuestionSerializer(read_only=True)

    class Meta:
        model = Resposta
        fields = ['questao', 'resposta_usuario']

class SimuladoRespondidoSerializer(serializers.ModelSerializer):
    respostas = RespostaSerializer(many=True, read_only=True)
    simulado = SimuladoSerializer(read_only=True)

    class Meta:
        model = SimuladoRespondido
        fields = ['id', 'simulado', 'iniciado_em', 'finalizado', 'respostas']
