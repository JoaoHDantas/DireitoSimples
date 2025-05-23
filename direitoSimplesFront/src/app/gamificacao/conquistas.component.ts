import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamificacaoService } from '../gamificacao.service';
import { InicionavbarComponent } from '../inicionavbar/inicionavbar.component';

@Component({
  selector: 'app-conquistas',
  standalone: true,
  imports: [CommonModule, InicionavbarComponent],
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss']
})

export class ConquistasComponent implements OnInit {
  pontos = 0;
  conquistas: any[] = [];

  constructor(private gamificacaoService: GamificacaoService) {}

  ngOnInit(): void {
    this.gamificacaoService.getConquistasDoUsuario().subscribe({
      next: (res) => {
        this.pontos = res.pontos;
        this.conquistas = res.conquistas;
      },
      error: (err) => {
        console.error('Erro ao carregar conquistas', err);
      }
    });
  }
}
