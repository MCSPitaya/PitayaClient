import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  success = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
  }

  changePassword() {
    this.loading = true;
    this.userService.changePassword(this.model.oldPassword, this.model.newPassword)
      .subscribe(
          result => {
          this._flashMessagesService.show('Password changed successfully!', { cssClass: 'alert alert-success'});
          this.router.navigate(['/user']);
        },
      error => {
        this.error = 'Could not change Password!';
        this.loading = false;
      });
  }

}
