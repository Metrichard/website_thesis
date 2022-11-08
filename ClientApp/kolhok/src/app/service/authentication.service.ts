import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  executeJwtAuthenticationService(username: string, password: string) {
    
    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username)
          sessionStorage.setItem(TOKEN, `Bearer ${data.jwtToken}`)
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER) ?? '';
  }

  getJwtToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
    return null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user == null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class JwtToken {
  constructor(public token: String) {}
}