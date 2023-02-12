import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { PageData } from 'app/dorm-application-pages/PageData';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  constructor(
    private http: HttpClient
  ) { }

  createPageData(pageData: PageData) {
    return this.http.post<PageData>(`${API_URL}/api/page-data-create`, pageData);
  }

  updatePageData(pageData: PageData) {
    return this.http.post<PageData>(`${API_URL}/api/page-data-update`, pageData);
  }

  getPageData(pageName: String) {
    return this.http.get<PageData>(`${API_URL}/api/page-data-get/${pageName}`);
  }

  deletePageData(id: String) {
    return this.http.delete(`${API_URL}/api/page-data-delete/${id}`);
  }
}
