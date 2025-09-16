import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AccountService} from '../services/account-service';
import {routes} from '../app.routes';

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

  constructor(private accountService: AccountService, private router: Router) {
  }

  logout() {
    this.accountService.logoutUser().subscribe({
      next: (res) => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
        this.router.navigate(['/'])
      },
      error: (err) => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
        this.router.navigate(['/'])
      }
    });
  }
}
