from rest_framework import serializers
from django.contrib.auth import authenticate
from direitoapp.models import CustomUser, Question, FAQ, Artigo, Download

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'cpf', 'endereco', 'data_nascimento', 'bio', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Criptografa a senha corretamente
        user.save()
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

