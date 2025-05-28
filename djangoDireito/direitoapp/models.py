from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True) 
    data_nascimento = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
    
class Question(models.Model):
    question_text = models.CharField(max_length=255)
    alternative_a = models.CharField(max_length=255)
    alternative_b = models.CharField(max_length=255)
    alternative_c = models.CharField(max_length=255)
    alternative_d = models.CharField(max_length=255)
    alternative_e = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')])

    def __str__(self):
        return self.question_text

class FAQ(models.Model):
    pergunta = models.CharField(max_length=255)
    resposta = models.TextField()

    def __str__(self):
        return self.pergunta
    
class Artigo(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    link = models.URLField()  # Link externo ou interno para leitura
    categoria = models.CharField(max_length=100, blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

class Download(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    arquivo = models.FileField(upload_to='downloads/')
    categoria = models.CharField(max_length=100, blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

