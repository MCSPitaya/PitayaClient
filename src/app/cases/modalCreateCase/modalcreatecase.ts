import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Component, Injectable, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-cases-createFile',
  templateUrl: '../modalCreateCase.html',
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