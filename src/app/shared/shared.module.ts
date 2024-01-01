import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbBootstrapModule } from './ngb-bootstrap/ngb-bootstrap.module';
import { TodoFilterByStatusPipe } from './pipes/todo-filter-by-status.pipe';



@NgModule({
  declarations: [
    TodoFilterByStatusPipe
  ],
  exports: [
    TodoFilterByStatusPipe
  ],
  imports: [
    CommonModule,
    NgbBootstrapModule
  ]
})
export class SharedModule { }
