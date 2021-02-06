import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Created Modules
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { RestService } from './services/rest.service';

//Services

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
