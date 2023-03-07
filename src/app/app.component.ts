import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './services/auth.service';
import { startLoading } from './shared/ui.actions';
import * as fromApp from './state management/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authService.initAuthenticatedUser();

    this.store.select(fromApp.getUiState).subscribe((value) => {
      this.isLoading = value.isLoading;
    });
  }
}
