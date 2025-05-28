from rest_framework import serializers
from django.contrib.auth import authenticate
from direitoapp.models import CustomUser, Question, FAQ, Artigo, Download

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'cpf', 'endereco', 'data_nascimento', 'bio']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data['username']
        password = data['password']

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Credenciais inválidas.")
        return {'user': user}  # Retorna o usuário no validated_data

class HomepageSerializer(serializers.Serializer):
    message = serializers.CharField()
    status = serializers.CharField()

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'pergunta', 'resposta']

class ArtigoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artigo
        fields = ['id', 'titulo', 'descricao', 'link', 'categoria', 'criado_em']


class DownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = ['id', 'titulo', 'descricao', 'arquivo', 'categoria', 'criado_em']

