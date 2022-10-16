import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../app.constants';
import { Post } from '../../main-page/main-page.component'

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllPosts() {
    return this.http.get<Post[]>(`${API_URL}/api/posts`)
  }

  retrivePostById(id: String) {
      return this.http.get<Post>(`${API_URL}/api/posts/${id}`)
  }

  createPost(post: Post) {
    return this.http.post<Post>(`${API_URL}/api/post-create`, post)
  }

  updatePost(id: String, post: Post) {
    return this.http.post<Post>(`${API_URL}/api/post-update`, post)
  }
}
