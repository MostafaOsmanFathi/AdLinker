import {Component} from '@angular/core';
import {AccountService} from "../../services/account-service";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
    selector: 'app-update-profile',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './update-profile.html',
    styleUrl: './update-profile.css'
})
export class UpdateProfile {
    loading = false;
    submitted = false;
    errorMessage = '';
    successMessage = '';

    updateForm: FormGroup;

    constructor(private fb: FormBuilder, private accountService: AccountService) {
        this.updateForm = this.fb.group({
            oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
            passwordAgain: ['', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });

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
        return this.updateForm.controls;
    }


    onSubmit() {

        this.submitted = true;
        if (this.updateForm.invalid) {
            return
        }

        const oldPassword = this.updateForm.value['oldPassword'];
        const newPassword = this.updateForm.value['password'];
        const email = this.accountService.getUserValue().email;

        this.errorMessage = "";
        this.successMessage = "";
        this.loading = true;

        this.accountService.loginUser(email, oldPassword)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            ).subscribe(
            {
                next: (res) => {
                    this.accountService.updateAccountData({password: newPassword})
                        .subscribe(
                            {
                                next: (res) => {
                                    this.successMessage = "account updated successfully";
                                },
                                error: (err) => {

                                }
                            }
                        )
                },
                error: (err) => {
                    this.errorMessage = "Wrong Password"
                }
            }
        )
    }
}
