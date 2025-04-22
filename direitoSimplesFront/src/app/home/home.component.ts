// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',  
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeData: any;  

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe(
      (data) => {
        console.log('Dados da homepage:', data);
        this.homeData = data;
      },
      (error) => {
        console.error('Erro ao carregar dados da homepage', error);
      }
    );
  }
}