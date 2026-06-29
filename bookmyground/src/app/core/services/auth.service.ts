import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const AUTH_KEY = 'bmg_admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private storage: StorageService) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.storage.set(AUTH_KEY, true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.storage.remove(AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.storage.get<boolean>(AUTH_KEY);
  }
}
