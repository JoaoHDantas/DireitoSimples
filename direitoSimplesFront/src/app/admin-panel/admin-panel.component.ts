// src/app/admin-panel/admin-panel.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  questionForm!: FormGroup;
  simuladoForm!: FormGroup;
  questionsList: any[] = [];
  simuladosList: any[] = [];
  editingSimulado: any = null;
  editingQuestion: any = null;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForms();
    this.loadQuestions();
    this.loadSimulados();
  }

  initForms() {
    this.questionForm = this.fb.group({
      question_text: ['', Validators.required],
      alternative_a: ['', Validators.required],
      alternative_b: ['', Validators.required],
      alternative_c: ['', Validators.required],
      alternative_d: ['', Validators.required],
      alternative_e: ['', Validators.required],
      correct_answer: ['', [Validators.required, Validators.pattern(/[A-E]/)]]
    });

    this.simuladoForm = this.fb.group({
      titulo: ['', Validators.required],
      questoes: [[], Validators.required]  // <- Certo!
    });
  }

  loadQuestions() {
    this.http.get<any[]>('/api/admin/questions/').subscribe({
      next: (data) => this.questionsList = data,
      error: (err) => console.error('Erro ao carregar questões', err)
    });
  }

  loadSimulados() {
    this.http.get<any[]>('/api/admin/simulados/').subscribe({
      next: (data) => this.simuladosList = data,
      error: (err) => console.error('Erro ao carregar simulados', err)
    });
  }

  editSimulado(simulado: any) {
    this.editingSimulado = simulado;
    const ids = simulado.questoes?.map((q: any) => typeof q === 'object' ? q.id : q) || [];
    this.simuladoForm.patchValue({
      titulo: simulado.titulo,
      questoes: ids
    });
  }

  addQuestion(id: number) {
    const questoes = this.simuladoForm.get('questoes')?.value || [];
    if (!questoes.includes(id)) {
      this.simuladoForm.get('questoes')?.setValue([...questoes, id]);
      this.simuladoForm.get('questoes')?.markAsDirty(); // Ajuda a garantir atualização
    }
  }

  removeQuestion(id: number) {
    const questoes = this.simuladoForm.get('questoes')?.value || [];
    this.simuladoForm.get('questoes')?.setValue(questoes.filter((q: number) => q !== id));
  }

  submitSimulado() {
    console.log('Dados enviados:', this.simuladoForm.value); // Adicione isso
    const method = this.editingSimulado ? 'put' : 'post';
    const url = this.editingSimulado
      ? `/api/admin/simulados/${this.editingSimulado.id}/`
      : '/api/admin/simulados/';

    this.http[method](url, this.simuladoForm.value).subscribe({
      next: () => {
        this.successMessage = 'Simulado salvo com sucesso';
        this.errorMessage = '';
        this.simuladoForm.reset();
        this.editingSimulado = null;
        this.loadSimulados();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao salvar simulado';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

  cancelEditSimulado() {
    this.editingSimulado = null;
    this.simuladoForm.reset();
  }

  get selectedQuestionIds(): number[] {
    return this.simuladoForm.get('questoes')?.value || [];
  }

  get selectedQuestions(): any[] {
    return this.questionsList.filter(q => this.selectedQuestionIds.includes(q.id));
  }

  get availableQuestions(): any[] {
    return this.questionsList.filter(q => !this.selectedQuestionIds.includes(q.id));
  }

  editQuestion(q: any) {
    this.editingQuestion = q;
    this.questionForm.patchValue(q);
  }

  cancelEditQuestion() {
    this.editingQuestion = null;
    this.questionForm.reset();
  }

  deleteQuestion(id: number) {
    this.http.delete(`/api/admin/questions/${id}/`).subscribe({
      next: () => this.loadQuestions(),
      error: () => alert('Erro ao excluir a questão.')
    });
  }

  deleteSimulado(id: number) {
    this.http.delete(`/api/admin/simulados/${id}/`).subscribe({
      next: () => this.loadSimulados(),
      error: () => alert('Erro ao excluir o simulado.')
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/admin/login';
  }
  submitQuestion() {
    if (this.questionForm.invalid) return;
  
    const method = this.editingQuestion ? 'put' : 'post';
    const url = this.editingQuestion
      ? `/api/admin/questions/${this.editingQuestion.id}/`
      : '/api/admin/questions/';
  
    this.http[method](url, this.questionForm.value).subscribe({
      next: () => {
        this.successMessage = 'Questão salva com sucesso';
        this.errorMessage = '';
        this.questionForm.reset();
        this.editingQuestion = null;
        this.loadQuestions();
      },
      error: () => {
        this.errorMessage = 'Erro ao salvar questão';
        this.successMessage = '';
      }
    });
  }
}
