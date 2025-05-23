import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SimuladoService } from './simulado.service';

@Component({
  selector: 'app-simulado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.scss']
})
export class SimuladoComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  respostas: { [key: number]: string } = {};
  finalizado = false;
  simuladoRespondidoId!: number;
  resultados: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private simuladoService: SimuladoService,
  ) {}

  ngOnInit(): void {
    const simuladoId = Number(this.route.snapshot.paramMap.get('id'));

    // 🔥 Carregar as questões do simulado
    this.simuladoService.getSimuladoById(simuladoId).subscribe((simulado) => {
      this.questions = simulado.questoes;
    });

    // 🔥 Criar simulado respondido no backend
    this.simuladoService.criarSimuladoRespondido(simuladoId).subscribe({
      next: (res) => {
        console.log('Simulado Respondido Criado:', res);
        this.simuladoRespondidoId = res.simulado_respondido_id;
      },
      error: (err) => {
        console.error('Erro ao criar simulado respondido:', err);
      }
    });
  }



  responder(letra: string) {
    const id = this.questions[this.currentQuestionIndex].id;
    this.respostas[id] = letra;

    // 🔥 Enviar resposta para o backend
    this.simuladoService.enviarResposta(this.simuladoRespondidoId, id, letra).subscribe({
      next: (res) => {
        console.log('Resposta salva:', res);
      },
      error: (err) => {
        console.error('Erro ao enviar resposta:', err);
      }
    });
  }


  irPara(index: number) {
    this.currentQuestionIndex = index;
  }

  finalizar() {
    if (!this.simuladoRespondidoId) {
      console.error('Simulado Respondido ID não encontrado. Não é possível finalizar.');
      return;
    }

    this.simuladoService.finalizarSimulado(this.simuladoRespondidoId).subscribe({
      next: (res) => {
        console.log('Resultado do simulado:', res);
        this.resultados = res;
        this.finalizado = true;
      },
      error: (err) => {
        console.error('Erro ao finalizar simulado:', err);
      }
    });
  }



  respostaCorreta(id: number, correta: string): boolean {
    return this.respostas[id] === correta;
  }

  toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Erro ao tentar ativar o modo tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  voltarHome() {
    this.router.navigate(['/home/']);
  }

  voltarSimulado() {
    this.router.navigate(['/simulados/']);
  }

  getProgress(): number {
    if (this.questions.length === 0) return 0;
    return Math.round(((this.currentQuestionIndex) / this.questions.length) * 100);
  }
}
