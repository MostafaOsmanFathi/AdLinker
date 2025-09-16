import {CanActivateFn} from '@angular/router';

export const publisherGuardGuard: CanActivateFn = (route, state) => {
    try {
        const userToken = localStorage.getItem("jwt_token");
        const userDataString = localStorage.getItem("user_data");

        if (userToken && userDataString) {
            const userData = JSON.parse(userDataString);

            if (userData.role === "publisher") {  // make sure this matches your stored object
                return true;
            }
        }
    } catch (error) {
        console.error(error);
    }

    alert("Not authorized");
    return false;
};
