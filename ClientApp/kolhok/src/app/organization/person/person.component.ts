import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { PersonDataService } from 'app/service/organization/person-data.service';
import { Person } from '../organization.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  fileName: String = '';
  person: Person = new Person('', '', '', '', '');
  splitEmails: String[] = [];

  constructor(
    private fileDataService: FileUploaderService,
    private sanitizer: DomSanitizer,
    public authService: JwtAuthenticationService,
    private personDataService: PersonDataService
  ) { }

  ngOnInit(): void {
  }

  saveOrUpdate() {
    if(this.person.id === '') {
      this.personDataService.createNewPerson(this.person).subscribe(
        response => {
          window.location.reload();
        }
      );
    }else {
      this.personDataService.updatePerson(this.person).subscribe(
        response => {
          window.location.reload();
        }
      );
    }
  }

  deletePerson(id: String) {
    this.personDataService.deletePerson(id).subscribe(
      response => {
        window.location.reload();
      }
    );
  }

  //image stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;
  
  url: any = '';

  uploadFile() {
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      this.fileDataService.uploadFile(this.selectedFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            alert('File Successfully Uploaded');
            if(this.person.fileName !== '') {
              this.fileName = this.person.fileName;
            }
          }
          this.selectedFile = undefined;
      });
    }
  }

  onFileSelected(event : any) {
    event.preventDefault();
    this.selectedFile = event.target.files[0];

    if(this.selectedFile) {
      this.person.fileName = this.selectedFile.name;  
    }
    this.uploadFile();
  }

  deleteFile(name: String) {
    this.fileDataService.deleteFile(name).subscribe(
      data => {
        alert(`${name} successfully deleted.`);
      }
    );
    this.person.fileName = '';
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
