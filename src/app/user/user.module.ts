import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostsComponent } from './add-posts/add-posts.component';


@NgModule({
  declarations: [
    UserComponent,
    AddPostsComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
