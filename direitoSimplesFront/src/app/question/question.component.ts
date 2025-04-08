// src/app/question/question.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question',
  standalone: true,  // Isso marca o componente como standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: any;
  questionId: number = 0;
  selectedAnswer: string = '';
  feedback: any;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
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
    });
  }

  selectAnswer(letter: string) {
    this.selectedAnswer = letter;
  }

  submitAnswer(): void {
    const answerPayload = { [this.questionId]: this.selectedAnswer };
    this.questionService.submitAnswers(answerPayload).subscribe(res => {
      this.feedback = res.find((f: any) => f.question_id == this.questionId);
    });
  }
}