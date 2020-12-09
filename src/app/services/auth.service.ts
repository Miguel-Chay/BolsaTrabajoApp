import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { UsersService } from './users.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {
  token: '';
  constructor(private storage: Storage, private user: UsersService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');
    console.log(token);
    let request = req;
    request = req.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse) {
    // console.log('sucedio un error');
    // console.warn(error);
    return throwError('error personalizado');
  }
}
