import { Component, OnInit } from '@angular/core';
import { DormDataService } from 'app/service/dorms/dorm-data.service';
import { DormPageComponent } from './dorm-page/dorm-page.component';
import { Dorm } from './dorm-page/dorm-page.component';
import { JwtAuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dorms-page',
  templateUrl: './dorms-page.component.html',
  styleUrls: ['./dorms-page.component.css']
})
export class DormsPageComponent implements OnInit {

  dorms: Dorm[] = [];

  isAddingNew: boolean = false;
  newDorm: Dorm = new Dorm('-1', '', '', '', '');

  constructor(
    private dormDataService: DormDataService,
    public authService: JwtAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dormDataService.retriveAllDormitories().subscribe(
      response => {
        this.dorms = response
      }
    )
  }

  updateDorm(id: String){
    const dorm = this.dorms.find(x => x.id === id);
    if(dorm !== undefined) {
      this.dormDataService.updateDorm(id, dorm).subscribe(
        data => {
          window.location.reload();
        }
      )
    }
  }

  saveDorm() {
    if(this.isAddingNew) {
      this.dormDataService.createDorm(this.newDorm).subscribe(
        data => {
          window.location.reload();
        }
      )
    }
  }

  showAddNewDorm() {
    this.isAddingNew = !this.isAddingNew;
  }

  deleteById(id: String) {
    this.dormDataService.deleteDorm(id).subscribe(
      data => {
        window.location.reload();
      }
    )
  }
}
