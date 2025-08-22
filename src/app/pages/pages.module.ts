import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPageComponent } from './movies/pages/movies-page/movies-page.component';
import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movies/components/movie/movie.component';
import { MoviesListComponent } from './movies/components/movies-list/movies-list.component';
import { AddMovieFormComponent } from './movies/components/add-movie-form/add-movie-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieComponent,
    MoviesPageComponent,
    MoviesListComponent,
    AddMovieFormComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [MoviesPageComponent],
})
export class PagesModule {}
