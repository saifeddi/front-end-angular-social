import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPostContent: string = '';

   constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost(): void {
    if (this.newPostContent) {
      this.apiService.createPost(this.newPostContent).subscribe(post => {
        this.posts.unshift(post);
        this.newPostContent = '';
      });
    }
  }

  likePost(id: string): void {
    this.apiService.likePost(id).subscribe(post => {
      const updatedPost = this.posts.find(p => p._id === post._id);
      if (updatedPost) {
        updatedPost.likes = post.likes;
      }
    });
  }

  addComment(id: string, commentText: string ): void {
     
    this.apiService.addComment(id, commentText).subscribe(post => {
      const updatedPost = this.posts.find(p => p._id === post._id);
      if (updatedPost) {
        updatedPost.comments = post.comments;
       }
    });
  }

  onTextChange(index: number): void {
    this.posts[index].isDisabled = this.posts[index].text.trim() === '';
  }
}
