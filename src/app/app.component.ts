import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initAuthenticatedUser();
    this.authService.loading.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
