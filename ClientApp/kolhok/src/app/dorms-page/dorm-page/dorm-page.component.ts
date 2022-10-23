import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dorm-page',
  templateUrl: './dorm-page.component.html',
  styleUrls: ['./dorm-page.component.css']
})
export class DormPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

export class Dorm {

  constructor(
    public dormName: String,
    public dormAddress: String,
    public dormPrincipal: String,
    public dormPrincipalEmailAddress: String
  ){}
}