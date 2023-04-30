import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __importStar } from 'tslib';
import { API_URL } from '../../app.constants';
import { Post } from '../../post-editor/post-editor.component';

export class PostRequest {
  constructor(
    public id: String,
    public title: String,
    public author: String,
    public text: String,
    public tags: String[],
    public isPinned: String,
    public isHidden: String,
    public publicationDate: Date,
    public lastEditDate: Date,
    public files: String[]
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  request: PostRequest = new PostRequest('','','','',[],'','',new Date(), new Date(), []);

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllPosts() {
    return this.http.get<PostRequest[]>(`${API_URL}/api/posts/`);
  }

  retrieveAllPostsWithTag(tag: String) {
    if(tag === undefined || tag === 'undefined') {
      tag = '';
    }
    return this.http.get<PostRequest[]>(`${API_URL}/api/posts-w-tag/${tag}`);
  }

  retrivePostById(id: String) {
    return this.http.get<PostRequest>(`${API_URL}/api/posts/${id}`);
  }

  createPost(post: PostRequest) {
    return this.http.post<PostRequest>(`${API_URL}/api/post-create`, post);
  }

  updatePost(post: PostRequest) {
    return this.http.patch<PostRequest>(`${API_URL}/api/post-update`, post);
  }

  deletePost(id: String) {
    return this.http.delete(`${API_URL}/api/post-delete/${id}`);
  }

  getPinnedPost() {
    return this.http.get<Post>(`${API_URL}/api/post-pinned/`);
  }
}
