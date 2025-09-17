import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Link} from "../intrefaces/link";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    constructor(private http: HttpClient) {

    }

    private getAuthHeader(): HttpHeaders {
        const token = localStorage.getItem("jwt_token");
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });

    }


    getForwardLinkData(shortenLinkId: string) {
        const header = this.getAuthHeader();
        return this.http.get<any>(environment.getForwardLink + shortenLinkId, {headers: header})

    }

    getPublicVisibleLinks() {
        return this.http.get<any[]>(environment.apiUrl + "/link/public-visible");
    }
}
