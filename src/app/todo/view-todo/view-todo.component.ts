import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoStatus } from 'src/app/shared/enums/todo.enums';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss']
})
export class ViewTodoComponent implements OnInit {

  @Input() viewType: string = '';
  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  changeTodoStatus(status: string, id: number) {
    let todo: Todo = this.todoService.todos.filter(data => data.id === id)[0];
    if (status === 'INPROGRESS') {
      todo.status = TodoStatus.Inprogress;
    } else if (status === 'DONE') {
      todo.status = TodoStatus.Done;
    }else if (status === 'NEW') {
      todo.status = TodoStatus.New;
    }else if (status === 'DELETE') {
      this.todoService.todos.splice(this.todoService.todos.indexOf(todo),1);
    }
  }

}
