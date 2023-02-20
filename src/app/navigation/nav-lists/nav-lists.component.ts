import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-lists',
  templateUrl: './nav-lists.component.html',
  styleUrls: ['./nav-lists.component.scss'],
})
export class NavListsComponent implements OnInit, OnDestroy {
  @Output() closeNav = new EventEmitter<void>();
  isAuth: boolean = false;
  authSub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.auth.isUser.subscribe((user) => {
      this.isAuth = user;
    });
  }

  closeSideNav() {
    this.closeNav.emit();
  }

  onLogout() {
    this.closeNav.emit();
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
