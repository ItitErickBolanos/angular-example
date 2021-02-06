import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Roles } from '../models/roles';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public sentForm: boolean = false;
  public subscriptions: Subscription = new Subscription();
  public error: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  sendLoginForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const username = this.loginForm.get("username").value;
      const password = this.loginForm.get("password").value;

      this.subscriptions.add(this.authenticationService.login(username, password)
      .subscribe(resp => {
        if (resp) {
          if (resp.role === Roles.Admin) {
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/user"]);
          }
        } else {
          this.error = "Invalid username or password";
        }
      }, error => {
        this.error = error;
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
