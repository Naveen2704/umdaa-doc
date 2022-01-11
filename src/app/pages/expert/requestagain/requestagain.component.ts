import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertController } from '@ionic/angular';
import { NotificationService } from 'src/app/service/notification.service';
import { ExpertService } from '../../webpage/expert/expert.service';

@Component({
  selector: 'app-requestagain',
  templateUrl: './requestagain.component.html',
  styleUrls: ['./requestagain.component.scss'],
})
export class RequestagainComponent implements OnInit {
  MoneyForm: FormGroup;
  obj: any;

  constructor(private service:ExpertService,public dialogRef: MatDialogRef<RequestagainComponent>,@Inject(MAT_DIALOG_DATA) public data,private notification:NotificationService,private alrtctl:AlertController)
  { 
    this.obj = data
    console.log( data)
  }

  ngOnInit() {
    this.MoneyForm = new FormGroup({
      comment: new FormControl('')
    })
  }
  close(){
    this.dialogRef.close()
  }
  request(data){
     this.service.requestAgain(data,this.obj).subscribe((res)=>{
      console.log(res)
      if(res['code'] =='200'){    
        this.notification.success('Request Sent Successfully');
        this.close()
      }
      else{
        this.presentAlert(res.result.result)
        // alert()
      }
    })
  }

  async presentAlert(msg) {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: msg,
      buttons: [
         {
          text: 'Cancel',
          handler: () => {
        
          }
        },
        // {
        //   text: 'Request',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: (blah) => {
         
        //   }
        // }
      ],
      
    });
    (await alert).present();
  }

}
