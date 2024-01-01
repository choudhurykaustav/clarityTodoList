import { Injectable } from '@angular/core';
import { Todo } from './model/todo.model';
import { User } from '../user/user-details/models/user.model';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as ENV from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  //isConnectionAvailable:  <boolean>('') = navigator.onLine;
  isConnectionAvailable = new BehaviorSubject(navigator.onLine);
  constructor(private http: HttpClient) {
    this.checkNetworkStatus();
  }

  checkNetworkStatus(){
    window.addEventListener('online', () => {
      this.isConnectionAvailable.next(true);
    });

    window.addEventListener('offline', () => {
      this.isConnectionAvailable.next(false);
    });
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  fetchTodoByUser(): Observable<Todo[]> {
    let todoUrl = `${ENV.environment.envUrl}/todo/getTodosByUser?userName=`;
    let userObj;
    let userDetailsObj: User = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    if (userDetailsObj.userName) {
      userObj = {
        userName: userDetailsObj.userName
      };
    }
    return this.http.get<Todo[]>(`${todoUrl}${userDetailsObj.userName}`);
  }

  saveTodoList(todos: Todo[]){
    let todoUrl = `${ENV.environment.envUrl}/todo/updateTodosByUser`;
    let userObj;
    let userDetailsObj: User = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    if (userDetailsObj.userName) {
      userObj = {
        userName: userDetailsObj.userName,
        todoList: todos
      };
    }
    return this.http.post<Todo[]>(todoUrl, userObj);
  }

}
