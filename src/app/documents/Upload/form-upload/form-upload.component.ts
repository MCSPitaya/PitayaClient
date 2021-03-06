import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';
import { DocumentsComponent } from '../../documents.component';
import { Router } from '@angular/router';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  @Input() documentsComp : DocumentsComponent;
  @Input() case_id: number;

  constructor(private uploadService: UploadFileService, private router: Router) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.uploadFile(this.currentFileUpload, this.case_id)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        //this.documentsComp.readDocuments();
        this.router.navigate(["/documents/" + this.case_id]);
        window.location.reload();
      }
    });

    this.selectedFiles = undefined;
  }
}
