import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AccountService} from "../../services/account-service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-delete-my-account',
    imports: [
        FormsModule
    ],
  templateUrl: './delete-my-account.html',
  styleUrl: './delete-my-account.css'
})
export class DeleteMyAccount {
    confirmDelete: boolean = false;


    constructor(private accountService: AccountService) {
    }



    handelDeleteMyAccount() {
        this.accountService.deleteMyAccount().subscribe({
            next: result => {
            },
            error: err => {
            }
        });
    }


}
