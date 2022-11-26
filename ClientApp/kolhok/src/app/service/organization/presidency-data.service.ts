import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Person } from 'app/organization/organization.component';

@Injectable({
  providedIn: 'root'
})
export class PresidencyDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPeople() {
    return this.http.get<Person[]>(`${API_URL}/api/pres-people`);
  }

  getPerson(id: String) {
    return this.http.get<Person>(`${API_URL}/api/pres-person/${id}`);
  }

  createPerson(person: Person) {
    return this.http.post<Person>(`${API_URL}/api/pres-person-create`, person);
  }

  updatePerson(person: Person) {
    return this.http.post<Person>(`${API_URL}/api/pres-person-update`, person);
  }

  deletePerson(id: String) {
    return this.http.delete(`${API_URL}/api/pres-person-delete/${id}`);
  }
}
