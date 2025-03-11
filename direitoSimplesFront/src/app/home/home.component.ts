// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';  // Importando o AuthService
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',  
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeData: any;  

  constructor(private homeService: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService);
    // Verificar se o usuário está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  // Redirecionar para a página de login se não estiver autenticado
    } else {
      // Se o usuário estiver autenticado, buscar os dados da homepage
      this.homeService.getHomeData().subscribe(
        (data) => {
          this.homeData = data; 
        },
        (error) => {
          console.error('Erro ao carregar dados da homepage', error);  
        }
      );
    }
  }
}
