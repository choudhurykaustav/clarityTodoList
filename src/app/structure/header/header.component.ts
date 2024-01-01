import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { User } from 'src/app/user/user-details/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage = 'Login';
  constructor( private router: Router) { }
  userDetails: User = new User();
  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if(ev.url === '/todo/landing'){
          this.currentPage = 'Todo';
          let userDetailsObj: User = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
          if (userDetailsObj.userName) {
            this.userDetails.userName = userDetailsObj.userName;
          }
        } else {
          this.currentPage = 'Login';
        }
      }
    });
  }

  logoutUser(){
    sessionStorage.removeItem('userDetails');
    this.router.navigate(['/user/details']);
  }

}
