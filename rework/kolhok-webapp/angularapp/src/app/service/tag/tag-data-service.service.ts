import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Tag } from 'app/post-editor/post-editor.component';

@Injectable({
  providedIn: 'root'
})
export class TagDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTags() {
    return this.http.get<Tag[]>(`${API_URL}/api/tags`);
  }

  createTag(tag : Tag) {
    return this.http.post<Tag>(`${API_URL}/api/tag-create`, tag);
  }

  deleteTag(id: String) {
    return this.http.delete(`${API_URL}/api/tag-delete/${id}`);
  }
}
