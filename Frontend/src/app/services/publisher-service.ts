import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Link} from "../intrefaces/link";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PublisherService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getAuthHeader(): HttpHeaders {
        const token = localStorage.getItem("jwt_token");
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });

    }

    getMyLinks(): Observable<Link[]> {
        const headers = this.getAuthHeader(); // Get the Authorization header
        return this.http.get<Link[]>(this.apiUrl + '/publisher/my-links', {headers}).pipe(
            map((response: any[]) =>
                response.map(item => ({
                    original_link: item.original_link,
                    shorten_link: item.shorten_link,
                    publisher_name: item.publisher_name,
                    publisher_email: item.publisher_email,
                    number_of_visitors: item.number_of_visitors,
                    public_visible: item.public_visible
                } as Link))
            )
        );
    }

    createLink(original_link: string) {
        const headers = this.getAuthHeader(); // Get the Authorization header
        return this.http.post<any>(this.apiUrl + '/publisher/createLink', {original_link: original_link}, {headers: headers})
    }

    deleteLinkById(shortenId: string) {
        const headers = this.getAuthHeader();
        return this.http.delete(this.apiUrl + '/publisher/mangeLink/' + shortenId, {headers: headers})
    }
}
