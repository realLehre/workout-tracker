import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UiLoadingService } from './shared/ui-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private uiLoadingService: UiLoadingService
  ) {}

  ngOnInit(): void {
    this.authService.initAuthenticatedUser();

    this.uiLoadingService.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
  }
}
