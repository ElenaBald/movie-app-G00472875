import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private storageKey = 'my_favourite_movies';

  constructor() { }

  // Get the list from local storage
  getFavourites(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save a movie to local storage 
  addFavourite(movie: any) {
    const favs = this.getFavourites();
    if (!favs.some(m => m.id === movie.id)) {
      favs.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));
    }
  }

  // Remove a movie from local storage 
  removeFavourite(movieId: number) {
    let favs = this.getFavourites();
    favs = favs.filter(m => m.id !== movieId);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }

  // Check if a movie is already favourited
  isFavourite(movieId: number): boolean {
    return this.getFavourites().some(m => m.id === movieId);
  }
}