import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  error: string | null = null;

  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const data: any = form.value;
      if (data.email === 'test@example.com' && data.password === 'password') {
        localStorage.setItem('token', 'token')
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid credentials';
      }
    }
  }
}
