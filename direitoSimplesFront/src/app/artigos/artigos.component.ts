import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtigosService, Artigo } from './artigos.service';
import { InicionavbarComponent } from '../inicionavbar/inicionavbar.component';

@Component({
  selector: 'app-artigos',
  standalone: true,
  imports: [CommonModule, InicionavbarComponent],
  templateUrl: './artigos.component.html',
  styleUrls: ['./artigos.component.scss']
})
export class ArtigosComponent implements OnInit {
  artigos: Artigo[] = [];

  constructor(private artigosService: ArtigosService) {}

  ngOnInit(): void {
    this.artigosService.getArtigos().subscribe({
      next: (data) => this.artigos = data,
      error: () => console.error('Erro ao carregar artigos')
    });
  }
}
