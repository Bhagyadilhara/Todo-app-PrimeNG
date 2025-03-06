import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { PlatformService } from './platform.service';
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
  task: string = '';
  isDesktop: boolean | undefined;

  constructor(private appService: AppService, private platformService: PlatformService) {}

  ngOnInit(): void {
    this.isDesktop = this.platformService.isBrowser() && window.innerWidth >= 768;
    this.getList();
  }

  getList(): void {
    this.appService.getTodoList().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo(): void {
    if (!this.task.trim()) return;  // Prevent empty tasks

    const newTodo: Todo = {
      id: Date.now().toString(),  // Generate unique ID
      task: this.task,
      completed: false
    };

    this.appService.addTodo(newTodo).subscribe(() => {
      this.task = '';  // Clear input
      this.getList();
    });
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo): void {
    const updatedTodo = { ...todo, completed: e.checked };
    this.appService.updateTodo(updatedTodo).subscribe();
  }

  deleteTodo(id: string): void {
    this.appService.deleteTodo(id).subscribe(() => {
      this.getList();
    });
  }
}
