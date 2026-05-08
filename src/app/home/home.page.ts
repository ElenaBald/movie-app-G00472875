import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  trendingMovies: any[] = [];
  studentNumber: string = 'G00472875';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe((data) => {
      this.trendingMovies = data.results;
      console.log(this.trendingMovies);
    });
  }
}