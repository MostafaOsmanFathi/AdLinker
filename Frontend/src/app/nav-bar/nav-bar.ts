import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AccountService} from '../services/account-service';
import {finalize} from "rxjs";

@Component({
    selector: 'app-nav-bar',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './nav-bar.html',
    styleUrl: './nav-bar.css'
})
export class NavBar {
    loggedIn: boolean = false;
    user_type: string = "";

    constructor(private accountService: AccountService, private router: Router) {
    }

    ngOnInit() {
        this.accountService.getUserObservable().subscribe(
            {
                next: (data) => {
                    console.log(data);
                    if (data.role) {
                        this.user_type = data.role;
                    } else {
                        this.user_type = "";
                    }
                },
            }
        )
    }

    logout() {
        alert("logout")
        this.accountService.logoutUser().pipe(
            finalize(() => {
                localStorage.removeItem("jwt_token");
                localStorage.removeItem("user_data");
                this.accountService.clearObserveData();
                this.router.navigate(['/']);
            })
        ).subscribe();
    }
}
