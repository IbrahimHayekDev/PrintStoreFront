import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { ValidateRequest } from '../../models/validate-account-request';
import { ValidateResponse } from '../../models/validate-account-response';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss',
})
export class VerifyAccountComponent implements OnInit {
  route = inject(ActivatedRoute);
  snapshotData: any;
  token: string = '';
  email: string = '';
  _authApiService = inject(AuthApiService);
  isAccountVerified: boolean = false;
  router = inject(Router);

  ngOnInit(): void {
    this.snapshotData = this.route.snapshot.data;
    this.token = this.route.snapshot.params['token'];
    this.email = this.route.snapshot.params['email'];
    this.validateAccount();
  }

  validateAccount() {
    let payload: ValidateRequest = {
      email: this.email,
      token: this.token,
    };
    this._authApiService
      .validateAccount(payload)
      .subscribe((response: ValidateResponse) => {
        if (response.isSuccessful) {
          this.router.navigate(['/account/login'], {
            state: { signupEmail: this.email || '' },
          });
        }
      });
  }
}
