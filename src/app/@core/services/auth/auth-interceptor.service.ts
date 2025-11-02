import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, finalize, Observable, retry, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoadingService} from "../loading.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    console.log('[HTTP Request]', authReq);

    // show spinner
    this.spinner.show();

    return next.handle(authReq).pipe(
      tap(event => console.log('[HTTP Response]', event)),
      retry(1), // retry once on network error
      catchError((error: HttpErrorResponse) => {
        console.error('[HTTP Error]', error);

        // اگر 401 بود logout و redirect
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        }

        // نمایش پیام به کاربر
        const message = error.error?.message || 'An unexpected error occurred';
        // this.snackBar.open(message, 'Close', { duration: 5000 });

        return throwError(() => new Error(message));
      }),
      finalize(() => this.spinner.hide()) // hide spinner بعد از اتمام request
    );
  }

}
