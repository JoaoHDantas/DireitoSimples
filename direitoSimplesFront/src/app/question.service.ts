// question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8000/api/questions/';  // URL da sua API Django

  constructor(private http: HttpClient) { }

  getQuestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }
  
  submitAnswers(answers: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}submit_answers/`, answers);
  }
}
