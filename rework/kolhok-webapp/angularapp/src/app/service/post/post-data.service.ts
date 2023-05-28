import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __importStar } from 'tslib';
import { API_URL } from '../../app.constants';
import { Post } from '../../post-editor/post-editor.component';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllPosts() {
    return this.http.get<Post[]>(`${API_URL}/api/posts/`);
  }

  retrieveAllPostsWithTag(tag: String) {
    if(tag === undefined || tag === 'undefined') {
      tag = '';
    }
    return this.http.get<Post[]>(`${API_URL}/api/posts-w-tag/${tag}`);
  }

  retrivePostById(id: String) {
    return this.http.get<Post>(`${API_URL}/api/posts/${id}`);
  }

  createPost(post: Post) {
    return this.http.post<Post>(`${API_URL}/api/post-create`, post);
  }

  updatePost(post: Post) {
    return this.http.patch<Post>(`${API_URL}/api/post-update`, post);
  }

  deletePost(id: String) {
    return this.http.delete(`${API_URL}/api/post-delete/${id}`);
  }

  getPinnedPost() {
    return this.http.get<Post>(`${API_URL}/api/post-pinned/`);
  }
}
