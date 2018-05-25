import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';
import { ModalUploadFile } from '../documents/documents.component';
import {Router} from '@angular/router';
import { CaseService } from './case.service'
import { Case } from '../models/case';
import { CaseDetails } from '../models/caseDetails';
import { ModalCreateCase } from './create-case/modal-create-case.component';
import { ModalCaseDetails } from './dialog-case/modal-case-details.component';


@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})


@Injectable()
export class CasesComponent implements OnInit {
  constructor(private caseService: CaseService,
              public dialog: MatDialog,
              public router: Router)
    { }

  courts: any[] = [];
  cases: Case[] = [];
  casesDet: CaseDetails[] = [];
  breakpoint: number;
  ngOnInit() {

    this.readCases();
    this.readCourts();
    this.breakpoint = (window.innerWidth <= 450) ? 1 : (window.innerWidth <= 800) ? 2 : (window.innerWidth <= 1000) ? 3 : 4;

  }

  readCases() {
    this.caseService.readCases()
     .subscribe(
        (data: Case[]) => {this.cases = data, this.readCaseDetail() },
       err => console.log(err)
      );
  }

  readCaseDetail(i=0){
   if(i<this.cases.length){
    this.caseService.readCaseDetail(this.cases[i].id)
      .subscribe(
        (data: CaseDetails) => {this.casesDet.push(data),this.readCaseDetail(++i)},
        err => console.log(err)
       );
    }
  }

  readCourts(){
    this.caseService.readCourts()
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
  navigateTo(newURL: string){
    this.router.navigate(["/documents/" + newURL]);
  }

}
