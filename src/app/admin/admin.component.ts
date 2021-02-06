import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { AuthenticationService } from "../services/authentication.service";
import { RestService } from "../services/rest.service";

@Component({
    selector: "app-admin",
    templateUrl: "admin.component.html"
})
export class AdminComponent implements OnInit {
    public subscriptions: Subscription = new Subscription();
    public currentUser: User;
    public users: any;
    public firstUserPosts: any;

    constructor(
        private authenticationService: AuthenticationService,
        private restService: RestService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.subscriptions.add(this.restService.getUsers()
            .pipe(
                switchMap(users => {
                    this.users = users;
                    return this.restService.getPostsByUserId(users[0].id)
                })
            )
            .subscribe(posts => {
                this.firstUserPosts = posts;
            })
        );
    }

    ngOnDestroy() {

    }
}