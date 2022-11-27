import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JwtAuthenticationService } from 'app/service/authentication.service';
import { ContentsDataService } from 'app/service/info/contents-data.service';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  text: String = '';

  editorDoc = this.text;
  html = 'Dynamic Data';

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  constructor(
    public authService: JwtAuthenticationService,
    private contentDataService: ContentsDataService
  ) { }

  ngOnInit(): void {
    this.contentDataService.getContents().subscribe(
      (data: Contents) => {
        this.text = data.content;
      }
    )
  }

  saveContents() {
    this.contentDataService.saveContents(new Contents('', this.text)).subscribe(
      (data: Contents) => {
        window.location.reload();
      }
    )
  }

}

export class Contents {
  constructor(
    public id: String,
    public content: String
  ){}
}