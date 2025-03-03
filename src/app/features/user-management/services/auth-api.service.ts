import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { loginResponseDTO } from '../models/login-responseDTO';
import { SignupRequest } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';
import { ValidateRequest } from '../models/validate-account-request';
import { ValidateResponse } from '../models/validate-account-response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apiService: ApiService) {}

  login(payload: any): Observable<loginResponseDTO> {
    return this.apiService.postData('Auth/login', payload);
  }

  logout(): Observable<any> {
    return this.apiService.postData('Auth/logout', {});
  }

  signup(payload: SignupRequest): Observable<SignupResponse> {
    return this.apiService.postData('Auth/signup', payload);
  }

  validateAccount(payload: ValidateRequest): Observable<ValidateResponse> {
    return this.apiService.postData('Auth/validateAccount', payload);
  }
}
