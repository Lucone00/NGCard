import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { IPost } from '../interfaces/post.interface';
import { PostResponse } from '../interfaces/post.interface';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url;

  constructor(private http: HttpClient) {
    this.url =
      'https://ng-card-new-default-rtdb.europe-west1.firebasedatabase.app/post';
  }

  insertPost(body: {}): Observable<PostResponse> {
    return this.http.post<PostResponse>(`${this.url}.json`, body);
  }

  getPost(): Observable<IPost[]> {
    return this.http.get<any>(this.url + '.json').pipe(
      map((jsonPost) => {
        return Object.values(jsonPost).map((jsonPost: any) => {
          const postObj: IPost = {
            id: jsonPost.id,
            title: jsonPost.title,
            body: jsonPost.body,
          };
          return postObj;
        });
      })
    );
  }

  getPostById(id: string): Observable<IPost> {
    console.log('getting post by id: ', id);
    return this.http.get<IPost>(`${this.url}/${id}.json`);
  }

  deletePost(id: string): Observable<any> {
    console.log(`${this.url}/${id}.json`);
    return this.http.delete(`${this.url}/${id}.json`);
  }

  updatePost(post: any, postId: string): Observable<any> {
    const url = `${this.url}/${postId}.json`;
    return this.http.patch(url, post);
  }
}
