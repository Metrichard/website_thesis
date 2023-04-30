import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/authentication.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  
  constructor(
    private router: Router,
    private authService: JwtAuthenticationService) { }

  ngOnInit(): void {
  }

  handleAuthLogin() : void {

    this.authService.executeJwtAuthenticationService(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['main-page']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    )
  }
}
