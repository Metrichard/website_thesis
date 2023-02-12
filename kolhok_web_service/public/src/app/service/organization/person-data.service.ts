import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/app.constants';
import { Person } from 'app/organization/organization.component';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPeople() {
    return this.http.get<Person[]>(`${API_URL}/api/people`);
  }

  getPerson(id: String) {
    return this.http.get<Person>(`${API_URL}/api/person/${id}`);
  }

  createNewPerson(person: Person) {
    return this.http.post<Person>(`${API_URL}/api/person-create`, person);
  }

  deletePerson(id: String) {
    return this.http.delete(`${API_URL}/api/person-delete/${id}`);
  }

  updatePerson(person: Person) {
    return this.http.post<Person>(`${API_URL}/api/person-update`, person);
  }
}
