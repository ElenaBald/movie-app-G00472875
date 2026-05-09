import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service'; // Import the new service
import { addIcons } from 'ionicons';
import { heart, heartOutline, home } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favService: FavouritesService // Inject the service
  ) {
    addIcons({ heart, heartOutline, home });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(+id);
    }
  }

  loadDetails(movieId: number) {
    this.movieService.getTrendingMovies().subscribe((data) => {
      this.movie = data.results.find((m: any) => m.id === movieId);
    });

    this.movieService.getMovieCredits(movieId).subscribe((data) => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  // Links to the persistence service 
  isFav() {
    return this.movie ? this.favService.isFavourite(this.movie.id) : false;
  }

  // Handles adding/removing with permanent storage 
  toggleFavourite() {
    if (this.isFav()) {
      this.favService.removeFavourite(this.movie.id);
    } else {
      this.favService.addFavourite(this.movie);
    }
  }
}