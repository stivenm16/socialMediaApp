import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { Post } from '../types/types';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  @Input() posts: Post[] = [];
}
