import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private api = 'http://localhost:3001/api/getToken';

  constructor(private http: HttpClient) {}
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(): void {
    // Perform login actions, set isAuthenticated to true

    this.isAuthenticated = true;
  }
  getToken(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  logout(): void {
    // Perform logout actions, set isAuthenticated to false
    this.isAuthenticated = false;
  }
}
