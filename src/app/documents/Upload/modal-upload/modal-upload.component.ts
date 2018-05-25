import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { DocumentService } from '../../documents.service';
import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-documents-uploadFile',
  templateUrl: 'documents.modalUploadFile.html',
})
@Injectable()
export class ModalUploadFile {
  private case_id: number;

  constructor(
    public dialogRef: MatDialogRef<ModalUploadFile>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: UploadFileService) {
      this.case_id = data['idCase'];
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    fileChange(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
        let file: File = fileList[0];
        this.uploadService.uploadFile(file, this.case_id)
        .map(() => { return true; })
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        )
      }
    }
  }
