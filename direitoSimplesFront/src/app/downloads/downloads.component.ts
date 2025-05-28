import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadsService, Download } from './downloads.service';
import { InicionavbarComponent } from '../inicionavbar/inicionavbar.component';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, InicionavbarComponent],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  downloads: Download[] = [];

  constructor(private downloadsService: DownloadsService) {}

  ngOnInit(): void {
    this.downloadsService.getDownloads().subscribe({
      next: (data) => this.downloads = data,
      error: () => console.error('Erro ao carregar downloads')
    });
  }
}

