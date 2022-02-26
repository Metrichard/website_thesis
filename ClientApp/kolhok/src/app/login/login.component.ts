import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'username'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin() : void {
    if(this.username === 'meth' && this.password === 'dummy'){
      this.router.navigate(['welcome'])
      this.invalidLogin = true
    }else {
      this.invalidLogin = false
    }
  }

}
