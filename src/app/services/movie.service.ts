import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // Fetches trending movies for the Home Page
  getTrendingMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/trending/movie/day?api_key=${environment.apiKey}`);
  }

  // Searches for movies by title
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/search/movie?query=${query}&api_key=${environment.apiKey}`);
  }

  // Fetches full details for a specific movie (needed for Details Page)
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/${movieId}?api_key=${environment.apiKey}`);
  }

  // Fetches cast and crew for a specific movie (needed for Details Page)
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/${movieId}/credits?api_key=${environment.apiKey}`);
  }
}