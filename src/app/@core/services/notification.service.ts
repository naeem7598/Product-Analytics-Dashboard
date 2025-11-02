import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastComponent} from "../../@shared/components/toast/toast.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }

  showSuccess(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: message },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }
}
