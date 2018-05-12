import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ]
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showUserInfo();
  }

  showUserInfo() {
<<<<<<< HEAD
    //this.user = this.userService.getUserInfo()
      //.subscribe((data: User) => this.user = { ...data });
=======
    this.userService.getUserInfo()
      .subscribe(
        (data: User) => {
          this.user = { ...data };
        }
      );
>>>>>>> dec744bef2739f5c387cd6ad4e6ab37dc3d35d84
  }

}
