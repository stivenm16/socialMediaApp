import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../services/posts.service';
import { Post } from '../types/types';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  @Input() posts: Post[] = [];
  @Input() currentUserID!: string;
  @Output() likesChanged: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  @Output() createdPost: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  @Output() deletedPost: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  editedPost: Post = { id: '', title: '', content: '', userid: '' };
  showEditModal = false;
  constructor(private postService: PostsService) {}

  isUserAuthorized(postUserID: string): boolean {
    return this.currentUserID === postUserID;
  }

  editPost(post: Post): void {
    if (this.isUserAuthorized(post.userid)) {
      this.openEditForm(post);
    } else {
      console.log("You're not authorized to edit this post.");
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editedPost = { id: '', title: '', content: '', userid: '' }; // Reset the edited post
  }
  submitEditedPost(): void {
    this.postService
      .updatePost(
        this.editedPost.id!,
        this.editedPost.title,
        this.editedPost.content
      )
      .subscribe(
        (response: any) => {
          if (response) {
            const postIndex = this.posts.findIndex(
              (p) => p.id === this.editedPost.id
            );
            if (postIndex !== -1) {
              this.posts[postIndex] = { ...this.editedPost };
            }

            this.closeEditModal();
          } else {
            console.error('Failed to update the post:', response.error);
          }
        },
        (error: any) => {
          console.error('Error updating post:', error);
        }
      );
  }
  openEditForm(post: Post): void {
    this.showEditModal = true;
    this.editedPost = {
      ...post,
    };
  }

  deletePost(post: Post): void {
    if (this.isUserAuthorized(post.userid)) {
      this.postService.deletePost(post.id!);

      this.posts = this.posts.filter((postT) => postT.id !== post.id);
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
              this.posts[postIndex].likes =
                (this.posts[postIndex].likes || 0) + 1;
            } else {
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
