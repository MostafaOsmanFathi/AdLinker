import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-publisher-home',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './publisher-home.html',
  styleUrl: './publisher-home.css'
})
export class PublisherHome {

}
