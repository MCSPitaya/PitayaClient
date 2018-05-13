import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})

  

@Injectable()
export class CasesComponent implements OnInit {
  private url = '/api/case';
  private options = { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private http: HttpClient,public dialog: MatDialog) { }

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
  openDialog(): void {
    let dialogRef = this.dialog.open(ModalCreateCase, {
      width: '450px',
      data: {idCase: "Hi"}
    });

    }

}



@Component({
  selector: 'app-cases-createFile',
  templateUrl: 'modalCreateCase.html',
})
@Injectable()
export class ModalCreateCase {
  
  fileToUpload: File = null;
  urlNewFile="/api/case/";
  private headers;
  
  private options = { headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' } )};
  
 
  
  private idCase;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateCase>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
      this.idCase=data['idCase'];
      console.log(this.idCase);
      this.urlNewFile+=this.idCase+"/file";
  
   }

  onNoClick(): void {
    this.dialogRef.close();
    }
  }
