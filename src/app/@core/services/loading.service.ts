import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = new BehaviorSubject<boolean>(false);
  loadingState$ = this.isLoading.asObservable();

  constructor() {
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
