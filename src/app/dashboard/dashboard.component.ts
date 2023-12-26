import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PostsComponent } from '../posts/posts.component';
import { PostsService } from '../services/posts.service';
import { Post } from '../types/types';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PostsComponent, FormsModule, SideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  postsArray: Post[] = [];
  currentUserId = localStorage.getItem('userId') || '';
  newPost: Post = {
    title: '',
    content: '',
    userid: this.currentUserId!,
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

  deletedPost(posts: Post[]) {
    console.log('eliminando');
    this.fetchPosts();
  }

  onLikesChanged(updatedPosts: Post[]): void {
    this.postsArray = updatedPosts;
  }
  createNewPost() {
    try {
      this.postsService.addPost(this.newPost).subscribe((res: any) => {
        if (res) {
          this.fetchPosts();
          this.newPost = {
            ...this.newPost,
            title: '',
            content: '',
          };
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
