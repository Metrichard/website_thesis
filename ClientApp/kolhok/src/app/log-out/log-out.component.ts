import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(
    private authenticationService: JwtAuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

}
