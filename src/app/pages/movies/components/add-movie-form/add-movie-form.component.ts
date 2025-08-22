import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMovieRequest } from 'src/app/shared/models/movies.model';

@Component({
  selector: 'app-add-movie-form',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.css'],
})
export class AddMovieFormComponent {
  @Output() submitForm = new EventEmitter<CreateMovieRequest>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      isOnline: [false],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.form.reset();
  }
}
