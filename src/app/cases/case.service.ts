import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Case } from '../models/case';
import { CaseDetails } from '../models/caseDetails';

@Injectable()
export class CaseService {

  private url = '/api/case';
  constructor(private http: HttpClient)
    { }

  courts: any[] = [];
  cases: any[] = [];
  casesDet: any[] = [];
  breakpoint: number;
  ngOnInit() {

    this.readCases();
    this.readCourts();
    this.breakpoint = (window.innerWidth <= 450) ? 1 : (window.innerWidth <= 800) ? 2 : (window.innerWidth <= 1000) ? 3 : 4;

  }

  readCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.url);
      //.map((res: Response) => res.json().response.map(case: Case) => new Case(case));
  }

  readCaseDetail(id): Observable<CaseDetails>{
    return this.http.get<CaseDetails>("/api/case/" + id);
  }
  readCourts(){
    return this.http.get('/api/court');
  }

  uploadCase(model): Observable<any>{
     return this.http.post('/api/case', JSON.stringify((model)));
 }
}
