import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      birthdate: new FormControl('', { validators: [Validators.required] }),
    });
  }

  get getEmail() {
    return this.signUpForm.get('email');
  }

  get emailError() {
    return this.signUpForm.get('email')?.hasError('required');
  }

  get getPassword() {
    return this.signUpForm.get('password');
  }

  get passwordError() {
    return this.signUpForm.get('password')?.hasError('required');
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
    this.auth.loading.next(true);
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.auth.loading.next(false);
        this.auth.initAuthenticatedUser();
      })
      .catch((error) => {
        this.auth.loading.next(false);
        this.snackBar.open(error.message, 'Undo', {
          duration: 3000,
        });
      });
  }
}
