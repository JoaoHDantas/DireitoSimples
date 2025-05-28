import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artigo {
  id: number;
  titulo: string;
  descricao: string;
  link: string;
  categoria?: string;
  criado_em: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtigosService {
  private apiUrl = 'http://localhost:8000/api/artigos';

  constructor(private http: HttpClient) {}

  getArtigos(): Observable<Artigo[]> {
    return this.http.get<Artigo[]>(this.apiUrl);
  }
}
