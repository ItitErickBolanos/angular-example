
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Roles } from "../models/roles";
import { User } from "../models/user";

@Injectable()
export class AuthenticationService {
    public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

    public users: User [] = [
        {
            id: "1",
            username: "user",
            password: "user",
            role: Roles.User
        },
        {
            id: "2",
            username: "admin",
            password: "admin",
            role: Roles.Admin
        }
    ];

    public get currentUserValue(): User {
        return this.currentUser.value;
    }

    constructor(
    ) {
        
    }

    login(username, password) {
        const loggedUser = this.users.find(user => user.username === username && user.password === password);
        
        if (loggedUser) {
            localStorage.setItem('currentUser', JSON.stringify(loggedUser));
        }

        this.currentUser.next(loggedUser);

        return this.currentUser;

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.next(null);
    }
}