import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface Register {
  userName: string;
  email: string;
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
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const data: Register = form.value;
      if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
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
