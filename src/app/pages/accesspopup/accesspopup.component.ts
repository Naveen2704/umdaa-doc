import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PagesComponent } from '../pages.component';

@Component({
  selector: 'app-accesspopup',
  templateUrl: './accesspopup.component.html',
  styleUrls: ['./accesspopup.component.scss'],
})
export class AccesspopupComponent implements OnInit {
  frompage: any

  constructor(
    private dialog: MatDialog,
    public ref: MatDialogRef<PagesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: any
  ) {
    
    this.frompage = data
   }

  ngOnInit() {}
  
   upgrade(){
     window.open('https://umdaa.co/pricing','_blank')
   }


}
