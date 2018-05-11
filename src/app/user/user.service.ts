import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserService {

  userInfoUrl = '/api/user/info';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('/api/users');
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.userInfoUrl);
  }
}
