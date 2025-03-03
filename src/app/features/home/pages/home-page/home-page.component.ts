import { Component, inject, OnInit } from '@angular/core';
import { HomeApiService } from '../../services/home-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {}

  router = inject(Router);
}
