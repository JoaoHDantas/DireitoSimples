import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Simulado {
  id: number;
  titulo: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class SimuladoService {

  private apiUrl = 'http://127.0.0.1:8000/api/simulados/'; // ajuste para sua rota real

  constructor(private http: HttpClient) {}

  getSimulados(): Observable<Simulado[]> {
    return this.http.get<Simulado[]>(this.apiUrl);
  }
  getSimuladoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }
}
