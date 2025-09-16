import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AccountService} from '../../services/account-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./login.css']
})
export class Login {
  private PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    this.errorMessage = "";
    this.successMessage = "";
    this.loading = true;

    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];


    this.accountService.loginUser(email, password).subscribe(
      {
        next: (response: any) => {
          this.loading = false;
          console.log(response);
          this.successMessage = "logging in  successful! Redirecting to home...";

          if (response.token && response.user) {
            localStorage.setItem("jwt_token", response.token);
            localStorage.setItem("user_data", JSON.stringify(response.user));
          } else {
            throw new Error("Login Failed");
          }
          setTimeout(
            () => {
              if (response.user.role === 'publisher') {
                this.router.navigate(['/publisher/']);
              } else if (response.user.role === 'admin') {
                //TODO
                this.router.navigate(['/']);
              } else if (response.user.role === 'user') {
                //TODO
                this.router.navigate(['/']);
              } else {
                throw new Error("Login Failed");
              }
            },
            2000
          )
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message
        }

      }
    )

  }
}




