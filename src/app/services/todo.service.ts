import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos :any = [];

  constructor() {}

	getTodos(){
		return this.todos;
	}

	addTodos(todo:any){
		this.todos.push(todo)
	}
}
