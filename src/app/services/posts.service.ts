import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Post } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private api = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  getPosts(): Observable<Post[]> {
    const headers = this.getHeaders();
    return this.http.get<Post[]>(`${this.api}/getAllPosts`, {
      headers,
    });
  }

  addPost(newPost: Post): any {
    const headers = this.getHeaders();
    return this.http
      .post<Post[]>(`${this.api}/createPost`, newPost, {
        headers,
      })
      .subscribe((res) => {
        return res;
      });
  }
  addLike(postId: string, userId: string): any {
    const headers = this.getHeaders();
    return this.http.post<Post[]>(
      `${this.api}/like/${postId}`,
      { userId },
      {
        headers,
      }
    );
  }
  deletePost(id: string): any {
    const headers = this.getHeaders();
    return this.http
      .delete<Post[]>(`${this.api}/deletePost/${id}`, {
        headers,
      })
      .subscribe((res) => {
        return res;
      });
  }
}
