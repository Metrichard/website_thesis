import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DormDataService } from 'app/service/dorms/dorm-data.service';
import { JwtAuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { DormPageComponent } from './dorm-page/dorm-page.component';

@Component({
  selector: 'app-dorms-page',
  templateUrl: './dorms-page.component.html',
  styleUrls: ['./dorms-page.component.css']
})
export class DormsPageComponent implements OnInit {

  @ViewChild('dormsContainer', { read: ViewContainerRef}) entry!: ViewContainerRef;

  constructor(
    private dormDataService: DormDataService,
    public authService: JwtAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dormDataService.retriveAllDormitories().subscribe(
      response => {
        this.entry.clear();
        response.forEach(dorm => {
          const componentRef = this.entry.createComponent(DormPageComponent);
          componentRef.instance.dorm = dorm;
          componentRef.instance.download(dorm.fileName.toString());
        });
      }
    )
    
  }

  deleteById(id: String) {
    this.dormDataService.deleteDorm(id).subscribe(
      data => {
        window.location.reload();
      }
    )
  }

  navigateToDormEditPage(id: String) {
    this.router.navigate(['dorm', id]);
  }
}

export class Dorm {
  constructor(
    public id: String,
    public dormName: String,
    public dormAddress: String,
    public dormCapacity: String,
    public dormRoomDescription: String,
    public dormBathroomDescription: String,
    public dormCost: String,
    public dormPrincipal: String,
    public dormPrincipalEmailAddress: String,
    public dormOriginalPage: String,
    public fileName: String
  ) {}
}