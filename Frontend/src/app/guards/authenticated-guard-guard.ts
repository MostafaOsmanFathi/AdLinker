import {CanActivateFn} from '@angular/router';
import {AccountService} from "../services/account-service";
import {inject} from "@angular/core";


export const authenticatedGuardGuard: CanActivateFn = async (route, state) => {
    const accountService: AccountService = inject(AccountService);
    try {
        await accountService.checkAuth().toPromise()
        alert("auth guard true")
        return true;
    } catch (error) {
        try {
            accountService.logoutUser().subscribe();
        } catch (error) {
            alert("auth guard false")
        }
        return false;
    }
};
