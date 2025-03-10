// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { username, password });
  }

  // Método para cadastro
  register(username: string, password: string, email: string, cpf: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password, email, cpf });
  }
}
