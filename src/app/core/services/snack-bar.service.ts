import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor() {}
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  handleApiMessage(event: any) {
    if (event?.body?.isSuccessful) {
      let apiMessage = event?.body?.apiMessage;
      if (apiMessage && apiMessage.showMessage) {
        let message = apiMessage.message;
        this.showString(message);
      }
    } else {
      let messages = event?.body?.error?.errors.map(
        (message: string) => message
      );
      if (messages && messages.length > 0) {
        messages.forEach((message: string) => {
          this._snackBar.open(message, '+', {
            duration: environment.snackbar_duration,
            panelClass: ['snack-bar-item', 'error-snack'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
      }
    }
  }

  showString(message: string, cssClass: string[] = []) {
    this._snackBar.open(message, '+', {
      duration: environment.snackbar_duration,
      panelClass: ['snack-bar-item', ...cssClass],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showMessage(event: any, cssClass: string[] = []) {
    let messages = event?.body?.error?.errors.map((message: string) => message);
    if (messages && messages.length > 0) {
      messages.forEach((message: string) => {
        this._snackBar.open(message, '+', {
          duration: environment.snackbar_duration,
          panelClass: ['snack-bar-item', ...cssClass],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }

  showMessageString(message: string, cssClass: string[] = []) {
    this._snackBar.open(message, '+', {
      duration: environment.snackbar_duration,
      panelClass: ['snack-bar-item', ...cssClass],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showMessageError(errorMain: any, cssClass: string[] = []) {
    let errorcode = errorMain.status;
    for (let key in errorMain.errors) {
      errorMain.errors[key].forEach((element: string) => {
        let errorMsg = `Server Error Code: ${errorcode}.\nMessage: ${element}`;
        this._snackBar.open(errorMsg, '+', {
          duration: environment.snackbar_duration,
          panelClass: ['snack-bar-item', ...cssClass],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }
}
