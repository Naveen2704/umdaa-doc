import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MainComponent } from './main.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmdailogService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<MainComponent>;
  public open(options: { title: any; message: any; cancelText: any; confirmText: any; }) {
    return this.dialogRef = this.dialog.open(MainComponent, {    
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
 });
}
public confirmed(): Observable<any> {
  return this.dialogRef.afterClosed().pipe(take(1), map(res => {
    return res;
  }
));
}
}
