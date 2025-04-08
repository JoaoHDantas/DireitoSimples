from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True, blank=True, null=True)

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