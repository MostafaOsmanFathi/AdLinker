import {Component} from '@angular/core';
import {LinkService} from "../services/link-service";
import {Link} from "../intrefaces/link";
import {environment} from "../../environments/environment";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-visible-links',
    imports: [
        RouterLink
    ],
    templateUrl: './visible-links.html',
    styleUrl: './visible-links.css'
})


export class VisibleLinks {

    links: LinkResponse[] = [];
    clientUrl: string = environment.frontEndBaseUrl

    constructor(private linkService: LinkService) {
    }

    ngOnInit() {
        this.linkService.getPublicVisibleLinks()
            .subscribe(
                {
                    next: (response) => {
                        this.links = response.map<LinkResponse>((link) => {
                            return {
                                shortenLinkId: link.shorten_link,
                                publisher_name: link.publisher_name,
                                numberOfVisits: link.number_of_visitors
                            }
                        })

                        console.log(this.links)
                    },
                    error: (error: Error) => {
                        console.log(error)
                    }
                }
            )
    }
}

interface LinkResponse {
    shortenLinkId: string;
    publisher_name: string;
    numberOfVisits: number;
}
