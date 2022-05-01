import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date) {
    
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[] = []

  message: String = ''
  // = [
  //   new Todo(1, 'learn to dance', false, new Date()),
  //   new Todo(2, 'Become an expert in angular', false, new Date()),
  //   new Todo(3, 'visit italy', true, new Date())
  // ]

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  deleteTodo(id: Number) {
    this.todoService.deleteTodo('meth', id).subscribe(
      response => {
        this.message = `Delete of Todo ${id} successful`;
        this.refreshTodos();
      }
    );
  }

  updateTodo(id: Number) {
    this.router.navigate(['todos', id])
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('meth').subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

}
