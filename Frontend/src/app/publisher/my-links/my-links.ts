import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FilterLinkPipePipe} from '../../pipes/filter-link-pipe-pipe';
import {Link} from "../../intrefaces/link"
import {PublisherService} from "../../services/publisher-service";
import {environment} from "../../../environments/environment";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-my-links',
    imports: [
        FormsModule,
        FilterLinkPipePipe,
        NgClass
    ],
    templateUrl: './my-links.html',
    styleUrl: './my-links.css'
})
export class MyLinks {
    searchTerm: string = "";
    errorMessage: string = "";
    links: Link[] = [];
    shortenBaseUrl: string = environment.shortenBaseUrl;

    constructor(private publisherService: PublisherService) {

    }

    ngOnInit() {
        this.publisherService.getMyLinks().subscribe(
            {
                next: (data: Link[]) => {
                    this.links = data;
                },
                error: (error) => {
                    this.errorMessage = JSON.stringify(error);
                }
            }
        )
    }

    invertVisibility(shortenId: string, currentVisibility: boolean, index: number) {
        if (currentVisibility) {
            this.publisherService.setLinkPrivate(shortenId)
                .subscribe(
                    {
                        next: (data) => {
                            this.links[index].public_visible = !this.links[index].public_visible;
                        },
                        error: (error) => {
                            this.errorMessage = "could not find link";
                            console.log(error)
                        }
                    }
                )
        } else {
            this.publisherService.setLinkPublic(shortenId).subscribe(
                {
                    next: (data) => {
                        this.links[index].public_visible = !this.links[index].public_visible;
                    },
                    error: (error) => {
                        this.errorMessage = "could not find link";
                        console.log(error)
                    }
                }
            )
        }
    }

    deleteLink(id: string, index: number) {
        this.publisherService.deleteLinkById(id).subscribe(
            {
                next: (data) => {
                    this.links.splice(index, 1);
                },
                error: (error) => {
                    this.errorMessage = JSON.stringify(error);
                }
            }
        )
    }
}
