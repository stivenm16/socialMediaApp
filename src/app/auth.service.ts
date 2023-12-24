import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(): void {
    // Perform login actions, set isAuthenticated to true
    this.isAuthenticated = true;
  }

  logout(): void {
    // Perform logout actions, set isAuthenticated to false
    this.isAuthenticated = false;
  }
}
