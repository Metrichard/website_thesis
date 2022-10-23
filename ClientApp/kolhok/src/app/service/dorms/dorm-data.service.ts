import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Dorm } from '../../dorms-page/dorm-page/dorm-page.component'

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
}
