import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FAQ {
  id: number;
  pergunta: string;
  resposta: string;
}

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = 'http://localhost:8000/api/faq'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  getFaq(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(this.apiUrl);
  }
}
