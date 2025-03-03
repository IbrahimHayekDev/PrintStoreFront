import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<any>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get setUser() {
    return this.user.asObservable();
  }
}
