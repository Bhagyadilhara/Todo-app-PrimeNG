import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoResponse } from './todo';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private binUrl = 'https://api.jsonbin.io/v3/b/67c93985e41b4d34e4a1a68d';  // Replace with your Bin ID
  private apiKey = '$2a$10$j1nuMyrv80Uk2c3sNeiIX.CFFM/HntbGEpfCvQUba91KlRmlC4K8y';  // Replace with your API key

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Master-Key': this.apiKey  // Needed for write access
  });

  constructor(private http: HttpClient) {}

  // Fetch Todos
  getTodoList(): Observable<Todo[]> {
    return this.http.get<{ record: TodoResponse }>(this.binUrl, { headers: this.headers })
      .pipe(map(response => response.record.todos || []));  // Extracts the array
  }

  // Add Todo
  addTodo(todo: Todo): Observable<any> {
    return this.getTodoList().pipe(
      switchMap((todos) => {
        todos.push(todo);
        return this.http.put(this.binUrl, { todos }, { headers: this.headers });
      })
    );
  }

  // Update Todo
  updateTodo(todo: Todo): Observable<any> {
    return this.getTodoList().pipe(
      switchMap((todos) => {
        const updatedTodos = todos.map(t => (t.id === todo.id ? todo : t));
        return this.http.put(this.binUrl, { todos: updatedTodos }, { headers: this.headers });
      })
    );
  }

  // Delete Todo
  deleteTodo(id: string): Observable<any> {
    return this.getTodoList().pipe(
      switchMap((todos) => {
        const updatedTodos = todos.filter(t => t.id !== id);
        return this.http.put(this.binUrl, { todos: updatedTodos }, { headers: this.headers });
      })
    );
  }
}
