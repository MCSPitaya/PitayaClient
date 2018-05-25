import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { CaseService } from '../case.service';

@Component({
  selector: 'app-modal-create-case',
  templateUrl: './modal-create-case.component.html',
  styleUrls: ['./modal-create-case.component.css']
})
@Injectable()
export class ModalCreateCase {

  urlNewFile="/api/case";
  private headers;


  model: any = {};


  private courts;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateCase>,
    private router: Router,
    private caseService: CaseService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
      this.courts=data['courts'];

   }
   uploadCase(){
      this.caseService.uploadCase(this.model)
        .subscribe((data: any) => {console.log(data)} , err => console.log(err));
      this.dialogRef.close();
      this.refreshPage();

  }
  refreshPage(){
    this.router.navigate(['/cases'])
  }
}
