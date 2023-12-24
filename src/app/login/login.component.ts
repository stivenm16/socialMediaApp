import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  error: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;

      if (email && password) {
        this.authService.getToken().subscribe(
          (response: any) => {
            if (response && response.accessToken) {
              this.authService.login(
                email,
                password,
                this.router,
                response.accessToken
              );

              localStorage.setItem('token', response.accessToken);
            }
          },
          (error: any) => {
            console.error('Error fetching token:', error);
            localStorage.removeItem('token');
          }
        );
      } else {
        this.error = 'Invalid credentials';
      }
    } else {
      this.error = 'Invalid data';
    }
  }
}
