from rest_framework import serializers
from gamificacao.models import ConquistaUsuario, Conquista

class ConquistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conquista
        fields = ['id', 'nome', 'descricao', 'pontos_necessarios', 'icone']

class UsuarioConquistaSerializer(serializers.ModelSerializer):
    conquista = ConquistaSerializer()

    class Meta:
        model = ConquistaUsuario
        fields = ['conquista', 'data_conquista']
