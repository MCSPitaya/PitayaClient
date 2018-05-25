import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';
import { ModalCreateCase } from '../create-case/modal-create-case.component';

@Component({
  selector: 'app-cases-modalDetails',
  templateUrl: 'cases.modalDetailCase.html',
  styleUrls: []
})
@Injectable()
export class ModalCaseDetails {

  public caseDet;
  constructor(
    private router : Router ,
    public dialogRef: MatDialogRef<ModalCreateCase>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
