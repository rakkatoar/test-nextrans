import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-nextrans';
  todos: any[] = [];
  constructor(
    public todoService: TodoService,
  ) {
    this.todos = this.todoService.getTodos();
  }

  getTodos() {
    this.todos = this.todoService.getTodos();
  }
}
