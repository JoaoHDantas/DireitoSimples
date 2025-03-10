// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';   // Importar FormsModule
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,  // Isso marca o componente como standalone
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  cpf: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.password, this.email, this.cpf).subscribe(
      (response) => {
        this.router.navigate(['/login']);  // Direciona para a tela de login após cadastro
      },
      (error) => {
        this.errorMessage = 'Erro no cadastro. Tente novamente.';
      }
    );
  }
}
