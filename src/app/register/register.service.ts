import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private api = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  register(
    fullname: string,
    age: number,
    email: string,
    password: string,
    router: Router,
    token: string
  ) {
    try {
      const credentials = { fullname, age, email, password };

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${token}`);
      this.http
        .post<any>(`${this.api}/user`, credentials, { headers })
        .subscribe(
          (res) => {
            if (res.user.id) {
              router.navigate(['/login']);
              localStorage.removeItem('token');
            }
            return true;
          },
          (error) => {
            console.error('Login error:', error.error.message);
            localStorage.removeItem('token');
            return false;
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
