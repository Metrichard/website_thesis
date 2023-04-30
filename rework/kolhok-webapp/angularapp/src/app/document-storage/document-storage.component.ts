import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileData } from 'app/file-manager/file-manager.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-document-storage',
  templateUrl: './document-storage.component.html',
  styleUrls: ['./document-storage.component.css']
})
export class DocumentStorageComponent implements OnInit {

  fileName: String = '';
  fileData: FileData[] = [];

  displayedColumns: string[] = [ 'fileName', 'fileType' ];

  constructor(
    private fileDataService: FileUploaderService,
    private router: Router,
    public authService: JwtAuthenticationService
  ) { }

  ngOnInit(): void {
      this.fileDataService.getFileDataWithFilter().subscribe(
        data => {
          this.fileData = data;
          data.forEach(x => this.files.push(x.fileName));
        }
      );
  }


  //all of the file stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;

  uploadFile() {
    
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      const uploadableFile = new File([this.selectedFile], Guid.create() + '_' + this.selectedFile.name);
      this.fileDataService.uploadFile(uploadableFile).subscribe( event => {
        if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
          if(this.fileName !== '') {
            this.files.push(uploadableFile.name);
            this.fileDataService.refreshToPublic(this.files).subscribe(
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

  navigateToCurrentPost(id: String) {
    this.router.navigate(['post', id]);
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

  download(id: string) {
    this.fileDataService.getFileById(id).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
      }
    );
  }
}
