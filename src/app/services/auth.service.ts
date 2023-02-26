import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject, Subscription } from 'rxjs';
import { ExerciseService } from '../training/exercise.service';
import { AuthData } from './authData.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private user!: User | null;
  isUser = new Subject<boolean>();
  token!: string;
  loading = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private exerciseService: ExerciseService
  ) {}

  registerUser(data: AuthData) {
    this.authenticateUser(data);
  }

  login(data: AuthData) {
    this.authenticateUser(data);
  }

  logout() {
    this.exerciseService.fbSubs.forEach((sub) => {
      sub.unsubscribe();
    });
    this.afAuth.auth.signOut();
    this.user = null;
    this.isUser.next(false);
    this.router.navigate(['/login']);
  }

  initAuthenticatedUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isUser.next(true);

        this.router.navigate(['/training']);

        this.token = user.refreshToken;

        localStorage.setItem('user', this.token);
      } else {
        this.isUser.next(false);

        localStorage.removeItem('user');

        this.router.navigate(['/login']);
      }
    });
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
