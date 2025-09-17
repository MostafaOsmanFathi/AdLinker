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
import {ShortenLink} from "./shorten-link/shorten-link";
import {VisibleLinks} from "./visible-links/visible-links";

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home | ShortyLink'
    },
    {
        path: 'account',
        children: [
            {
                path: 'login',
                component: Login,
                title: 'Login | ShortyLink'
            },
            {
                path: 'register',
                component: Register,
                title: 'Register | ShortyLink'
            },
            {
                path: 'rest-password',
                component: ResetPassowrd,
                title: 'Reset Password | ShortyLink'
            }
        ]
    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [authenticatedGuardGuard],
        title: 'My Profile | ShortyLink',
        children: [
            {
                path: 'details',
                component: ProfileDetails,
                title: 'Profile Details | ShortyLink'
            },
            {
                path: 'update-profile',
                component: UpdateProfile,
                title: 'Update Profile | ShortyLink'
            },
            {
                path: 'visit-history',
                component: VisitHistory,
                title: 'Visit History | ShortyLink'
            },
            {
                path: 'delete-my-account',
                component: DeleteMyAccount,
                title: 'Delete Account | ShortyLink'
            }
        ]
    },
    {
        path: 'visit-history',
        component: VisitHistory,
        canActivate: [authenticatedGuardGuard],
        title: 'Visit History | ShortyLink'
    },
    {
        path: 'publisher',
        component: PublisherHome,
        canActivate: [publisherGuardGuard, authenticatedGuardGuard],
        title: 'Publisher Dashboard | ShortyLink',
        children: [
            {
                path: 'my-links',
                component: MyLinks,
                title: 'My Links | ShortyLink'
            },
            {
                path: 'add-link',
                component: CreateLink,
                title: 'Create Link | ShortyLink'
            }
        ]
    },
    {
        path: 'shyln/:linkId',
        component: ShortenLink,
        title: 'Redirecting... | ShortyLink'
    },
    {
        path: 'public-links',
        component: VisibleLinks,
        title: 'Public Links | ShortyLink'
    },
    {
        path: '**',
        component: Home,
        title: 'Home | ShortyLink'
    }
];
