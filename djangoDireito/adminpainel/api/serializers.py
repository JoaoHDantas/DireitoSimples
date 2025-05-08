from djangoDireito.direitoapp.models import Question
from djangoDireito.inicioapp.api import serializers
from djangoDireito.inicioapp.models import Simulado


class CriarSimuladoSerializer(serializers.ModelSerializer):
    questoes = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        many=True
    )

    class Meta:
        model = Simulado
        fields = ['id', 'titulo', 'questoes']
