import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
@Injectable()
export class CasesComponent implements OnInit {
  private url = '/api/case';
  private options = { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private http: HttpClient) { }

  cases: any[] = [];

  ngOnInit() {
    this.readCases();
  }

  readCases() {
    return this.http.get(this.url, this.options)
   .subscribe(
      (data: any[]) => this.cases = data,
     err => console.log(err)
    );

  }

}
