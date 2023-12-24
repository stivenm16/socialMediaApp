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
      const data: any = form.value;
      if (data.email === 'test@example.com' && data.password === '1') {
        console.log('click');
        this.authService.getToken().subscribe(
          (response) => {
            if (response && response.accessToken) {
              localStorage.setItem('token', response.accessToken);

              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            console.error('Error fetching token:', error);
          }
        );
      } else {
        this.error = 'Invalid credentials';
      }
    }
  }
}
