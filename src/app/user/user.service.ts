import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {

  userInfoUrl = '/api/user/info';
  changePasswordUrl = '/api/user/password';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('/api/users');
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.userInfoUrl);
  }

  changePassword(oldP: string, newP: string): Observable<boolean> {
    return this.http.post(
      this.changePasswordUrl,
      JSON.stringify({oldPassword: oldP, newPassword: newP}))
      .map((response: any) => {

        // return true to indicate successful password Change
        return true;
      });
  }


}
