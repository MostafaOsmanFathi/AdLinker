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
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        password: ['', Validators.required],
        passwordAgain: ['', Validators.required],
        userType: ['', Validators.required]
      }, {validators: this.passwordsMatch}
    )
  }

  passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const passwordAgain = group.get('passwordAgain')?.value;

    return password === passwordAgain ? null : {passwordsMismatch: true};
  }

  onSubmit() {

  }
}
