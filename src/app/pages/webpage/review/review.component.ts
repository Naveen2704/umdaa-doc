import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSlideToggleChange, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { SlotbookingService } from 'src/app/service/slotbooking.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  obj: any;
  refferal:boolean = true;

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ReviewComponent>,@Inject(MAT_DIALOG_DATA) public data,private finishservice:SlotbookingService,private notification:NotificationService,private router: Router, ) 
  {
    console.log(data);
    this.obj = data;
   }

  ngOnInit() {}

  onChange($event: MatSlideToggleChange) {
    console.log($event.checked);
    if($event.checked == true){
      this.finishservice.GoogleReview(this.obj).subscribe((data)=>{
        console.log(data)
        if(data['code']=='200'){
          this.notification.success("Google review request will be sent")
          this.router.navigateByUrl('/appointment').then(() => {
            window.location.reload()
          });
        }
      })
    }
}
Change($event: MatSlideToggleChange){
  console.log($event.checked);
    if($event.checked == true){
      window.open('http://web.whatsapp.com/send?phone=+91'+this.obj.doctor_number+'&text=Dear'+this.obj.doctor_name+ 'Thank you for Referring this Patient(' +this.obj.patient_name+') \n' +this.obj.doctor_name+'','_blank','width=400px',)
      
    }
    this.router.navigateByUrl('/appointment').then(() => {
      window.location.reload()
    });
}

finish()
{
  this.router.navigateByUrl('/appointment').then(() => {
    window.location.reload()
  });
  this.finishservice.Finishappountment(localStorage.getItem('info')).subscribe((res)=>{
    console.log(res)
    if(res['code'] == '200'){  
      this.router.navigateByUrl('/appointment').then(() => {
        window.location.reload()
      });
    }
  })
}
close()
{
  this.router.navigateByUrl('/appointment').then(() => {
    window.location.reload()
  });
}
}
