import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FilterLinkPipePipe} from '../../pipes/filter-link-pipe-pipe';

@Component({
  selector: 'app-my-links',
  imports: [
    FormsModule,
    FilterLinkPipePipe
  ],
  templateUrl: './my-links.html',
  styleUrl: './my-links.css'
})
export class MyLinks {
  searchTerm: string = "";
  links = [
    {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }, {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }, {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }, {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }, {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }, {
      original_link: "https://www.youtube.com/",
      shorten_link: "hWzKx",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 120
    },
    {
      original_link: "https://angular.io/",
      shorten_link: "Ng123",
      publisher_name: "mostafa",
      publisher_email: "mopub@gmail.com",
      number_of_visitors: 45
    }
  ];

  viewDetails(id: string) {
    // this.router.navigate(['/publisher/link', id]);
  }

  deleteLink(id: string) {
    // Call API to delete
    // console.log("Deleting link with ID:", id);
  }

}
