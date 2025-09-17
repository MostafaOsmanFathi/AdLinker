import {Routes} from '@angular/router';
import {Login} from './account/login/login';
import {Register} from './account/register/register';
import {ResetPassowrd} from './account/reset-passowrd/reset-passowrd';
import {Home} from './home/home';
import {PublisherHome} from './publisher/publisher-home/publisher-home';
import {MyLinks} from './publisher/my-links/my-links';
import {CreateLink} from './publisher/create-link/create-link';
import {Profile} from './profile/profile';
import {DeleteMyAccount} from './profile/delete-my-account/delete-my-account';
import {VisitHistory} from './profile/visit-history/visit-history';
import {UpdateProfile} from './profile/update-profile/update-profile';
import {ProfileDetails} from './profile/profile-details/profile-details';
import {publisherGuardGuard} from './guards/publisher-guard-guard';
import {authenticatedGuardGuard} from "./guards/authenticated-guard-guard";

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
      },
    ]
  }, {
    path: 'profile',
    component: Profile,
    canActivate:[authenticatedGuardGuard],
    children: [
      {
        path: 'details',
        component: ProfileDetails,
      },
      {
        path: 'update-profile',
        component: UpdateProfile
      }, {
        path: 'visit-history',
        component: VisitHistory

      },
      {
        path: 'delete-my-account',
        component: DeleteMyAccount
      }
    ]
  }, {
    path: 'publisher',
    component: PublisherHome,
    canActivate:[publisherGuardGuard,authenticatedGuardGuard],
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
