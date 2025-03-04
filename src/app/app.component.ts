import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Todo App';
  todos: Todo[] = [];
  task: any = '';

  constructor(private appService: AppService) {}
    
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getList();
  }

  getList(){
    this.appService.getTodoList().subscribe((data) => {
      this.todos = data;
    });
  }

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
