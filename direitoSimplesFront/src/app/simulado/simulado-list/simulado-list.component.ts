import { Component, OnInit } from '@angular/core';
import { SimuladoService } from '../simulado.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InicionavbarComponent } from '../../inicionavbar/inicionavbar.component';

@Component({
  selector: 'app-simulado-list',
  standalone: true,
  imports: [CommonModule, RouterModule, InicionavbarComponent],
  templateUrl: './simulado-list.component.html',
  styleUrls: ['./simulado-list.component.scss']
})
export class SimuladoListComponent implements OnInit {
  simulados: any[] = [];

  constructor(
    private simuladoService: SimuladoService,
    private router: Router
  ) {}
  simuladosConcluidos = 0;
  percentualProgresso = 0;


ngOnInit(): void {
  this.simuladoService.getMeusSimulados().subscribe({
    next: (data) => {
      this.simulados = data;
      this.simuladosConcluidos = this.simulados.filter(s => s.concluido).length;
      this.percentualProgresso = this.simulados.length > 0
        ? Math.round((this.simuladosConcluidos / this.simulados.length) * 100)
        : 0;
    },
    error: (err) => {
      console.error('Erro ao carregar simulados', err);
    }
  });
}

  iniciarSimulado(id: number) {
    this.router.navigate(['/simulado', id]);
  }
}
