import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DormDataService } from 'app/service/dorms/dorm-data.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { Dorm } from '../dorms-page.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dorm-page',
  templateUrl: './dorm-page.component.html',
  styleUrls: ['./dorm-page.component.css'],
})
export class DormPageComponent implements OnInit {

  fileName: String = '';
  dorm: Dorm = new Dorm('-1', '', '', '', '', '', '', '', '', '', '');
  url: any = '';

  constructor(
    private fileDataService: FileUploaderService,
    private dormDataService: DormDataService,
    private router: Router,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    public authService: JwtAuthenticationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];

    if(id !== '-1') {
      this.dormDataService.getDormById(id).subscribe(
        response => {
          this.dorm = response;
        });
    }
    this.fileName = this.dorm.fileName;
  }

  getComponentHtml() {
    return this.elRef.nativeElement;
  }

  updateDorm(id: String){
    if(this.dorm.id !== '-1') {
      this.dorm.fileName = this.dorm.fileName;
      this.dormDataService.updateDorm(id, this.dorm).subscribe(
        data => {
          this.router.navigate(['dorms']);
        }
      )
    }
    else if(this.dorm.id === '-1') {
      this.dorm.fileName = this.fileName;
      this.dormDataService.createDorm(this.dorm).subscribe(
        data => {
          this.router.navigate(['dorms']);
        }
      )
    }
  }

  deleteById(id: String) {
    this.dormDataService.deleteDorm(id).subscribe(
      data => {
        this.router.navigate(['dorms']);
      }
    )
  }

  redirectToDormPage() {
    window.location.href = this.dorm.dormOriginalPage.toString();
  }

  //image stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;

  uploadFile() {
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      this.fileDataService.uploadFile(this.selectedFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            alert('File Successfully Uploaded');
            if(this.dorm.fileName !== '') {
              this.fileName =this.dorm.fileName;
            }
          }
          this.selectedFile = undefined;
      });
    }
  }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];

    if(this.selectedFile) {
      this.dorm.fileName = this.selectedFile.name;  
    }
    this.uploadFile();
  }

  deleteFile(name: String) {
    this.fileDataService.deleteFile(name).subscribe(
      data => {
        alert(`${name} successfully deleted.`);
      }
    );
    this.dorm.fileName = '';
  }

  download(name: string) {
    if(name !== '') {
      this.fileDataService.getFile(name).subscribe(
        (data: Blob) => {
          const preUrl = window.URL.createObjectURL(data);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl('' + preUrl);
        }
      );
    }
  }

}
