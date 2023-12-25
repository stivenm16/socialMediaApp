import { Component, OnInit } from '@angular/core';

import { PostsComponent } from '../posts/posts.component';
import { PostsService } from '../services/posts.service';
import { Post } from '../types/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  postsArray: Post[] = [];
  newPost: Post = {
    id: '4a29e1d1-1e1f-4120-a33c-bfd14535ae56',
    title: 'nombre prueba',
    content: 'soy un post de prueba',
    createdat: '2023-12-24T01:37:58.751Z',
    updatedat: '2023-12-24T01:37:58.751Z',
    deletedat: null,
    userid: '3becdf1e-bfde-43dd-a451-5a7eca06b11b',
    likes: 2,
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

  createNewPost() {
    try {
      this.postsService.addPost(this.newPost);
      this.postsArray.push(this.newPost);
    } catch (error) {
      console.error(error);
    }
  }
}
