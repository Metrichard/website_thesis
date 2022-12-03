import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PresidencyComponent } from 'app/presidency/presidency.component';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { FileUploaderService } from 'app/service/file/file-uploader.service';
import { PersonDataService } from 'app/service/organization/person-data.service';
import { PresidencyDataService } from 'app/service/organization/presidency-data.service';
import { Person } from '../organization.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  fileName: String = '';
  person: Person = new Person('', '', '', '', '');
  splitEmails: String[] = [];
  isPresidency: boolean = false;

  constructor(
    private fileDataService: FileUploaderService,
    private sanitizer: DomSanitizer,
    public authService: JwtAuthenticationService,
    private personDataService: PersonDataService,
    private presidencyDataService: PresidencyDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isPresidency = this.router.url.endsWith('presidency');
  }

  saveOrUpdate() {
    

    if(this.isPresidency){
      if(this.person.id === '') {
        this.presidencyDataService.createPerson(this.person).subscribe(
          response => {
            window.location.reload();
          }
        );
      }else {
        this.presidencyDataService.updatePerson(this.person).subscribe(
          response => {
            window.location.reload();
          }
        );
      }
    }else{
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
  }

  deletePerson(id: String) {
    if(this.isPresidency) {
      this.presidencyDataService.deletePerson(id).subscribe(
        response => {
          window.location.reload();
        }
      );
    }else {
      this.personDataService.deletePerson(id).subscribe(
        response => {
          window.location.reload();
        }
      );
    }
  }

  //image stuff
  progress: { percentage: number } = { percentage: 0 };
  files: String[] = [];
  selectedFile?: File;
  changeImage = false;
  
  url: any = '';

  uploadFile(uploadableFile: File) {
    if(this.selectedFile !== undefined) {
      this.progress.percentage = 0;
      
      this.fileDataService.uploadFile(uploadableFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            alert('File Successfully Uploaded');
            if(this.person.fileName !== '') {
              this.fileName = uploadableFile.name;
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
      const uploadableFile = new File([this.selectedFile], Guid.create() + '_' + this.selectedFile.name);
      this.person.fileName = uploadableFile.name;
      this.uploadFile(uploadableFile);
    }
    
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
