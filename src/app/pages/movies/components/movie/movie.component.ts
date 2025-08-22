import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Movie } from 'src/app/shared/models/movies.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  @Input() movie!: Movie;

  @Output() toggleMovieStatus = new EventEmitter<Movie>();
  @Output() deleteMovie = new EventEmitter<number>();

  onToggleMovieStatus(): void {
    this.toggleMovieStatus.emit(this.movie);
  }

  onDelete(): void {
    this.deleteMovie.emit(this.movie.id);
  }
}
