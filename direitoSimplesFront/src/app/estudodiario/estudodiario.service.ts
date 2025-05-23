import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudoDiarioService {
  private apiUrl = 'http://localhost:8000/api/estudo-diario/';

  constructor(private http: HttpClient) {}

  getProgresso(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}progresso/`);
  }

  getQuestaoRandom(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}questao_random/`);
  }

  responder(payload: { questao_id: number; resposta: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}responder/`, payload);
  }

  iniciarEstudo(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}iniciar/`, {});
  }
}
