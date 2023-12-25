import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../services/posts.service';
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
  @Input() currentUserID!: string;
  constructor(private postService: PostsService) {}

  isUserAuthorized(postUserID: string): boolean {
    return this.currentUserID === postUserID;
  }

  editPost(post: Post): void {
    if (this.isUserAuthorized(post.userid)) {
      console.log(`Editing post with ID: ${post.id}`);
    } else {
      console.log("You're not authorized to edit this post.");
    }
  }

  deletePost(post: Post): void {
    if (this.isUserAuthorized(post.userid)) {
      console.log(post.id);
      this.postService.deletePost(post.id!);

      this.posts = this.posts.filter((postT) => postT.id! == post.id);
    } else {
      console.log("You're not authorized to delete this post.");
    }
  }
}
