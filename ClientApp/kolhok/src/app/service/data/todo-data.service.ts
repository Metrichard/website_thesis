import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username: string) {
    return this.http.get<Todo[]>(`http://localhost:8080/users/${username}/todos`);
  }

  deleteTodo(username: String, id: Number) {
    return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`)
  }

  retrieveTodo(username: String, id: Number) {
    return this.http.get<Todo>(`http://localhost:8080/users/${username}/todos/${id}`)
  }

  updateTodo(username: String, id: Number, todo: Todo) {
    return this.http.put(`http://localhost:8080/users/${username}/todos/${id}`, todo)
  }

  createTodo(username: String, todo: Todo) {
    return this.http.post(`http://localhost:8080/users/${username}/todos`, todo)
  }
}
