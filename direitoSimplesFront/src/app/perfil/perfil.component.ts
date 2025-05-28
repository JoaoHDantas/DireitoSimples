import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilService, Perfil } from './perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfil: Perfil | null = null;
  editMode = false;
  successMessage = '';
  errorMessage = '';

  constructor(private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.loadPerfil();
  }

loadPerfil() {
  this.perfilService.getPerfil().subscribe({
    next: (data) => {
      this.perfil = Array.isArray(data) ? data[0] : data; // <- PEGA O PRIMEIRO ITEM SE FOR ARRAY
    },
    error: (err) => {
      this.errorMessage = 'Erro ao carregar perfil';
    }
  });
}


salvar() {
  if (!this.perfil) return;

  const perfilParaSalvar = {
    ...this.perfil,
    data_nascimento: this.formatarData(this.perfil.data_nascimento)
  };

  this.perfilService.salvarPerfil(perfilParaSalvar).subscribe({
    next: () => {
      this.successMessage = 'Perfil atualizado com sucesso!';
      this.editMode = false;
    },
    error: () => {
      this.errorMessage = 'Erro ao salvar o perfil.';
    }
  });
}



  editar() {
    this.editMode = true;
  }

  cancelar() {
    this.editMode = false;
    this.loadPerfil();
  }

  formatarData(data: string | Date): string {
  const d = new Date(data);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

}
