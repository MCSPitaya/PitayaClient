import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() {}

  exclude = /^\/api\/case\/[0-9]+\/file/;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.exclude.test(request.url)){
      return next.handle(request);
    }
    const req = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    })

    //console.log(request);
    return next.handle(req);
  }
}
