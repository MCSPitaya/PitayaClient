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
  
  
  animal: string;
  name: string;
  private idCase = "";
  private urlAllDocuments = '/api/case';
  private urlDocument= "";
  private options = { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};
  
    
  
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient) {
    
    
    this.route.params.subscribe( params => {this.urlAllDocuments = this.urlAllDocuments + '/' + params['idCase'] + '/files' ;});
  
  };
  
   
   
   documents: any[] = [];
    
   documentsDetails: any[] = [];
  
    
     ngOnInit() {
       this.readDocuments();
       this.readDocumentsDetails();
    }

    readDocuments() {
      console.log(this.urlAllDocuments);
      return this.http.get(this.urlAllDocuments, this.options)
     .subscribe(
        (data: any[]) => this.documents = data,
       err => console.log(err)
      );
  
    }
  
  
    readDocumentsDetails(){
      
      console.log(this.documents);
      
      for(var i=0;i<this.documents.length;i++){
        
        console.log(this.documents[i]['id']);
        this.urlDocument= '/api/file' + this.documents[i]['id'];
        
        return this.http.get(this.urlDocument, this.options)
        .subscribe(
          (data: any[]) => this.documents.push(data),
          err => console.log(err)
         );
      }
      
      
    }
  
  
  
    openDialog(): void {
    let dialogRef = this.dialog.open(ModalUploadFile, {
      width: '450px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
  
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['position', 'title', 'revisions', 'created', 'modified', 'createdBy', 'modifiedBy'];
  

  
  dataSource = new MatTableDataSource(this.documentsDetails);
  selection = new SelectionModel(true, []);
  
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
  ngAfterViewInit() {
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



