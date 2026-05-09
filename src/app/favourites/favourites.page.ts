import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class FavouritesPage implements OnInit {
  favMovies: any[] = [];

  constructor(private favService: FavouritesService) {}

  // ionViewWillEnter is used to refresh the list every time the page is opened
  ionViewWillEnter() {
    this.favMovies = this.favService.getFavourites();
  }

  ngOnInit() {}
}