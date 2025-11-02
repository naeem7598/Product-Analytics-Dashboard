import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export  class BaseService {
  private apiUrl ='https://dummyjson.com';

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  public post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<T>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

}
