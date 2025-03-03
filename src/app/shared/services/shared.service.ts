import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../../features/user-management/services/user-session.service';
import { loginResponseDTO } from '../../features/user-management/models/login-responseDTO';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private store_name = environment.store_name;
  private _cacheService = inject(CacheService);
  private _userSession = inject(UserSessionService);
  private router = inject(Router);

  getStoreName() {
    return this.store_name;
  }

  getCredentials() {
    return JSON.parse(localStorage.getItem('savedUsers') || '[]');
  }

  saveCredentials(userName: string, password: string) {
    let savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    let isFound = savedUsers.filter(
      (item: any) => item.loginUserName == userName
    )[0];
    if (!isFound) {
      savedUsers.push({
        loginUserName: userName,
        loginPassword: password,
      });
      localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    }
  }

  clearCredentials(userName: string) {
    let savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    let indexToRemove = savedUsers.findIndex(
      (item: any) => item.loginUserName == userName
    );
    if (indexToRemove >= 0) {
      savedUsers.splice(indexToRemove, 1);
      localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    }
  }

  postLogin(response: loginResponseDTO): void {
    this._userSession.loggedIn.next(true);
    this._userSession.user.next(response.data);
    this._cacheService.afterLogin(response.data);
    this.router.navigateByUrl('/home');
  }

  postLogout(logoutResponse?: string) {
    this._cacheService.afterLogut();
    this._userSession.loggedIn.next(false);
    this._userSession.user.next(null);
    this.router.navigateByUrl('/home');
  }
}
