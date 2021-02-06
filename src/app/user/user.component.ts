import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { RestService } from "../services/rest.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
    public userPosts: any;
    public subscriptions: Subscription = new Subscription();
    public currentUser: any;
    public showAddPost: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private restService: RestService
    ) {

    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;

        this.loadUserPosts();
    }

    loadUserPosts() {
        this.subscriptions.add(this.restService.getPostsByUserId(this.currentUser.id)
        .subscribe(resp => {
            this.userPosts = resp;
            this.showAddPost = false;
        }));
    }

    showFirstComment(postId) {
        this.subscriptions.add(this.restService.getFirsCommentInPost(postId)
        .subscribe(resp => {
            this.userPosts.find(post => post.id === postId).firstComment = resp;
        }));
    }

    hideFirstComment(postId) {
        this.userPosts.find(post => post.id === postId).firstComment = null;
    }

    addPost() {
        this.showAddPost = true;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}