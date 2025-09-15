import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]],
        passwordAgain: ['', Validators.required],
        userType: ['', [Validators.pattern(/^(user|admin|publisher)$/), Validators.required]]
      }
    )
  }

  get formControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert("form valid")
    }
  }
}
