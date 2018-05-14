import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    const headers = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');
   
    
    const req = new HttpRequest('POST', '/api/case/2/file', formdata, {headers: headers }
      
    );

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}


//reportProgress: true,
      //responseType: 'text'