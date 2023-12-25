import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  constructor(datePiPe: DatePipe) {}

  @Input() post!: Post;
}
