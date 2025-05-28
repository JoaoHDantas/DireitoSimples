import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Perfil {
  id: number;
  username: string;
  email: string;
  cpf: string;
  endereco?: string;
  bio: string;
  data_nascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://127.0.0.1:8000/api/perfil/';

  constructor(private http: HttpClient) {}

  getPerfil(): Observable<Perfil> {
    return this.http.get<Perfil>(this.apiUrl);
  }

  updatePerfil(perfil: Partial<Perfil>): Observable<Perfil> {
    return this.http.patch<Perfil>(this.apiUrl, perfil);
  }
  salvarPerfil(perfil: Perfil) {
  return this.http.patch<Perfil>(`/api/perfil/${perfil.id}/`, perfil);
  }

}
