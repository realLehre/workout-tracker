import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let userToken = '';

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        userToken = user.refreshToken;
      }
    });

    if (localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
