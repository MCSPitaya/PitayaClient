import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class DocumentService {

  private urlAllDocuments = '/api/case/';
  private urlDocument= '/api/file';
  constructor(private http: HttpClient){ }

    readDocuments(case_id): Observable<Document[]> {
      return this.http.get<Document[]>(this.urlAllDocuments + case_id + '/files');
    }

    readDocumentsDetails(id): Observable<Document>{
      return this.http.get<Document>(this.urlDocument + '/' + id);
    }

    saveFile() {
      const headers = { 'Accept': '*/*'}

      this.http.get('/api/file/1/content', { headers: headers })
        .toPromise()
        .then(response => this.saveToFileSystem(response));
    }

    private saveToFileSystem(response) {
      const contentDispositionHeader: string = response.headers.get('Content-Disposition');
      const parts: string[] = contentDispositionHeader.split(';');
      const filename = parts[1].split('=')[1];
      console.log(filename);
      const blob = new Blob([response._body], { type: 'jpg' });
      saveAs(blob, filename);
    }
}
