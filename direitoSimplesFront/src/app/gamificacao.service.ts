import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamificacaoService {
  private apiUrl = '/api';  // 🔥 Usa o proxy corretamente

  constructor(private http: HttpClient) {}

  getConquistasDoUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamificacao/minhas-conquistas/`);
  }
}
