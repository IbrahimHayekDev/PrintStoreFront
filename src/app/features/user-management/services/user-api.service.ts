import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { UserByIdResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private apiService: ApiService) {}

  getUserData(): Observable<UserByIdResponse> {
    return this.apiService.getData('User/getUserData');
  }

  editUserData(request: any): Observable<any> {
    return this.apiService.postData('User/editUser', request);
  }

  getStoreInfo(): Observable<any> {
    return this.apiService.getData('Printful/get-products');
  }
}
