import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Download {
  id: number;
  titulo: string;
  descricao: string;
  arquivo: string;
  categoria?: string;
  criado_em: string;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {
  private apiUrl = 'http://localhost:8000/api/downloads';

  constructor(private http: HttpClient) {}

  getDownloads(): Observable<Download[]> {
    return this.http.get<Download[]>(this.apiUrl);
  }
  
}
