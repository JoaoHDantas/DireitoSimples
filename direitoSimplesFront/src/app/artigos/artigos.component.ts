import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtigosService, Artigo } from './artigos.service';

@Component({
  selector: 'app-artigos',
  standalone: true,
  imports: [CommonModule],
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
