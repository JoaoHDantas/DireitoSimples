import { Component, OnInit } from '@angular/core';
import { SimuladoService, Simulado } from '../simulado.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { InicionavbarComponent } from '../../inicionavbar/inicionavbar.component';


@Component({
  selector: 'app-simulado-list',
  standalone: true,                         
  imports: [CommonModule, RouterModule, InicionavbarComponent], // Importando o CommonModule e o RouterModule
  templateUrl: './simulado-list.component.html',
  styleUrls: ['./simulado-list.component.scss']
})
export class SimuladoListComponent implements OnInit {
  simulados: Simulado[] = [];

  constructor(private simuladoService: SimuladoService) {}

  ngOnInit(): void {
    this.simuladoService.getSimulados().subscribe({
      next: (data) => {
        this.simulados = data;
      },
      error: (err) => {
        console.error('Erro ao carregar simulados', err);
      }
    });
  }
}
