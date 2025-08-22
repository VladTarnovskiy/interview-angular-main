import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  CreateMovieRequest,
  Movie,
  UpdateMovieRequest,
} from 'src/app/shared/models/movies.model';
import { generateId } from 'src/app/utils';

@Injectable({ providedIn: 'root' })
export class MoviesApiService {
  private movies: Movie[] = [];

  constructor() {}

  getMoviesWithSearch(search?: string | null): Observable<Movie[]> {
    if (!search) {
      return of(this.movies);
    }

    const filteredMovies = this.movies.filter((movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase())
    );

    return of(filteredMovies);
  }

  addMovie(createMovieRequest: CreateMovieRequest): Observable<Movie> {
    const newMovie = this.createNewMovie(createMovieRequest);
    this.movies.push(newMovie);
    return of(newMovie);
  }

  updateMovie(
    id: number,
    updateMovieRequest: UpdateMovieRequest
  ): Observable<Movie> {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      return throwError(() => new Error('Movie not found'));
    }

    const updatedMovie = { ...movie, ...updateMovieRequest };
    this.movies = this.movies.map((movie) =>
      movie.id === id ? updatedMovie : movie
    );
    return of(updatedMovie);
  }

  deleteMovie(id: number): Observable<boolean> {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return of(true);
  }

  markAllMoviesAsOnline(): Observable<boolean> {
    this.movies = this.movies.map((movie) => ({ ...movie, isOnline: true }));
    return of(true);
  }

  private createNewMovie(createMovieRequest: CreateMovieRequest): Movie {
    return {
      id: generateId(),
      name: createMovieRequest.name,
      description: createMovieRequest.description,
      isOnline: false,
    };
  }
}
