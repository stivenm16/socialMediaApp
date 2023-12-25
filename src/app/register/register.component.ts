import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterService } from './register.service';

interface Register {
  fullName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule],
  standalone: true,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errors: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const data: Register = form.value;
      if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const { email, password, fullName, age } = form.value;
      if (email && password) {
        this.authService.getToken().subscribe(
          (response: any) => {
            if (response && response.accessToken) {
              this.registerService.register(
                fullName,
                age,
                email,
                password,
                this.router,
                response.accessToken
              );

              // localStorage.setItem('token', response.accessToken);
            }
          },
          (error: any) => {
            console.error('Error fetching token:', error);
            localStorage.removeItem('token');
          }
        );
      } else {
        this.errors = 'Invalid credentials';
      }
      // this.http
      //   .post('/api/auth/register', {
      //     userName: data.userName,
      //     email: data.email,
      //     password: data.password,
      //   })
      //   .subscribe((res: any) => {
      //     if (res.ok) {
      //       this.router.navigate(['/auth/login']);
      //     }
      //   });
      console.log(data, '<-----');
    }
  }
}
