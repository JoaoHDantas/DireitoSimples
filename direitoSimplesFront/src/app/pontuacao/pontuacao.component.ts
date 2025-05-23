
import { Component } from '@angular/core';
import { GamificacaoService } from '../gamificacao.service';

@Component({
  selector: 'app-pontuacao',
  standalone: true,
  templateUrl: './pontuacao.component.html',
  styleUrl: './pontuacao.component.scss'
})
export class PontuacaoComponent {

    pontos = 0;
  
    constructor(private gamificacaoService: GamificacaoService) {}
  
    ngOnInit(): void {
      this.gamificacaoService.getConquistasDoUsuario().subscribe({
        next: (res) => {
          this.pontos = res.pontos;
        },
        error: (err) => {
          console.error('Erro ao carregar conquistas', err);
        }
      });
    }

}
