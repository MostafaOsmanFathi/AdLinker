import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Account } from '../intrefaces/acccount';
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

}
