import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private api = `${environment.apiUrl}`;
  private tokenSubscription: any;

  constructor(private http: HttpClient) {}
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): any {
    return (this.tokenSubscription = this.http.get<any>(
      `${this.api}/getToken`
    ));
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
  login(
    email: string,
    password: string,
    router: Router,
    token: string
  ): void | boolean {
    const credentials = { email, password };

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);
    this.http
      .post<any>(`${this.api}/login`, credentials, { headers })
      .subscribe(
        (res) => {
          if (res.user.id) {
            localStorage.setItem('userId', res.user.id);
            router.navigate(['/dashboard']);
          }
          return true;
        },
        (error) => {
          console.error('Login error:', error.error.message);
          localStorage.removeItem('token');
          return false;
        }
      );
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
