import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtAuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private jwtAuthService: JwtAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtToken = this.jwtAuthService.getJwtToken();
    let username = this.jwtAuthService.getAuthenticatedUser();

    if(jwtToken && username) {
      request = request.clone({
        setHeaders: {
          Authorization: jwtToken,
          AccessControlAllowOrigin: '*'
        }
      });
    }else {
      request = request.clone({
        setHeaders: {
          NotLoggedIn: 'true',
          AccessControlAllowOrigin: '*'
        }
      });
    }
    request.headers.keys();
    return next.handle(request);
  }
}
