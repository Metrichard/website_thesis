import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { FileWrapper } from 'app/post-editor/post-editor.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: FileWrapper) {
    return this.http.post<FileWrapper>(`${API_URL}/api/file-upload/`, file);
  }
}
