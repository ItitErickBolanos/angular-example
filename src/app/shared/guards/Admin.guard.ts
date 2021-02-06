import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Roles } from "src/app/models/roles";
import { AuthenticationService } from "src/app/services/authentication.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (currentUser.role === Roles.Admin) {
                return true;
            } else {
                this.router.navigate(["/user"]);
                return false;
            }
        }

        this.router.navigate(["/login"]);
        return false;
    }
}