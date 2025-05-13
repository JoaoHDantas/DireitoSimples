import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicionavbar',
  standalone: true,
  templateUrl: './inicionavbar.component.html',
  styleUrls: ['./inicionavbar.component.scss']
})
export class InicionavbarComponent {
  selectedItem: string = 'estudo-diario'; // Começa selecionado o estudo diário

  constructor(private router: Router) {}

  redirecionar_estudodiario() {
    this.selectedItem = 'estudo-diario';
    this.router.navigate(['/home']);
  }

  redirecionar_simulados() {
    this.selectedItem = 'simulados';
    this.router.navigate(['/simulados']);
  }

  redirecionar_conquistas() {
    this.selectedItem = 'conquistas';
    this.router.navigate(['/conquistas']);
  }

  redirecionar_artigos() {
    this.selectedItem = 'artigos';
    this.router.navigate(['/artigos']);
  }

  redirecionar_downloads() {
    this.selectedItem = 'downloads';
    this.router.navigate(['/downloads']);
  }

  redirecionar_ajuda() {
    this.selectedItem = 'ajuda';
    this.router.navigate(['/ajuda']);
  }

  redirecionar_perfil() {
    this.selectedItem = 'perfil';
    this.router.navigate(['/perfil']);
  }
}