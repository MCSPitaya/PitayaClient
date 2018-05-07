import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, public auth: AuthService) {}

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.auth.refreshTokens()
        .do(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // only handle api requests here, auth requests are more complicated and must therefore be handled externally

    if (request.url.startsWith('/api')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request).catch(error => {
        console.log('request failed');
        if (error.status === 401) {
          return this.refreshToken()
            .switchMap(() => {
              console.log('retrying request');
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.auth.getToken()}`
                }
              });
              return next.handle(request);
            })
            .catch(() => {
              this.logout();
              return Observable.empty();
            });
        }
        return Observable.throw(error);
      });
    } else {
      if (request.url === '/auth/refresh' || request.url === '/auth/logout') {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.getRefreshToken()}`
          }
        });
      }
      return next.handle(request);
    }
  }
}
