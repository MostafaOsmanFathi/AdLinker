import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {RouterLink} from '@angular/router';
import {AccountService} from '../../services/account-service';
import {Account} from '../../intrefaces/acccount';
import {Router} from '@angular/router';

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
  loading: boolean = false;
  errorMessage: string = ""
  successMessage: string = "";

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]],
        passwordAgain: ['', Validators.required],
        userType: ['', [Validators.pattern(/^(user|admin|publisher)$/), Validators.required]]
      }, {
        validators: [this.passwordMatchValidator]
      }
    )
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value['password'];
    const passwordAgain = control.value["passwordAgain"];

    if (password && passwordAgain && password !== passwordAgain) {
      return {passwordMismatch: true};
    }
    return null;
  }

  get formControl() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
    console.log("is valid", this.registerForm.valid);
    if (this.registerForm.invalid) {
      return
    }
    const account: Account = {
      name: this.registerForm.value['name'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
      user_type: this.registerForm.value['userType'],
    };
    this.errorMessage = "";
    this.successMessage = "";
    this.loading = true;
    this.accountService.registerUser(account).subscribe((response) => {
        this.loading = false;
        this.successMessage = "Registration successful! Redirecting to login...";
        setTimeout(
          () => {
            this.router.navigate(['/account/login']);
          },
          2000
        )
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message
      }
    );
  }
}
