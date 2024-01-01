import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../todo.service';
import { TodoStatus } from 'src/app/shared/enums/todo.enums';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CreateTodoComponent implements OnInit {
  internetStatus: boolean = false;
  connectionSubscription: any;
  todoCreated: boolean = false;
  todosUpdated: boolean = false;
  createTodoForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    status: new FormControl(TodoStatus.New)
  });
  constructor(modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private todoService: TodoService) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
    this.checkInternetStatus();
  }

  ngOnInit(): void {
  }

  checkInternetStatus() {
    this.connectionSubscription = this.todoService.isConnectionAvailable.subscribe((val) => {
      this.internetStatus = val;
    });
  }

  openCreateTodoModal(content: any) {
    this.modalService.open(content);
  }

  cancelTodo() {
    this.modalService.dismissAll();
  }

  createTodo() {
    let todo: Todo = new Todo();
    todo.id = Math.floor(Math.random() * 100000);
    todo.description = this.createTodoForm.value.description ? this.createTodoForm.value.description : '';
    todo.status = TodoStatus.New;
    this.todoService.addTodo(todo);
    this.todoCreated = true;
    setTimeout(() => {
      this.todoCreated = false;
    }, 3000);
    this.createTodoForm.reset();
    this.modalService.dismissAll();

  }

  saveTodo() {
    if (this.todoService.todos.length > 0) {
      this.todoService.saveTodoList(this.todoService.todos).subscribe((data) => {
        this.todosUpdated = true;
        setTimeout(() => {
          this.todosUpdated = false;
        }, 3000);
      });
    }
  }

  ngOnDestroy() {
    this.connectionSubscription.unsubscribe();
  }


}
