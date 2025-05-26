import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inicionavbar',
  standalone: true,
  templateUrl: './inicionavbar.component.html',
  styleUrls: ['./inicionavbar.component.scss']
})
export class InicionavbarComponent {
  selectedItem: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateSelectedItem(event.urlAfterRedirects);
      });
  }

  updateSelectedItem(url: string) {
    if (url.includes('/home')) {
      this.selectedItem = 'home';
    } else if (url.includes('/estudo-diario')) {
      this.selectedItem = 'estudo-diario';
    } else if (url.includes('/simulados')) {
      this.selectedItem = 'simulados';
    } else if (url.includes('/conquistas')) {
      this.selectedItem = 'conquistas';
    } else if (url.includes('/artigos')) {
      this.selectedItem = 'artigos';
    } else if (url.includes('/downloads')) {
      this.selectedItem = 'downloads';
    } else if (url.includes('/ajuda')) {
      this.selectedItem = 'ajuda';
    } else if (url.includes('/perfil')) {
      this.selectedItem = 'perfil';
    } else {
      this.selectedItem = '';
    }
  }

  redirecionar_home() {
    this.router.navigate(['/home']);
  }

  redirecionar_estudodiario() {
    this.router.navigate(['/estudo-diario']);
  }

  redirecionar_simulados() {
    this.router.navigate(['/simulados']);
  }

  redirecionar_conquistas() {
    this.router.navigate(['/conquistas']);
  }

  redirecionar_artigos() {
    this.router.navigate(['/artigos']);
  }

  redirecionar_downloads() {
    this.router.navigate(['/downloads']);
  }

  redirecionar_ajuda() {
    this.router.navigate(['/ajuda']);
  }

  redirecionar_perfil() {
    this.router.navigate(['/perfil']);
  }
}