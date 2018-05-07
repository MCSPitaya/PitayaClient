import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
@Injectable()
export class CasesComponent implements OnInit {
  private url: string = '/api/case';
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private options = new RequestOptions( {headers: this.headers });
  constructor(private http: Http) { }
  
  
  ngOnInit() {
    
    console.log(this.readCases());
    
  }
  cases=[];
  
  
  
  readCases(){
    console.log("lsjl");
    return this.http.get("/api/case", this.options).map((response:Response)=>{
      console.log(response);
      return response;
    });
  }
  
}
