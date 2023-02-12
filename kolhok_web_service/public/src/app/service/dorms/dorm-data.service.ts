import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Dorm } from 'app/dorms-page/dorms-page.component';


@Injectable({
  providedIn: 'root'
})
export class DormDataService {

  constructor(
    private http: HttpClient
  ) { }

  retriveAllDormitories() {
    return this.http.get<Dorm[]>(`${API_URL}/api/dorms`);
  }

  getDormById(id: String) {
    return this.http.get<Dorm>(`${API_URL}api/dorm/${id}`);
  }

  updateDorm(id: String, dorm: Dorm) {
    return this.http.post<Dorm>(`${API_URL}/api/dorm-update`, dorm);
  }

  createDorm(dorm: Dorm) {
    return this.http.post<Dorm>(`${API_URL}/api/dorm-create`, dorm);
  }

  deleteDorm(id: String) {
    return this.http.delete(`${API_URL}/api/dorm-delete/${id}`);
  }
}
