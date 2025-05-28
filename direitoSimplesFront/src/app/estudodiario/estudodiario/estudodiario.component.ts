import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudoDiarioService } from '../estudodiario.service';
import { CommonModule } from '@angular/common';
import { InicionavbarComponent } from '../../inicionavbar/inicionavbar.component';
import { PontuacaoComponent } from '../../pontuacao/pontuacao.component';


@Component({
  selector: 'app-estudo-diario',
  standalone: true,
  imports: [CommonModule,InicionavbarComponent, PontuacaoComponent],
  templateUrl: './estudodiario.component.html',
  styleUrls: ['./estudodiario.component.scss'],
})
export class EstudoDiarioComponent implements OnInit {
  etapas = [1, 2, 3, 4];
  etapaAtual = 0;
  finalizado = false;

  constructor(
    private estudoService: EstudoDiarioService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.estudoService.iniciarEstudo().subscribe({
    next: (res) => {
      console.log('Estudo iniciado ou já existente', res);
      this.getProgresso(); 
    }
  });
}


  getProgresso() {
    this.estudoService.getProgresso().subscribe({
      next: (res) => {
        this.etapaAtual = res.etapa_atual - 1;
        this.finalizado = res.finalizado;
      },
      error: (err) => {
        console.error('Erro ao buscar progresso', err);
      },
    });
  }

  iniciarEtapa(index: number) {
    if (index > this.etapaAtual || this.finalizado) return;

    this.estudoService.getQuestaoRandom().subscribe({
      next: (res) => {
        this.router.navigate(['/questions', res.questao_id]);
      },
      error: (err) => {
        console.error('Erro ao abrir questão', err);
      },
    });
  }
}
