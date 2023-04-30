import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { guid } from '@fullcalendar/angular';
import { FileData } from 'app/file-manager/file-manager.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.css']
})
export class TransparencyComponent implements OnInit {

  fileData: FileData[] = []
  documentLocation = "http://ehok.elte.hu/nu/wp-content/uploads/2022/06/EHOK_ASZ_2022.06.28.pdf";

  constructor(
    public authService: JwtAuthenticationService,
    private fileDataService: FileUploaderService
  ) { }

  ngOnInit(): void {
    this.fileDataService.getFileDataWithFilterReports().subscribe(
      data => {
        this.fileData = data;
        data.forEach(x => this.files.push(x.fileName));
      }
    )
  }

  //all of the file stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;
  fileName: String = '';

  uploadFile() {
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      const uploadableFile = new File([this.selectedFile], Guid.create() + '_' + this.selectedFile.name);
      this.fileDataService.uploadFile(uploadableFile).subscribe( event => {
        if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
          if(uploadableFile.name !== '') {
            this.files.push(uploadableFile.name);
            this.fileDataService.refreshToPublicReports(this.files).subscribe(
              data => {
                window.location.reload();
              }
            )
          }
        }
        this.selectedFile = undefined;
      });
    }
  }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];

    if(this.selectedFile) {
      this.fileName = this.selectedFile.name;  
    }
    this.uploadFile();
  }

  deleteFile(name: String) {
    this.fileDataService.deleteFile(name).subscribe(
      data => {
        alert(`${name} successfully deleted.`);
      }
    );
    this.files = this.files.filter(x => x !== name);
  }

  download(name: string) {
    this.fileDataService.getFile(name).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
      }
    );
  }
}
