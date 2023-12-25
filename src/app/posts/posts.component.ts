import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() likesChanged: EventEmitter<Post[]> = new EventEmitter<Post[]>();
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

  likePost(post: Post): void {
    const postIndex = this.posts.findIndex((p) => p.id === post.id);
    if (postIndex !== -1) {
      this.postService.addLike(post.id!, this.currentUserID).subscribe(
        (response: any) => {
          if (response) {
            if (response.isLiked) {
              // If the post is liked, increment the likes count
              this.posts[postIndex].likes =
                (this.posts[postIndex].likes || 0) + 1;
            } else {
              // If the post is unliked, decrement the likes count if it's greater than 0
              this.posts[postIndex].likes =
                this.posts[postIndex].likes && this.posts[postIndex].likes! > 0
                  ? this.posts[postIndex].likes! - 1
                  : 0;
            }
          } else {
            console.error('Failed to like the post:', response.error);
          }
        },
        (error: any) => {
          console.error('Error adding like:', error);
        }
      );
    }
  }
}
