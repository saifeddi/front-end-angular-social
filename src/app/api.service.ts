import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createPost(content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { content });
  }

  likePost(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/like`, {});
  }

  addComment(id: string, text: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/comment`, { text });
  }
}
