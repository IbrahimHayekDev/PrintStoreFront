import { Component, inject, OnInit } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserByIdResponse } from '../../models/user-response';
import { UserObject } from '../../models/user-object';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  _userApiService = inject(UserApiService);

  ngOnInit(): void {
    this.getUserData();
  }

  user: UserObject = {
    role: null,
    userName: '',
    mobileNumber: '',
    email: '',
  };
  router = inject(Router);

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
        }
      });
  }

  navigateToEdit() {
    this.router.navigateByUrl('/account/edit');
  }
}
