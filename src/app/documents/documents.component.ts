import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
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
import { DocumentService } from './documents.service';
import { ModalUploadFile } from './Upload/modal-upload/modal-upload.component';



@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
@Injectable()
export class DocumentsComponent implements OnInit{

  private idCase = "";
  private urlAllDocuments = '/api/case';

  dataSource: any;
  selection: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private documentService: DocumentService)
  {
    this.route.params.subscribe( params => {this.urlAllDocuments = this.urlAllDocuments + '/' + params['idCase'] + '/files' ; this.idCase=params['idCase']});
  };


    private documents: Document[] = [];
    private documentsDetails: any[] = [];

     ngOnInit() {
       this.readDocuments();
    }


  saveFile() {
    this.documentService.saveFile();
  }

  readDocuments() {
    this.documentService.readDocuments(this.idCase)
     .subscribe(
        (data: any[]) => { this.documents = data, this.createTable() },
       err => console.log(err)
      );
  }


  readDocumentsDetails(i=0){
   if(i<this.documents.length){
    console.log(this.documents[i]['id']);
      this.documentService.readDocumentsDetails(i)
      .subscribe(
        (data: any) => {this.documentsDetails.push(data),this.readDocumentsDetails(++i)},
        err => console.log(err)
       );
   }
    else{
     return this.createTable();
   }
  }

  createTable(){
    this.dataSource = new MatTableDataSource(this.documents);
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

  displayedColumns = ['name', 'revisions', 'creDat', 'modDat'];

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
  **/

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  AfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
