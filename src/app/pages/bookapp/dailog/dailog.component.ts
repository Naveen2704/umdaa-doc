import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlotbookingService } from 'src/app/service/slotbooking.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss'],
})
export class DailogComponent implements OnInit {
  formGroup: FormGroup;
  patientList: any=[];
  hide: boolean;
  number: any;

  constructor(push:SwPush,private _dailogRef:MatDialogRef<DailogComponent>,private formBuilder:FormBuilder,private slotbooking: SlotbookingService)
   {
 
    }

  ngOnInit() 
  {
    this.formGroup = this.formBuilder.group({
      mobile:[null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10),Validators.pattern('[6-9]\\d{9}')])]
    })
  }

  close() {
    this._dailogRef.close({event:'close'});
  }

  doAction(id){
    this._dailogRef.close({event:'book',p_id:id});
  }
  addNew(){
    this._dailogRef.close({event:'add',number:this.number});
  }
  onSubmit(data){
    console.log(data);
    this.number = data.mobile
    if(!this.formGroup.valid){
      return false;
    }else{
      this.slotbooking.checkExists(data).subscribe((res)=>{
        console.log(res)
        if(res['code']=='200')
        {
          this.patientList = res.result.patients;
          if(this.patientList.length == 0){
            this.addNew()
            
          }
          else{
            // this.addNew()
          }
          
        }
      })
    }

  }
}
