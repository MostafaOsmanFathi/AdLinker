import {Component} from '@angular/core';
import {LinkService} from "../services/link-service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-shorten-link',
    imports: [],
    templateUrl: './shorten-link.html',
    styleUrl: './shorten-link.css'
})
export class ShortenLink {
    original_link: string = "";
    shortenLinkId: string;
    errorMessage: string = ""
    isLoading: boolean = true;
    showButton: boolean = false;
    countdown: number = 10;


    constructor(private linkService: LinkService, private activatedRoute: ActivatedRoute) {
        this.shortenLinkId = activatedRoute.snapshot.params['linkId'];
    }

    ngOnInit() {
        this.linkService.getForwardLinkData(this.shortenLinkId)
            .subscribe({
                next: (res) => {
                    this.original_link = res.original_link;
                    this.startCountdown();
                },
                error: (err) => {
                    this.errorMessage = "Not a valid ShortenLink or ID";
                    this.isLoading = false;
                }
            });

    }

    startCountdown() {
        const interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(interval);
                this.showButton = true;
                this.isLoading = false;
            }
        }, 1000);
    }

    redirectToOriginal() {
        if (this.original_link) {
            window.location.href = this.original_link;
        }
    }

}
