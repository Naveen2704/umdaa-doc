import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snakbar:MatSnackBar) { }
  config:MatSnackBarConfig ={
    duration: 800,

    horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
    verticalPosition: 'bottom', // 'top' | 'bottom'
    panelClass: ['custom_snackbar'],

  }
  success(msg){
    // Swal.fire("", msg, "success");
    // Swal.fire({
    //   icon: 'success',
    //   text: msg,
    //   timer: 800
    // })
    // this.config['panelClass'] = ['notification','success']
    this.snakbar.open(msg,'',this.config)
  }
  warning(msg){
    // Swal.fire({
    //   icon: 'warning',
    //   text: msg,
    //   timer: 600
    // })
    // Swal.fire("", msg, "warning");
    // this.config['panelClass'] = ['notification','warning']
    this.snakbar.open(msg,'',this.config)
  }
  error(msg){
    // Swal.fire({
    //   icon: 'error',
    //   text: msg,
    //   timer: 600
    // })
    // this.config['panelClass'] = ['notification','error']
    this.snakbar.open(msg,'',this.config)
  }
}
