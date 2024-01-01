import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../model/todo.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  internetStatus: boolean = false;
  todoListFetched: boolean = false;
  doneStatus: boolean = false;
  userDataSubscription: any;
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.todos = [];
    this.todoListFetched = false;
    this.todoService.isConnectionAvailable.subscribe((val) => {
      this.internetStatus = val;
      if (!this.todoListFetched) {
        this.getTodoByUser();
      }
    });

  }

  getTodoByUser() {
    if (this.internetStatus) {
      this.userDataSubscription = this.todoService.fetchTodoByUser().subscribe((data) => {
        this.todoService.todos.push(...data);
        this.todoListFetched = true;
      },
        err => {
          console.log('No Data Found');
        });
    }
  }

  switchView(status: boolean) {
    this.doneStatus = status;
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

}
