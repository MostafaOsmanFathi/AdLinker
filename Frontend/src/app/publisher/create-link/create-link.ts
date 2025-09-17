import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PublisherService} from "../../services/publisher-service";
import {Link} from "../../intrefaces/link";
import {finalize} from "rxjs";
import {environment} from "../../../environments/environment";

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
    errorMessage: string = "";
    shortenResult: any = {shorten_link: "", original_link: ""};
    submitted: boolean = false;
    loading: boolean = false;
    baseUrl: string = environment.apiUrl;
    submittedBefore: boolean = false;
    fullUrlBase: string = environment.shortenBaseUrl;
    fullUrl: string = environment.shortenBaseUrl;


    constructor(private fb: FormBuilder, private publisherService: PublisherService) {
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
        this.errorMessage = "";

        this.submitted = true;
        if (this.addLinkForm.invalid) return;
        this.loading = true;

        const original_link = this.addLinkForm.value.original_link;
        this.publisherService.createLink(original_link)
            .pipe(finalize(() => {
                this.loading = false;
                this.addLinkForm.reset();
                this.submitted = false;
            })).subscribe(
            {
                next: response => {
                    console.log(response);
                    this.shortenResult.original_link = response.original_link || '';
                    this.shortenResult.shorten_link = response.shorten_link || '';
                    this.fullUrl = this.fullUrlBase + this.shortenResult.shorten_link;
                },
                error: error => {
                    this.errorMessage = JSON.stringify(error.message);
                }
            }
        )
        this.submittedBefore = true;
        setTimeout(() => {

            this.loading = false;
            this.addLinkForm.reset();
            this.submitted = false;
        }, 2000);
    }
}
