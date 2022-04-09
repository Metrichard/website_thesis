import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodeAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) : boolean {
    if(username === 'meth' && password === 'dummy'){
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user == null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }
}
