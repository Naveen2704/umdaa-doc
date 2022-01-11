import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppointmentService } from 'src/app/service/appointment.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  StateForm: FormGroup;
  timevalue: any=[];
  teleAvalibility: boolean;
  ExpertAvalibility: boolean;
  ExpertForm: FormGroup;
  timeE: any;
  Teleavl: any;
  Exprtavl: any;
  giventime: any=[];
  giventimeE: any=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<StatusComponent>,private appointmentService:AppointmentService,) 
  { 
    console.log(data)
    this.Teleavl = data.tele
    this.Exprtavl = data.expert
    if(data.tele ==true){
      this.teleAvalibility = true
    }
    else{
      this.teleAvalibility = false
    }
    if(data.expert ==true){
      this.ExpertAvalibility = true;
    }
    else{
      this.ExpertAvalibility = false;
    }
  }

  ngOnInit()
   {
    this.StateForm = new FormGroup({
      time: new FormControl('',Validators.required)
    })
    this.ExpertForm = new FormGroup({
      time: new FormControl('',Validators.required)
    })
   }
  foods: Food[] = [
    {value: '1', viewValue: '1 Hr'},
    {value: '2', viewValue: '2 Hr'},
    {value: '4', viewValue: '4 Hr'},
    {value: '6', viewValue: '6 Hr'},
    {value: '8', viewValue: '8 Hr'},
    
  ];
  close(){
    this.dialogRef.close({event:'expert',value:this.giventimeE})
  }
  closetele(){
    this.dialogRef.close({event:'tele',value:this.giventime})
  }
  addTime(value){
    console.log(value);
    if(!this.StateForm.valid){
      return false
    }else{
      this.timevalue  = value.time
      if(this.Teleavl == true){
        var aval = '1'
      }else{
        var aval = '0'
      }
      this.appointmentService.avalibletele(aval,this.timevalue).subscribe((data)=>{
        console.log(data)
        if(data['code'] ==200){
          let presentDate = new Date()
          this.giventime = data.result.docAvail.time
          localStorage.setItem('online',data.result.docAvail.online)
          localStorage.setItem('onlineCreated', JSON.stringify(presentDate))
          localStorage.setItem('onlineTime',data.result.docAvail.time)
          this.closetele();
        }
      })
    }
   
  }
  addTimeE(v){
    console.log(v)
    this.timeE = v.time
    if(!this.ExpertForm .valid){
      return false
    }else{
    if(this.Exprtavl == true){
      var aval = '1'
    }else{
      var aval = '0'
    }
    this.appointmentService.avalibleExpert(aval,this.timeE).subscribe((data)=>{
      console.log(data)
      if(data['code'] ==200){
        this.giventimeE = data.result.docAvail.time;
        localStorage.setItem('onlineE',data.result.docAvail.online)
        console.log(this.giventimeE)
        this.close();
      }
    })
  }
  }
}
