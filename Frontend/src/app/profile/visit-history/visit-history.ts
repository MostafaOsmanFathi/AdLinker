import {Component} from '@angular/core';
import {FilterLinkPipePipe} from "../../pipes/filter-link-pipe-pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Link} from "../../intrefaces/link";
import {AccountService} from "../../services/account-service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-visit-history',
    imports: [
        FilterLinkPipePipe,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './visit-history.html',
    styleUrl: './visit-history.css'
})
export class VisitHistory {
    searchTerm: string = "";
    errorMessage: string = "";
    fullUrlBaseShorten: string = environment.shortenBaseUrl;

    links: any[] = [];

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getMyVisitHistory().subscribe(
            {
                next: (data) => {
                    this.links = data;
                    console.log(data);
                },
                error: (error) => {
                    this.errorMessage = JSON.stringify(error);
                }
            }
        )

    }
}
