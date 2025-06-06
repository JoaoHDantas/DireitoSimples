# Generated by Django 5.1 on 2025-04-21 23:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('direitoapp', '0002_question'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Simulado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100)),
                ('descricao', models.TextField(blank=True)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('questoes', models.ManyToManyField(related_name='simulados', to='direitoapp.question')),
            ],
        ),
        migrations.CreateModel(
            name='SimuladoRespondido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('iniciado_em', models.DateTimeField(auto_now_add=True)),
                ('finalizado', models.BooleanField(default=False)),
                ('simulado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inicioapp.simulado')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Resposta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resposta_usuario', models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')], max_length=1)),
                ('questao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='direitoapp.question')),
                ('simulado_respondido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respostas', to='inicioapp.simuladorespondido')),
            ],
        ),
    ]
