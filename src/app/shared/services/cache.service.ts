import { Injectable, signal } from '@angular/core';
import { loginResponseDTO } from '../../features/user-management/models/login-responseDTO';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  static getToken(): string | null {
    return localStorage.getItem('token') || null;
  }
  static getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setUser(User: any): void {
    localStorage.setItem('user', JSON.stringify(User));
  }

  afterLogin(data: any) {
    this.setToken(data?.token);
    this.setUser(data);
  }

  afterLogut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
