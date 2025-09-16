import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Account} from '../intrefaces/acccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  registerUser(account: Account) {
    return this.http.post(this.baseUrl + "/account/register", account)
  }

  loginUser(email: string, password: string) {
    return this.http.post(this.baseUrl + "/account/login", {email: email, password: password})

  }

  getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem("jwt_token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

  }

  logoutUser() {
    const headers = this.getAuthHeader();
    const body = {};

    return this.http.post(this.baseUrl + "/account/logout", body, {headers});
  }


}
