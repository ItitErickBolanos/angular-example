import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { RestService } from "src/app/services/rest.service";

@Component({
    selector: "app-add-posts",
    templateUrl: "add-posts.component.html"
})
export class AddPostsComponent implements OnInit, OnDestroy {
    @Input("userId") userId;
    @Output("postAdded") postAdded: EventEmitter<any> = new EventEmitter();

    public subscriptions: Subscription = new Subscription();
    public postForm: FormGroup;
    public tags: any[] = [];

    constructor(
        private restService: RestService,
        private formBuilder: FormBuilder
    ) {
        this.postForm = this.formBuilder.group({
            title: ["", Validators.required],
            body: ["", Validators.required]
        });
    }

    ngOnInit() {
        this.addTag(0);
    }

    sendPost() {
        const payload = {
            title: this.postForm.get("title").value,
            body: this.postForm.get("body").value,
            userId: this.userId,
            tags: this.buildTags()
        };
        
        this.subscriptions.add(this.restService.addPost(payload)
        .subscribe(resp => {
            this.postAdded.emit();
        }));
    }

    addTag(index) {
        this.postForm.addControl('tag' + index, new FormControl(''));
        this.tags.push(index);
    }

    buildTags() {
        const tags = [];
        this.tags.forEach(tag => {
            tags.push(this.postForm.get('tag' + tag).value);
        });

        return tags;
    }

    ngOnDestroy() {

    }
}