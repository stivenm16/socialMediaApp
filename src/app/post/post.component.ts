import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { Post } from '../types/types';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [DatePipe],
})
export class PostComponent {
  @Output() edit: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() delete: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() like: EventEmitter<Post> = new EventEmitter<Post>();
  public postOwner: string | undefined;
  constructor(private profileService: ProfileService) {
    this.getInfo();
  }

  getInfo(): void {
    const email = localStorage.getItem('email');
    this.profileService.getUserInfo(email!).subscribe(
      (res: any) => {
        if (res) {
          const { fullname } = res;
          this.postOwner = fullname;
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
  @Input() post!: Post;

  onEdit(): void {
    this.edit.emit(this.post);
  }

  onDelete(): void {
    this.delete.emit(this.post);
  }

  onLike(): void {
    this.like.emit(this.post);
  }
}
