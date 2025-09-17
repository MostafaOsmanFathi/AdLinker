import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Account} from '../intrefaces/acccount';
import {BehaviorSubject, finalize, map, Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private baseUrl: string = environment.apiUrl;
    private userData: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(<string>localStorage.getItem('userData')) || {});
    private jwt_token: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('jwt_token') || "");

    constructor(private http: HttpClient, private router: Router) {

    }

    registerUser(account: Account) {
        return this.http.post(this.baseUrl + "/account/register", account)
    }

    loginUser(email: string, password: string) {
        return this.http.post(this.baseUrl + "/account/login", {email: email, password: password})

    }

    setJwtToken(token: string): void {
        this.jwt_token.next(token);
        localStorage.setItem('jwt_token', token);
    }

    setUserObject(user: any): void {
        this.userData.next(user);
        localStorage.setItem('userData', JSON.stringify(user)); // update localStorage
    }

    getJwtTokenObservable(): Observable<string> {
        return this.jwt_token.asObservable();
    }

    getUserObservable(): Observable<any> {
        return this.userData.asObservable();
    }

    getUserValue() {
        return this.userData.value;
    }

    clearObserveData(): void {
        this.setJwtToken("");
        this.setUserObject({});
    }


    private getAuthHeader(): HttpHeaders {
        const token = localStorage.getItem("jwt_token");
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });

    }

    logoutUser() {
        const headers = this.getAuthHeader();
        const body = {};
        return this.http.post(this.baseUrl + "/account/logout", body, {headers}).pipe(
            finalize(() => {
                localStorage.removeItem("jwt_token");
                localStorage.removeItem("user_data");
                this.clearObserveData();
                this.router.navigate(['/']);
            })
        );
    }

    checkAuth() {
        const header = this.getAuthHeader();
        return this.http.get(this.baseUrl + "/account/auth", {headers: header})
    }

    getMyAccountDetails() {
        const header = this.getAuthHeader();
        return this.http.get(this.baseUrl + "/account/my-account", {headers: header})
    }

    getMyVisitHistory(): Observable<any[]> {
        const header = this.getAuthHeader();
        return this.http.get<any[]>(this.baseUrl + "/account/my-visits-history", {headers: header});

    }

    deleteMyAccount() {
        const header = this.getAuthHeader();
        return this.http.delete(this.baseUrl + "/account/my-account", {headers: header}).pipe(
            finalize(() => {
                localStorage.removeItem("jwt_token");
                localStorage.removeItem("user_data");
                this.clearObserveData();
                this.router.navigate(['/']);
            })
        )
    }

    updateAccountData(updatedData: any) {
        const header = this.getAuthHeader();
        return this.http.put(this.baseUrl + "/account/my-account", updatedData, {headers: header})
    }

}
