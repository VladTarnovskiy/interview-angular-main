import { Injectable } from '@angular/core';
import { MoviesApiService } from '../api/movies-api.service';
import {
  CreateMovieRequest,
  Movie,
  UpdateMovieRequest,
} from 'src/app/shared/models/movies.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesStateService {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor(private moviesApiService: MoviesApiService) {
    this.initialLoadMovies();
  }

  getMoviesWithSearch(search?: string | null): Observable<Movie[]> {
    return this.moviesApiService
      .getMoviesWithSearch(search)
      .pipe(tap((movies) => this.moviesSubject.next(movies)));
  }

  createMovie(createMovieRequest: CreateMovieRequest): Observable<Movie> {
    return this.moviesApiService
      .addMovie(createMovieRequest)
      .pipe(
        tap((movie) =>
          this.moviesSubject.next([...this.moviesSubject.value, movie])
        )
      );
  }

  updateMovie(
    id: number,
    updateMovieRequest: UpdateMovieRequest
  ): Observable<Movie> {
    return this.moviesApiService
      .updateMovie(id, updateMovieRequest)
      .pipe(
        tap((movie) =>
          this.moviesSubject.next(
            this.moviesSubject.value.map((m) => (m.id === id ? movie : m))
          )
        )
      );
  }

  deleteMovie(id: number): Observable<boolean> {
    return this.moviesApiService
      .deleteMovie(id)
      .pipe(
        tap(() =>
          this.moviesSubject.next(
            this.moviesSubject.value.filter((m) => m.id !== id)
          )
        )
      );
  }

  markAllMoviesAsOnline(): Observable<boolean> {
    return this.moviesApiService
      .markAllMoviesAsOnline()
      .pipe(
        tap(() =>
          this.moviesSubject.next(
            this.moviesSubject.value.map((m) => ({ ...m, isOnline: true }))
          )
        )
      );
  }

  private initialLoadMovies(): void {
    this.moviesApiService.getMoviesWithSearch().subscribe((movies) => {
      this.moviesSubject.next(movies);
    });
  }
}
