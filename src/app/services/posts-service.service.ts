import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { postsModel } from '../models/posts.model';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  createNewPost(newPostObject: postsModel): Observable<any> {
    return this.http.post(
      `https://jsonplaceholder.typicode.com/posts`,
      newPostObject
    );
  }
}
