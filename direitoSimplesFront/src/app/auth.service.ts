// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';  // Com proxy já configurado
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Login e armazenamento do token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { username, password }).pipe(
      tap((response) => {
        if (typeof window !== 'undefined' && response?.access) {
          localStorage.setItem(this.tokenKey, response.access);
        }
      })
    );
  }

  // Retorna o token armazenado
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Verifica validade do token JWT
  isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  // Verifica se usuário está logado e token válido
  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    return this.isTokenValid(token);
  }

  // Cadastro de usuário
  register(username: string, password: string, email: string, cpf: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password, email, cpf });
  }

  // Logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }
}
