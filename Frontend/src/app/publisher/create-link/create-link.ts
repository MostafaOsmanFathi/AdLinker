import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-link',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-link.html',
  styleUrl: './create-link.css'
})
export class CreateLink {
  addLinkForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addLinkForm = fb.group({
      original_link: ['', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/[^\s$.?#].[^\s]*)$/i) // simple URL pattern
      ]]
    });
  }

  get formControl() {
    return this.addLinkForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addLinkForm.invalid) return;
    this.loading = true;

    setTimeout(() => {
      //TODO make request

      this.loading = false;
      this.addLinkForm.reset();
      this.submitted = false;
    }, 2000);

  }
}
