import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface LoginResponse {
  accessToken: string;
  refreshToken:string;
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://dummyjson.com/auth/login', {
      username,
      password
    }).pipe(
      tap(res => {
        console.log(res)
        localStorage.setItem(this.tokenKey, res.accessToken);
        this._isLoggedIn$.next(true);
      }),
      // catchError(err => {
      //   return throwError(() => new Error(err?.error?.message || 'Login failed'));
      // })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
