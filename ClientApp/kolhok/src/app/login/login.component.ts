import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/basic-authentication.service';


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
    private basicAuthService: JwtAuthenticationService) { }

  ngOnInit(): void {
  }

  handleAuthLogin() : void {
    this.basicAuthService.executeJwtAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error)
        this.invalidLogin = true;
      }
    )
  }
}
