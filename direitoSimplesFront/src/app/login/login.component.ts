// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';   // Importar FormsModule
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Isso marca o componente como standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Armazena o token no localStorage ou sessionStorage
        localStorage.setItem('access_token', response.access);
        this.router.navigate(['/dashboard']);  // Direciona para a tela de dashboard ou home
      },
      (error) => {
        this.errorMessage = 'Credenciais inválidas';
      }
    );
  }
}
