import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:8080/auth/login';
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private options = new RequestOptions( {headers: this.headers });

  constructor(private http: Http) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(
      this.url,
      JSON.stringify({ user: username, password: password }),
      this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().accessToken;
        
        if (token) {
          // set token property
          this.setToken(token);

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
      // clear token remove user from local storage to log user out
    this.setToken(null);
    localStorage.removeItem('currentUser');
  }
}
