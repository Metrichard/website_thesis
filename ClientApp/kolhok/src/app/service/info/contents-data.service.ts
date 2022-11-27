import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Contents } from 'app/informations/informations.component';

@Injectable({
  providedIn: 'root'
})
export class ContentsDataService {

  constructor(
    private http: HttpClient
  ) { }

  saveContents(contents: Contents) {
    return this.http.post<Contents>(`${API_URL}/api/contents-save`, contents);
  }

  getContents() {
    return this.http.get<Contents>(`${API_URL}/api/contents-get`);
  }
}
