import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public message = signal('');

  public durationInMilliSeconds = 3000;

  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  private readonly _snackbar = inject(MatSnackBar);

  private _openSnackbar(): void {
    this._snackbar.open(this.message(), 'Close', {
      duration: this.durationInMilliSeconds,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public showSnackBar(
    message: string,
    duration: number,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition
  ): void {
    this.message.set(message);
    this.durationInMilliSeconds = duration;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;

    this._openSnackbar();
  }
}
