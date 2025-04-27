import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
})
export class NavbarComponent {

  constructor(private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loginUserName() : string {
    return this.authService.loginUserName();
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

  logout() {
    this.authService.logout()
  }

}
