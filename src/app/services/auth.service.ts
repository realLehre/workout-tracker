import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './authData.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private user?: User | null;
  isUser = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(data: AuthData) {
    this.authenticateUser(data);
  }

  login(data: AuthData) {
    this.authenticateUser(data);
  }

  logout() {
    this.user = null;
    this.isUser.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuthUser() {
    return this.user != null;
  }

  private authenticateUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.isUser.next(true);
    this.router.navigate(['/training']);
  }
}
