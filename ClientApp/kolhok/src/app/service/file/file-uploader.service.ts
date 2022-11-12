import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { FileWrapper } from 'app/post-editor/post-editor.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File) {
    const data: FormData = new FormData();
    data.append('file', file);

    const newRequest = new HttpRequest('POST', `${API_URL}/api/file-upload/`, data, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(newRequest);
  }

  getFile(name: String) {
    return this.http.get(`${API_URL}/api/file-get/${name}`, { responseType: 'blob' });
    //return this.http.get<Blob>(`${API_URL}/api/file-get/${name}`);
  }

  deleteFile(name: String) {
    return this.http.delete(`${API_URL}/api/file-delete/${name}`);
  }
}
