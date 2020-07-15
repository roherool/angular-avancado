import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/shared/directives/local-storage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
})
export class MenuLoginComponent {
  token: string = '';
  user: any;
  email: string = '';
  localStorage = new LocalStorage();

  constructor(private router: Router) {}

  loggedInUser(): boolean {
    this.token = this.localStorage.getUserToken();
    this.user = this.localStorage.getUser();

    if (this.user) this.email = this.user.email;

    return this.token !== null;
  }

  logout() {
    this.localStorage.clearLocalUserData();
    this.router.navigate(['/home']);
  }
}
