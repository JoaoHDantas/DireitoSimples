// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { username, password }).pipe(
      tap((response) => {
        // Verificar se está no navegador antes de acessar o localStorage
        if (typeof window !== 'undefined' && response && response.access) {
          localStorage.setItem('authToken', response.access);  // Salvar o token JWT
        }
      })
    );
  }

  // Método para obter o token armazenado
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');  // Garantir que localStorage só é acessado no navegador
    }
    return null;
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token !== null && token !== undefined;  // Verifique se o token não é nulo ou undefined
  }

  // Método para cadastro
  register(username: string, password: string, email: string, cpf: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password, email, cpf });
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Math.floor(Date.now() / 1000); // verifica se ainda está válido
    } catch (e) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
  
}


