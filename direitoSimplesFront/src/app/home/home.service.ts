// src/app/home/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8000/api/home/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHomeData(): Observable<any> {
    const token = this.authService.getAuthToken();
    
    // Verifique se o token existe antes de fazer a requisição
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    return this.http.get<any>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`  // Adicionar o token no cabeçalho
      }
    });
  }
}
