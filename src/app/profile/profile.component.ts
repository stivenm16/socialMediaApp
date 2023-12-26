import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SideNavComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  editedInfo: any = { fullname: '', email: '', age: 0 };
  email: string | null = localStorage.getItem('email');

  constructor(private profileService: ProfileService, private router: Router) {
    this.getInfo();
  }

  getInfo(): void {
    this.profileService.getUserInfo(this.email!).subscribe(
      (res: any) => {
        if (res) {
          const { fullname, email, age } = res;
          this.editedInfo = {
            ...this.editedInfo,
            fullname,
            email,
            age,
          };

          return res;
        }
        return true;
      },
      (error: any) => {
        console.error('getInfo error:', error.error.message);

        return false;
      }
    );
  }

  onSubmit(): void {
    const { fullname, email, age } = this.editedInfo;
    this.profileService.updateInfoUser(fullname, age, email).subscribe(
      (res: any) => {
        if (res.user.id) {
          this.router.navigate(['/dashboard']);
        }
        return true;
      },
      (error: any) => {
        console.error('Login error:', error.error.message);

        return false;
      }
    );

    console.log(this.editedInfo);
  }
}
