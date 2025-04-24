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
        // Redirecionar para a homepage após o login bem-sucedido
        this.router.navigate(['/home']);
      },
      (error) => {
        // Exibir uma mensagem de erro se as credenciais estiverem incorretas
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    );
  }

  redirecionar_register() {
    this.router.navigate(['/register/']);
  }

}
