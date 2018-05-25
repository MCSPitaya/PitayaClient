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

    saveFile(file_id: number) {
      const headers = { 'Accept': '*/*'}
      this.http.get('/api/file/' + file_id + '/content', { headers: headers, observe: 'response', responseType: 'blob' })
        .subscribe(resp => {
          this.saveToFileSystem(resp);
        });
    }

    private saveToFileSystem(response) {
      console.log(response);
      const contentDispositionHeader: string = response.headers.get('Content-Disposition');
      const parts: string[] = contentDispositionHeader.split(';');
      const filename = parts[1].split('=')[1];
      console.log(filename);
      saveAs(response.body, filename);
    }
}
