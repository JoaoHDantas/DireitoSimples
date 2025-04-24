from django.test import TestCase
from .models import Question

# Create your tests here.
class QuestionTest(TestCase):
    def setUp(self):
        self.question = Question.objects.create(
            question_text="Qual é a capital do Brasil?",
            alternative_a="São Paulo",
            alternative_b="Rio de Janeiro",
            alternative_c="Brasília",
            alternative_d="Belo Horizonte",
            alternative_e="Salvador",
            correct_answer="C"
        )

    def test_question_creation(self):
        self.assertEqual(Question.objects.count(), 1)
        self.assertEqual(self.question.question_text, "Qual é a capital do Brasil?")
        self.assertEqual(self.question.correct_answer, "D")