import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class DetailsPage implements OnInit {
  person: any;
  movieCredits: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    addIcons({ home, heart });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPersonDetails(+id);
    }
  }

  loadPersonDetails(personId: number) {
    // Fetches Picture, DOB, DOD, AKA, and Biography 
    this.movieService.getPersonDetails(personId).subscribe(data => {
      this.person = data;
    });

    // Fetches the "Other Movies" list [cite: 139]
    this.movieService.getPersonMovieCredits(personId).subscribe(data => {
      this.movieCredits = data.cast; 
    });
  }
}