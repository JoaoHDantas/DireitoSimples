from rest_framework import serializers
from ..models import EstudoDiario, EstudoDiarioResposta


class EstudoDiarioRespostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudoDiarioResposta
        fields = '__all__'


class EstudoDiarioSerializer(serializers.ModelSerializer):
    respostas = EstudoDiarioRespostaSerializer(many=True, read_only=True)

    class Meta:
        model = EstudoDiario
        fields = ['id', 'usuario', 'data', 'etapa_atual', 'finalizado', 'respostas']
