import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Account} from '../intrefaces/acccount';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = environment.apiUrl;
  private userData: BehaviorSubject<any> = new BehaviorSubject({});
  private jwt_token: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {

  }

  registerUser(account: Account) {
    return this.http.post(this.baseUrl + "/account/register", account)
  }

  loginUser(email: string, password: string) {
    return this.http.post(this.baseUrl + "/account/login", {email: email, password: password})

  }

  set setJwtToken(token: string) {
    this.jwt_token.next(token);
  }

  set setUserObject(user: any) {
    this.jwt_token.next(user);
  }

  getJwtTokenObservable() {
    return this.jwt_token.asObservable();
  }

  getUserObservable() {
    return this.userData.asObservable();
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
