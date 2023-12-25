import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PostsComponent } from '../posts/posts.component';
import { PostsService } from '../services/posts.service';
import { Post } from '../types/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PostsComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  postsArray: Post[] = [];
  currentUserId = '3becdf1e-bfde-43dd-a451-5a7eca06b11b';
  newPost: Post = {
    title: '',
    content: '',
    userid: this.currentUserId,
  };

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getPosts().subscribe(
      (data: Post[]) => {
        this.postsArray = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  onLikesChanged(updatedPosts: Post[]): void {
    this.postsArray = updatedPosts;
  }
  createNewPost() {
    try {
      this.postsService.addPost(this.newPost);
      this.fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }
}
