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
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';

import { ListUploadComponent } from './Upload/list-upload/list-upload.component';
import { FormUploadComponent } from './Upload/form-upload/form-upload.component';
import { DetailsUploadComponent } from './Upload/details-upload/details-upload.component';
import { UploadFileService } from './Upload/upload-file.service';



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
    
    
    this.route.params.subscribe( params => {this.urlAllDocuments = this.urlAllDocuments + '/' + params['idCase'] + '/files' ; this.idCase=params['idCase']});
  
  };
  
   
   
    private documents: any[] = [];
    
    private documentsDetails: any[] = [];
  
    
     ngOnInit() {
       this.readDocuments();
       
    }
  
  
  saveFile() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'text/plain');
    
    this.http.get('/api/file/3/content', { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
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
  
  
  
   
 
  
 
  createTable(){
    this.dataSource = new MatTableDataSource(this.documentsDetails);
    this.selection = new SelectionModel(true, []);
    this.AfterViewInit();
      
     }
  
   openDialog(): void {
    let dialogRef = this.dialog.open(ModalUploadFile, {
      width: '450px',
      data: {idCase: this.idCase}
    });

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
@Injectable()
export class ModalUploadFile {
  
  fileToUpload: File = null;
  urlNewFile="/api/case/";
  private headers;
  
  private options = { headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' } )};
  
 
  
  private idCase;

  constructor(
    public dialogRef: MatDialogRef<ModalUploadFile>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
      this.idCase=data['idCase'];
      console.log(this.idCase);
      this.urlNewFile+=this.idCase+"/file";
  
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  

fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.urlNewFile}`, formData, this.options)
            .map(() => { return true; })
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}

}

