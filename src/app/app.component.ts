import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('todoTask') todoTask: any;

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
    //console.log("added",this.task);
    this.appService.addTodo({task: this.task, completed: false}).subscribe(() => {
      this.todoTask.reset();
      this.getList();
    });
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    //console.log(e, todo);
    this.appService.updateTodo({...todo,completed: e.checked}).subscribe(() => {
      //this.getList();
    });

  }

  deleteTodo(e: unknown, id: Todo['id']) {
    //console.log(e, id);
    this.appService.deleteTodo(id).subscribe(() => {
      this.getList();
    });
  }
}
