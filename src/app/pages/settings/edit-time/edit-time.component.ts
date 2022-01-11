import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-time',
  templateUrl: './edit-time.component.html',
  styleUrls: ['./edit-time.component.scss'],
})
export class EditTimeComponent implements OnInit {
  clickedDay: any;
  session: any;
  id: any;
  fromTime: any;
  toTime: any;
  day: any;
  dayCount=[{'id': '1', 'day': 'Monday' },{'id':'2', 'day': 'Tuesday'},{'id': '3', 'day': 'Wednesday'},{'id':'4', 'day': 'Thrusday'},{'id': '5', 'day': 'Friday'},{'id': '6', 'day': 'Saturday' },{'id': '7', 'day': 'Sunday' }];
  finalDays: any = [];
  dataTest: boolean;
  master_checked: boolean = false;
  checkbox_list: { name: string; disabled: boolean; checked: boolean; labelPosition: string; }[];
  master_indeterminate: boolean;
  toModifiedTime: any;
  fromModifiedTime: any;
  from_time: any;
  to_time: any;
  imp: string;
  working: any;
  slot_type: any;

  constructor(private auth:AuthService,private _dailogRef:MatDialogRef<EditTimeComponent>,@Inject(MAT_DIALOG_DATA) public result) { 
   
  }

  ngOnInit() {
    this.clickedDay = this.result.day;
    this.session = this.result.session;
    this.id = this.result.id;
    this.fromTime = this.result.from;
    this.toTime = this.result.to;
    this.day = this.result.days;
    // this.slot_type =this.result.slot_type;
    // console.log(this.slot_type);
    // this.working = this.result.days;
    // console.log(this.working);
    if(this.session == 'Delete Timings')
    {
      this.imp = 'delete';
    }
    else{
      this.imp = 'edit';
    }
    // console.log(this.session);
    // console.log(this.clickedDay);
    // console.log(this.id);
    // console.log(this.fromTime);
    // console.log(this.toTime);
    // console.log(this.day);
    this.finalDays = this.dayCount.filter((x)=>x.id !== this.day);
    console.log(this.finalDays);

  
  }

  close() {
    this._dailogRef.close();
  }

  timeOne(e)
  {
    console.log(e.target.value);
      this.fromModifiedTime = e.target.value; 
  }

  timeTwo(e)
  {
    console.log(e.target.value);
    this.toModifiedTime = e.target.value;
    // this.dataTest = true;
  }

  submitData()
  {
    console.log(this.fromModifiedTime);
    console.log(this.toModifiedTime);
    console.log(this.day);
    if(this.fromModifiedTime == undefined)
    {
      this.from_time = this.fromTime;
      console.log(this.from_time);
    }else{
      this.from_time = this.fromModifiedTime;
    }
    if(this.toModifiedTime == undefined)
    {
      this.to_time = this.toTime;
      console.log(this.to_time);
    }else{
      this.to_time = this.toModifiedTime;
    }
    this.auth.postModifiedTime(this.id,this.from_time,this.to_time).subscribe((data) => {
      console.log(data);
      this._dailogRef.close('success');
      // this.walkinConsultationfee=data['result'].walkinConsultationFees;
      // this.walkinConsultationTime=data['result'].walkinConsultationTime;
      // this.teleConsultationFees=data['result'].teleConsultationFees;
      // this.teleConsultationTime=data['result'].teleConsultationTime;
      // console.log(this.walkinConsultationfee);
        // this.ProceduresList = data.result.procedure_list
      })
  }

  submit(a)
  {
    if(a=='No')
    {
      this._dailogRef.close();
    }else if(a== 'Yes'){
      console.log(this.id);
      this.auth.deleteData(this.id ).subscribe((data) => {
        console.log(data);
        if(data['code'] =='200'){
          this.close()
        }
    
        })
    }else{

    }
  }



}
