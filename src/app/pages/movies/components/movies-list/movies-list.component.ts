import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  map,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { MoviesApiService } from 'src/app/core/api/movies-api.service';
import { CreateMovieRequest, Movie } from 'src/app/shared/models/movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  searchControl = new FormControl('');
  isAddMovieModalOpen = false;

  private destroy$ = new Subject<void>();

  constructor(private moviesApiService: MoviesApiService) {}

  ngOnInit() {
    this.subscribeToSearch();
    this.getMovies();
  }

  updateMovieStatus(movie: Movie) {
    this.moviesApiService
      .updateMovie(movie.id, {
        isOnline: !movie.isOnline,
      })
      .subscribe(() => {
        this.getMovies(this.searchControl.value || '');
      });
  }

  deleteMovie(id: number) {
    this.moviesApiService.deleteMovie(id).subscribe(() => {
      this.getMovies();
    });
  }

  openAddMovieModal(): void {
    this.isAddMovieModalOpen = true;
  }

  closeAddMovieModal(): void {
    this.isAddMovieModalOpen = false;
  }

  onAddMovie(movieData: CreateMovieRequest): void {
    this.moviesApiService.addMovie(movieData).subscribe(() => {
      this.getMovies();
      this.closeAddMovieModal();
    });
  }

  markAllMoviesAsOnline(): void {
    this.moviesApiService.markAllMoviesAsOnline().subscribe(() => {
      this.getMovies();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getMovies(search?: string | null) {
    this.moviesApiService
      .getMoviesWithSearch(search)
      .subscribe((movies) => (this.movies = movies));
  }

  private subscribeToSearch() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value) => (value || '').trim()),
        debounceTime(500),
        filter((value) => value.length === 0 || value.length >= 3),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.getMovies(searchTerm);
      });
  }
}
