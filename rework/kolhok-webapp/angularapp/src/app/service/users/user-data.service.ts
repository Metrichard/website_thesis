import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/user-manager/User';
import { API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post<User>(`${API_URL}/api/register`, user);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${API_URL}/api/get-all-users`);
  }

  deleteUser(id: String) {
    return this.http.delete(`${API_URL}/api/delete-user/${id}`);
  }
}
