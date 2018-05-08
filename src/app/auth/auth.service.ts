import {HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule, Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';
export const REFRESH_TOKEN_NAME: string = 'refresh_token';

@Injectable()
export class AuthService {

  private url: string = '/auth/login';
  //private options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(
      this.url,
      JSON.stringify({user: username, password: password}))
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        let accessToken = response.accessToken;
        let refreshToken = response.refreshToken;

        this.setToken(accessToken);
        this.setRefreshToken(refreshToken);

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({username: username, token: response}));
        // return true to indicate successful login
        return true;
      });
  }

  refreshTokens() {
    return this.http.post('/auth/refresh', null).map((response: any) => {
      // login successful if there's a jwt token in the response
      let accessToken = response.accessToken;
      let refreshToken = response.refreshToken;

      this.setToken(accessToken);
      this.setRefreshToken(refreshToken);

      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify({
        username: JSON.parse(localStorage.getItem('currentUser')).username,
        token: response
      }));
      // return true to indicate successful login
      return true;
    });
  }

  fullLogout() {
    this.http.post('/auth/logout', null).subscribe(
      x => {
        // ignore response
      },
      error => {
        // ignore errors
      });
    this.logout();
  }

  logout(): void {
    this.setToken(null);
    this.setRefreshToken(null);
    localStorage.removeItem('currentUser');
  }
}
