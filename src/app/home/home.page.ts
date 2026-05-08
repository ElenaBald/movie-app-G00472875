import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
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
      console.log('Trending Movies:', this.trendingMovies);
    });
  }

  // Implemented search functionality as per project requirement
  onSearch(event: any) {
    const query = event.detail.value;
    
    // If the search string is empty, show trending movies as per Figure 2
    if (!query || query.trim() === '') {
      this.loadTrendingMovies();
      return;
    }

    // Otherwise, show movies matching the search string as per Figure 3
    this.movieService.searchMovies(query).subscribe((data) => {
      this.trendingMovies = data.results;
      console.log('Search Results:', this.trendingMovies);
    });
  }
}