import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private auth: AuthService) {}

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
    this.auth.registerUser({
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
    });
  }
}
