import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-primeng-todo';
  todos = [
    {
    id:1,
    task: 'Task 1',
    completed: true
    },    
    {
      id:2,
      task: 'Task 2',
      completed: false
    },
  ];

  task: any = '';

  addTodo(){
    console.log("added",this.task);
  }

  updateTodo(e: unknown, todo: Todo) {
    console.log(e, todo);

  }

  deleteTodo(e: unknown, id: Todo['id']) {
    console.log(e, id);
  }
}
