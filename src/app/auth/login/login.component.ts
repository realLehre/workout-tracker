import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { UiLoadingService } from 'src/app/shared/ui-loading.service';
import { startLoading, stopLoading } from 'src/app/shared/ui.actions';
import * as fromApp from '../../state management/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiLoadingService: UiLoadingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get getEmail() {
    return this.loginForm.get('email');
  }

  get emailError() {
    return this.loginForm.get('email')?.hasError('required');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  get passwordError() {
    return this.loginForm.get('password')?.hasError('required');
  }

  get labelEmailColor() {
    if (
      (this.emailError && this.getEmail?.touched) ||
      (this.getEmail?.invalid && this.getEmail?.touched)
    ) {
      return true;
    }

    return;
  }

  get labelPasswordColor() {
    if (
      (this.passwordError && this.getPassword?.touched) ||
      (this.getPassword?.invalid && this.getPassword?.touched)
    ) {
      return true;
    }

    return;
  }
  onSubmit() {
    this.store.dispatch(startLoading());

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          this.store.dispatch(stopLoading());
        }
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());

        this.snackBar.open(error.message, 'Undo', {
          duration: 3000,
        });
      });
  }
}
