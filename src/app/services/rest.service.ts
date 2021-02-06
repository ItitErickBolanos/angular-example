
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class RestService {
    constructor(
        private http: HttpClient
    ) {

    }

    public getUsers() {
        return this.http.get<any>(`https://jsonplaceholder.typicode.com/users`);
    }

    public getPostsByUserId(userId: any) {
        return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    }

    public getFirsCommentInPost(postId: any) {
        return this.http.get<any>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                .pipe(
                    map(comments => comments[0])
                );
    }

    public addPost(postPayload: any) {
        return this.http.post<any>(`https://jsonplaceholder.typicode.com/posts`, postPayload);
    }
}