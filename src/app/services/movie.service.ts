import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/trending/movie/day?api_key=${environment.apiKey}`);
  }
}