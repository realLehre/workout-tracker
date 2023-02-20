import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private auth: AuthService) {}

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
    this.auth.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
