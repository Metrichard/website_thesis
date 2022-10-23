import { Component, OnInit } from '@angular/core';
import { DormDataService } from 'app/service/dorms/dorm-data.service';
import { DormPageComponent } from './dorm-page/dorm-page.component';
import { Dorm } from './dorm-page/dorm-page.component';

@Component({
  selector: 'app-dorms-page',
  templateUrl: './dorms-page.component.html',
  styleUrls: ['./dorms-page.component.css']
})
export class DormsPageComponent implements OnInit {

  dorms: Dorm[] = [];

  constructor(
    private dormDataService: DormDataService
  ) { }

  ngOnInit(): void {
    this.dormDataService.retriveAllDormitories().subscribe(
      response => {
        this.dorms = response
      }
    )
  }
}
