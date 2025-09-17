import {CanActivateFn} from '@angular/router';
import {AccountService} from "../services/account-service";
import {inject} from "@angular/core";


export const authenticatedGuardGuard: CanActivateFn = async (route, state) => {
    const accountService: AccountService = inject(AccountService);
    try {
        await accountService.checkAuth().toPromise()
        return true;
    } catch (error) {
        try {
            accountService.logoutUser();
        } catch (error) {
        }
        return false;
    }
};
