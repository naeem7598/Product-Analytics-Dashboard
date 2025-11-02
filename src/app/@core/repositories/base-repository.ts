import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IListResponse} from "../models/commone/IListResponse";

@Injectable({
  providedIn: 'root'
})
export class BaseRepository<T> {
  protected apiUrl = 'https://dummyjson.com';

  constructor(protected http: HttpClient, @Inject(String) protected endpoint: string) {
    this.apiUrl += `/${this.endpoint}`;
    console.log(this.apiUrl)
  }

  getAll(): Observable<IListResponse<T>> {
    return this.http.get<IListResponse<T>>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl }/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
