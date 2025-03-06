export interface Todo {
    id: string;
    task: string;
    completed: boolean;
  }
  
  export interface TodoResponse {
    todos: Todo[];
  }
  