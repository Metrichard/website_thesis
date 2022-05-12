import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentDataService {

  constructor(
    private http: HttpClient
  ) { }


  saveFileIntoDatabase(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${API_URL}/api/document-upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.http.request(req);
  }

  getFiles() : Observable<any> {
    return this.http.get(`${API_URL}/api/get-files`)
  }
}
