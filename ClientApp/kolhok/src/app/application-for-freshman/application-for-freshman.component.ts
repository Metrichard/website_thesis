import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { JwtAuthenticationService } from '../service/authentication.service';
import { DocumentDataService } from '../service/documentData/document-data.service';

@Component({
  selector: 'app-application-for-freshman',
  templateUrl: './application-for-freshman.component.html',
  styleUrls: ['./application-for-freshman.component.css']
})
export class ApplicationForFreshmanComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(
    public authService: JwtAuthenticationService,
    private documentService: DocumentDataService
  ) { }

  ngOnInit(): void {
    this.fileInfos = this.documentService.getFiles();
  }

  selectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  submit() {
    this.progress = 0;
    if(!(this.selectedFiles === undefined)) {
      this.currentFile = this.selectedFiles.item(0) ?? new File([''], '');
      if(!(this.currentFile === new File([''], ''))) {
        this.documentService.saveFileIntoDatabase(this.currentFile).subscribe(
          event => {
            if(event.type === HttpEventType.UploadProgress && event.total != undefined) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }else if(event instanceof HttpResponse) {
              this.message = (event as HttpResponse<any>).body.message;
              this.fileInfos = this.documentService.getFiles();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'A Fájlt nem sikerült feltölteni.';
            this.currentFile = new File([''], '');
          });
        this.selectedFiles = new FileList();
      }
    }
  }

}