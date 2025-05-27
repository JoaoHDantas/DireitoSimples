import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../question.service';
import { Router, ActivatedRoute } from '@angular/router'; // <-- IMPORTA O Router
import { EstudoDiarioService } from '../estudodiario/estudodiario.service';



@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: any;
  questionId: number = 0;
  selectedAnswer: string = '';
  feedback: any;
  isAnswered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private estudoDiarioService: EstudoDiarioService,
    private router: Router,  

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
      this.loadQuestion();
    });
  }

  loadQuestion(): void {
    this.questionService.getQuestionById(this.questionId).subscribe(data => {
      this.question = data;
      this.selectedAnswer = '';
      this.feedback = null;
      this.isAnswered = false;
    });
  }

  selectAnswer(letter: string) {
    this.selectedAnswer = letter;
  }
  submitAnswer(): void {
  if (this.isAnswered) return;

  const answerPayload = { [this.questionId]: this.selectedAnswer };

  this.questionService.submitAnswers(answerPayload).subscribe(res => {
    this.feedback = res.find((f: any) => f.question_id == this.questionId);
    this.isAnswered = true;

    // 🔥 Atualiza o estudo diário
    this.estudoDiarioService.responder({
      questao_id: this.questionId,
      resposta: this.selectedAnswer
    }).subscribe({
      next: (res) => {
        console.log('Estudo diário atualizado', res);
      },
      error: (err) => {
        console.error('Erro ao atualizar estudo diário', err);
      }
    });

  });
}
voltarEstudoDiario() {
  this.router.navigate(['/estudo-diario']);
}



}
