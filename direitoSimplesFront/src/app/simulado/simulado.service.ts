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

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // 🔥 Pegando todos os simulados
  getSimulados(): Observable<Simulado[]> {
    return this.http.get<Simulado[]>(`${this.apiUrl}/simulados/`);
  }

  // 🔥 Pegar simulado por ID
  getSimuladoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/simulados/${id}/`);
  }

  // 🔥 Criar simulado respondido no backend
  criarSimuladoRespondido(simuladoId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/simulados-respondidos/`,
      { simulado_id: simuladoId }
    );
  }

  // 🔥 Enviar resposta para uma questão
  enviarResposta(simuladoRespondidoId: number, questaoId: number, resposta: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/simulados-respondidos/${simuladoRespondidoId}/responder/`,
      {
        questao_id: questaoId,
        resposta_usuario: resposta
      }
    );
  }

  // 🔥 Finalizar simulado
  finalizarSimulado(simuladoRespondidoId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/simulados-respondidos/${simuladoRespondidoId}/finalizar/`,
      {}
    );
  }
  getMeusSimulados(): Observable<any[]> {
  return this.http.get<any[]>('http://127.0.0.1:8000/api/simulados/meus_simulados/');
}
}
