import {ErrorHandler, Injectable} from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private notifier: NotificationService) { }

  handleError(error: any): void {
    if (error.status === 404) {
      this.notifier.showError('not found  !!! (404)');
    } else if (error.status === 500) {
      this.notifier.showError('server error (500)');
    } else if (error.message) {
      this.notifier.showError('error: ' + error.message);
    } else {
      this.notifier.showError('unknow error');
    }
  }
}
