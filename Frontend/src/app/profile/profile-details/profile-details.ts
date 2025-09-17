import {Component} from '@angular/core';
import {AccountService} from "../../services/account-service";

@Component({
    selector: 'app-profile-details',
    imports: [],
    templateUrl: './profile-details.html',
    styleUrl: './profile-details.css'
})
export class ProfileDetails {
    user: any = {};

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getMyAccountDetails().subscribe(
            {
                next: (response) => {
                    this.user = response;
                },
                error: (error) => {
                    console.log(error)
                }
            }
        )
    }

}
