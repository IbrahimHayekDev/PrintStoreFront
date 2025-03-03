import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { MyErrorStateMatcher } from '../../helpers/error-state-matcher';
import { SignupRequest } from '../../models/signup-request';
import { SignupResponse } from '../../models/signup-response';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  sharedService = inject(SharedService);
  formbuilder = inject(FormBuilder);
  matcher = new MyErrorStateMatcher();
  passwordVisible = false;
  _authService = inject(AuthApiService);
  router = inject(Router);

  signupForm: FormGroup = this.formbuilder.group(
    {
      email: [
        '',
        [Validators.required, Validators.email, this.noWhitespaceValidator],
      ],
      password: [
        '',
        [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.minLength(8),
          this.hasUppercase,
          this.hasNumber,
          this.hasSpecialCharacter,
        ],
      ],
      repeatPassword: ['', [Validators.required, this.noWhitespaceValidator]],
      firstname: ['', [Validators.required, this.noWhitespaceValidator]],
      lastname: ['', [Validators.required, this.noWhitespaceValidator]],
      mobilenumber: [''],
    },
    { validator: this.passwordMatchValidator }
  );

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
  signup(): void {
    if (this.signupForm.valid) {
      let payload: SignupRequest = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
      };
      let formValues = this.signupForm.getRawValue();
      payload = {
        firstName: formValues.firstname,
        lastName: formValues.lastname,
        mobileNumber: formValues.mobilenumber,
        email: formValues.email,
        password: formValues.password,
      };
      this._authService
        .signup(payload)
        .subscribe((response: SignupResponse) => {
          if (response.isSuccessful && response.data) {
            this.router.navigate(['/account/login'], {
              state: { signupEmail: response.data?.email || '' },
            });
          }
        });
    }
  }

  // Custom validator to check if the password contains at least one uppercase letter
  hasUppercase(control: AbstractControl) {
    const value = control.value;
    if (value && !/[A-Z]/.test(value)) {
      return { uppercase: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one number
  hasNumber(control: AbstractControl) {
    const value = control.value;
    if (value && !/\d/.test(value)) {
      return { number: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one special character
  hasSpecialCharacter(control: AbstractControl) {
    const value = control.value;
    if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('repeatPassword')?.value;
    if (confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
