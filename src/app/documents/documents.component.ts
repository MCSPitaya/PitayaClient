import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
@Injectable()
export class DocumentsComponent implements OnInit{
  
  

  private idCase = "";
  private urlAllDocuments = '/api/case';
  private urlDocument= "";
  private options = { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};
  dataSource: any;
  selection: any;
  
    
  
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) {
    
    
    this.route.params.subscribe( params => {this.urlAllDocuments = this.urlAllDocuments + '/' + params['idCase'] + '/files' ;});
  
  };
  
   
   
    private documents: any[] = [];
    
    private documentsDetails: any[] = [];
  
    
     ngOnInit() {
       this.readDocuments();
       
    }

    readDocuments() {
      
      return this.http.get(this.urlAllDocuments, this.options)
     .subscribe(
        (data: any[]) => {this.documents = data, this.readDocumentsDetails()},
       err => console.log(err)
      );
      
      
  
    }
  
  
    readDocumentsDetails(i=0){
      
     if(i<this.documents.length){
      
      console.log(this.documents[i]['id']);
        this.urlDocument= '/api/file' + '/' + this.documents[i]['id'];
        
        this.http.get(this.urlDocument, this.options)
        .subscribe(
          (data: any[]) => {this.documentsDetails.push(data),this.readDocumentsDetails(++i)},
          err => console.log(err)
         );
     
     }
      else{
       return this.createTable();
     }
      
      
   
      
    }
  
  
  
    openDialog(): void {
    let dialogRef = this.dialog.open(ModalUploadFile, {
      width: '450px',
      data: {  }
    });

    
  }
 
  
 
  createTable(){
    this.dataSource = new MatTableDataSource(this.documentsDetails);
    this.selection = new SelectionModel(true, []);
    this.AfterViewInit();
  }
 
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'revisions', 'created', 'modified', 'createdBy', 'modifiedBy'];
  
 
  
 
  
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  
    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  /**
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  */
  
  
  

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  AfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
}



@Component({
  selector: 'app-documents-uploadFile',
  templateUrl: 'documents.modalUploadFile.html',
})
export class ModalUploadFile {

  constructor(
    public dialogRef: MatDialogRef<ModalUploadFile>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



