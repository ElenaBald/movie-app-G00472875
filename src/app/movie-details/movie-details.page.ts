import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  cast: any[] = [];
  crew: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    // Get the ID from the URL (e.g., /movie-details/123)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(+id);
    }
  }

  loadDetails(id: number) {
    // 1. Fetch main movie details (overview, title, etc)
    this.movieService.getMovieDetails(id).subscribe(data => {
      this.movie = data;
    });

    // 2. Fetch Credits (Cast and Crew)
    this.movieService.getMovieCredits(id).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }
}