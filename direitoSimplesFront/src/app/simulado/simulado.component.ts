import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';   // Importar FormsModule
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SimuladoService } from './simulado.service'; // troque se o nome for outro

@Component({
  selector: 'app-simulado',
  standalone: true,  // Isso marca o componente como standalone
  imports: [CommonModule, FormsModule], 
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.scss']
})
export class SimuladoComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  respostas: { [key: number]: string } = {};
  finalizado = false;

  constructor(
    private questionService: QuestionService, 
    private router: Router,
    private route: ActivatedRoute,
    private simuladoService: SimuladoService,
  

  ) {}

  ngOnInit(): void {
    const simuladoId = Number(this.route.snapshot.paramMap.get('id'));
    this.simuladoService.getSimuladoById(simuladoId).subscribe((simulado) => {
      this.questions = simulado.questoes;  // agora vem só as questões daquele simulado
    });
  }

  responder(letra: string) {
    const id = this.questions[this.currentQuestionIndex].id;
    this.respostas[id] = letra;
  }

  irPara(index: number) {
    this.currentQuestionIndex = index;
  }

  finalizar() {
    this.finalizado = true;
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
  
}
