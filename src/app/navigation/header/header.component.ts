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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<any>();
  isAuth: boolean = false;
  authSub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.auth.isUser.subscribe((user) => {
      this.isAuth = user;
    });
  }

  onToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
