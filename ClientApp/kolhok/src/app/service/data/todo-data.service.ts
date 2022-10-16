import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../app.constants';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username: string) {
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`);
  }

  deleteTodo(username: String, id: Number) {
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`)
  }

  retrieveTodo(username: String, id: Number) {
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`)
  }

  updateTodo(username: String, id: Number, todo: Todo) {
    return this.http.put(`${API_URL}/users/${username}/todos/${id}`, todo)
  }

  createTodo(username: String, todo: Todo) {
    return this.http.post(`${API_URL}/users/${username}/todos`, todo)
  }
}
