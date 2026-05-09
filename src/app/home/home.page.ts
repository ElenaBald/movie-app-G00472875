import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { addIcons } from 'ionicons';
import { heart, moon, sunny } from 'ionicons/icons'; // Icons for Favourites and Dark Mode

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  trendingMovies: any[] = [];
  studentNumber: string = 'G00472875'; // Student ID 
  isDarkMode: boolean = false; // Innovation 

  constructor(private movieService: MovieService) {
    // Register icons required for the header 
    addIcons({ heart, moon, sunny });
  }

  ngOnInit() {
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe((data) => {
      this.trendingMovies = data.results;
    });
  }

  onSearch(event: any) {
    const query = event.detail.value;
    if (!query || query.trim() === '') {
      this.loadTrendingMovies();
      return;
    }
    this.movieService.searchMovies(query).subscribe((data) => {
      this.trendingMovies = data.results;
    });
  }

  // Innovation logic: Toggles the dark theme class 
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}