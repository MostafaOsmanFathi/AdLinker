import {Routes} from '@angular/router';
import {Login} from './account/login/login';
import {Register} from './account/register/register';
import {ResetPassowrd} from './account/reset-passowrd/reset-passowrd';

export const routes: Routes = [
  {
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
        path: 'restPassword',
        component: ResetPassowrd
      }
    ]
  }
];
