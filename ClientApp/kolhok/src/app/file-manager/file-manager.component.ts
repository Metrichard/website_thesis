import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from 'app/service/file/file-uploader.service';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  fileData: FileData[] = [];

  constructor(
    private fileDataService: FileUploaderService
  ) { }

  ngOnInit(): void {
    this.fileDataService.getAllFileData().subscribe(
      data => {
        this.fileData = data;
      }
    )
  }

  getFile(id: String) {
    this.fileDataService.getFileById(id).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
      }
    );
  }

  deleteFile(id: String) {
    this.fileDataService.deleteFileById(id).subscribe();
    window.location.reload();
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

export class FileData {
  constructor(
    public id : String,
    public fileName: String,
    public fileType: String 
  ){}
}