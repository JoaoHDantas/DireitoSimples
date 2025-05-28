import { Component, OnInit } from '@angular/core';
import { FaqService, FAQ } from './faq.service';
import { CommonModule } from '@angular/common';
import { InicionavbarComponent } from "../inicionavbar/inicionavbar.component";


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, InicionavbarComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] = [];
  openedIndex: number | null = null;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.faqService.getFaq().subscribe({
      next: (data) => this.faqs = data,
      error: () => console.error('Erro ao carregar FAQ')
    });
  }

  toggle(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
