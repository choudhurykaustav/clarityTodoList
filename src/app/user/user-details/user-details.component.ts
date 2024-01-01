import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userForm = new FormGroup({
    userName: new FormControl('',Validators.required)
  });
  public userDetails = new User();
  constructor(private router: Router) {
    this.userDetails.userName = '';
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userDetails.userName = this.userForm.value.userName ? this.userForm.value.userName : '';
      sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      this.userForm.reset();
      this.userNavigateToTodo();
    }
  }

  userNavigateToTodo() {
    this.router.navigate(['/todo/landing']);
  }

}
