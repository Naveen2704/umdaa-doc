import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
},private mdDialogRef: MatDialogRef<MainComponent>) { }

  ngOnInit() {
  }
  public cancel() {
    this.close(false);
  }
public close(value) {
    this.mdDialogRef.close(value);
  }
public confirm() {
    this.close(true);
  }
@HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }
}
