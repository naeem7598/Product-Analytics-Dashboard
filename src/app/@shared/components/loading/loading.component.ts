import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../../@core/services/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading$ !: Observable<boolean>;
  constructor(private loadingService : LoadingService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loadingState$;
  }
}
