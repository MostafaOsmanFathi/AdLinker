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
  shortenResult: any = null;
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

    //TODO make request

    setTimeout(() => {
      this.shortenResult = {
        original_link: this.addLinkForm.value['original_link'],
        shorten_link: this.addLinkForm.value['original_link'],
      }
      this.loading = false;
      this.addLinkForm.reset();
      this.submitted = false;
    }, 2000);

  }
}
