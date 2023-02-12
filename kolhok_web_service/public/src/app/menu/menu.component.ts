import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  opened = false;

  constructor(
    public authenticationService: JwtAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  editApplicationPages(){
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['application-editing']);
    }
  }
  
  toggleMenu(){
    this.opened = !this.opened;
  }
}
