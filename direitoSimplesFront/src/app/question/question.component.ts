import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

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

  questionsList: any[] = [];
  questionIndex: number = 0;
  totalQuestions: number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data: any[]) => {
      this.questionsList = data;
      this.totalQuestions = data.length;

      this.route.params.subscribe(params => {
        const paramId = +params['id'];
        const index = this.questionsList.findIndex(q => q.id === paramId);
        this.questionIndex = index !== -1 ? index : 0;
        this.questionId = this.questionsList[this.questionIndex].id;
        this.loadQuestion();
      });
    });
  }

  loadQuestion(): void {
    this.questionService.getQuestionById(this.questionId).subscribe(data => {
      this.question = data;
      this.selectedAnswer = '';
      this.feedback = null;
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

  skipQuestion(): void {
    if (this.questionIndex < this.totalQuestions - 1) {
      this.questionIndex++;
      this.questionId = this.questionsList[this.questionIndex].id;
      this.loadQuestion();
    }
  }

  goToPreviousQuestion(): void {
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.questionId = this.questionsList[this.questionIndex].id;
      this.loadQuestion();
    }
  }
  toggleFullscreen() {
    const elem = document.documentElement;
  
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Erro ao tentar ativar o modo tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
