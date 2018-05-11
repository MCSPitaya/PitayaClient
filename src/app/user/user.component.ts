import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ]
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.showUserInfo();
  }

  showUserInfo() {
    this.user = this.userService.getUserInfo()
      .subscribe((data: User) => this.user = { ...data });
  }

}
