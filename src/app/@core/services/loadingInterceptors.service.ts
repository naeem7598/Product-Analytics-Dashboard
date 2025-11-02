import { Injectable } from '@angular/core';
import {LoadingService} from "./loading.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {delay, finalize, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorsService implements HttpInterceptor {

  constructor(private loaderService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(
      // صرفا جهت دیدن لودینگ
      delay(200),
      finalize(() => this.loaderService.hide())
    );
  }
}
