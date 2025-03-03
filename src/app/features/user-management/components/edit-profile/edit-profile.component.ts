import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserByIdResponse } from '../../models/user-response';
import { UserApiService } from '../../services/user-api.service';
import { UserObject } from '../../models/user-object';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../helpers/error-state-matcher';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  _userApiService = inject(UserApiService);
  formbuilder = inject(FormBuilder);

  matcher = new MyErrorStateMatcher();
  router = inject(Router);

  user: UserObject = {
    role: null,
    userName: '',
    mobileNumber: '',
    email: '',
  };

  editProfileForm: FormGroup = this.formbuilder.group({
    firstname: ['', [Validators.required, this.noWhitespaceValidator]],
    lastname: ['', [Validators.required, this.noWhitespaceValidator]],
    mobilenumber: [''],
    email: [''],
  });

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this._userApiService
      .getUserData()
      .subscribe((response: UserByIdResponse) => {
        if (response.isSuccessful && response.data) {
          this.user = {
            role: response.data.role,
            userName: response.data.firstName + ' ' + response.data.lastName,
            mobileNumber: response.data.mobileNumber,
            email: response.data.email,
          };
          this.editProfileForm.patchValue({
            firstname: response.data.firstName,
            lastname: response.data.lastName,
            mobilenumber: response.data.mobileNumber,
            email: response.data.email,
          });
          this.editProfileForm.controls['email'].disable();
        }
      });
  }

  confirmEditProfileData() {
    let formValues = this.editProfileForm.getRawValue();
    let request = {
      firstName: formValues.firstname,
      lastName: formValues.lastname,
      mobileNumber: formValues.mobilenumber,
    };
    this._userApiService.editUserData(request).subscribe((response) => {
      if (response.isSuccessful) {
        this.router.navigateByUrl('account/view');
      }
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
