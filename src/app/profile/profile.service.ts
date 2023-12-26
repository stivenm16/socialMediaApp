import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private api = `${environment.apiUrl}`;
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getUserInfo(email: string): any {
    try {
      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.token}`);
      return this.http.get<any>(`${this.api}/getUserBy/${email}`, {
        headers,
      });
    } catch (error) {
      console.error(error);
    }
  }

  updateInfoUser(fullname: string, age: number, email: string): any {
    try {
      const credentials = { email, fullname, age };

      let headers = new HttpHeaders();

      headers = headers.set('Authorization', `Bearer ${this.token}`);
      return this.http.put<any>(`${this.api}/updateUserInfo`, credentials, {
        headers,
      });
    } catch (error) {
      console.error(error);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
