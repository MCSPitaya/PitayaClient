import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';
import { ModalUploadFile } from '../documents/documents.component';
import {Router} from '@angular/router';


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
  
  courts: any[] = [];
  cases: any[] = [];
  casesDet: any[] = [];

  ngOnInit() {
    
    this.readCases();
    this.readCourts();
    
  }

  readCases() {
    return this.http.get(this.url, this.options)
   .subscribe(
      (data: any[]) => {this.cases = data, this.readCaseDetail() },
     err => console.log(err)
    );
    
  }

  readCaseDetail(i=0){
     if(i<this.cases.length){
      
      //console.log(this.cases[i]['id']);
        
        
        this.http.get("/api/case/" + this.cases[i].id, this.options)
        .subscribe(
          (data: any[]) => {this.casesDet.push(data),this.readCaseDetail(++i)},
          err => console.log(err)
         );
     
     }

  }
  readCourts(){
    return this.http.get('/api/court', this.options)
    .subscribe(
       (data: any[]) => this.courts = data,
      err => console.log(err)
     );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalCreateCase, {
      width: '450px',
      data: {courts: this.courts}
    });

    }

    openDialogFileUpload(id: number): void {
      let dialogRef = this.dialog.open(ModalUploadFile, {
        width: '450px',
        
        data: {idCase: id}
      });
  
      }
      openDialogCaseDetails(id : number): void {
        let dialogRef = this.dialog.open(ModalCaseDetails, {
          width: '450px',
          data: {caseDet: this.casesDet.find((a) => a.id === id)}
        });
    
        }
}



@Component({
  selector: 'app-cases-createFile',
  templateUrl: 'cases.modalCreateCase.html',
})
@Injectable()
export class ModalCreateCase {
  
  urlNewFile="/api/case";
  private headers;
  
  private options = { headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' } )};
  
  model: any = {};
 
  
  private courts;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateCase>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
    
  ) {
      this.courts=data['courts'];
    
   }
   uploadCase(){
      this.http.post('/api/case', JSON.stringify((this.model))).subscribe((data: any) => {console.log(data)} , err => console.log(err));
      this.dialogRef.close();
      this.refreshPage();
      
  }
  refreshPage(){
    this.router.navigate(['/cases'])
  }
  onNoClick(): void {
    
    }
  }



  @Component({
    selector: 'app-cases-createFile',
    templateUrl: 'cases.modalDetailCase.html',
  })
  @Injectable()
  export class ModalCaseDetails {
    
    
    urlNewFile="/api/case";
    private headers;
    
    private options = { headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' } )};
    
   
   
    
    public caseDet;
    constructor(
      private router : Router , 
      public dialogRef: MatDialogRef<ModalCreateCase>,
      @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
      
    ) {
        this.caseDet=data['caseDet'];
      
     }
    
    navigateToDocumentsPage(){
      this.router.navigate(['/documents'+ '/' + this.caseDet.id]);
      this.dialogRef.close();
    }
    onNoClick(): void {
      
      }
    }
  