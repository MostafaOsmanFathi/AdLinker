import {CanActivateFn} from '@angular/router';
import {AccountService} from "../services/account-service";
import {inject} from "@angular/core";

const accountService: AccountService = inject(AccountService);

export const authenticatedGuardGuard: CanActivateFn = async (route, state) => {
    try {
        await accountService.checkAuth().toPromise()
        return true;
    } catch (error) {
        accountService.logoutUser();
        return false;
    }
};
