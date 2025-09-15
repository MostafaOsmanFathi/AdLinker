import {Routes} from '@angular/router';
import {Login} from './account/login/login';
import {Register} from './account/register/register';
import {ResetPassowrd} from './account/reset-passowrd/reset-passowrd';
import {Home} from './home/home';
import {PublisherHome} from './publisher/publisher-home/publisher-home';
import {MyLinks} from './publisher/my-links/my-links';
import {CreateLink} from './publisher/create-link/create-link';

export const routes: Routes = [
  {
    path: '',
    component: Home
  }, {
    path: "account",
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      },
      {
        path: 'rest-password',
        component: ResetPassowrd
      }
    ]
  },
  {
    path: 'publisher',
    component: PublisherHome,
    children: [
      {
        path: 'my-links',
        component: MyLinks
      }, {
        path: 'add-link',
        component: CreateLink
      }
    ]
  }
];
