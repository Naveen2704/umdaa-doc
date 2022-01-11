// import { Component, OnInit } from '@angular/core';
import { Component, OnInit,Inject,ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ExaminationService } from 'src/app/service/examination.service';
import { RegistrationPage } from '../registration/registration.page';
import {Router, ActivatedRoute, Params} from '@angular/router';
// import { forwardRef } from '@angular/core';
import { forwardRef } from '@angular/core';
import { count } from 'console';
import { SelectService } from 'src/app/service/select.service';


@Component({
  selector: 'app-teleslottimings',
  templateUrl: './teleslottimings.component.html',
  styleUrls: ['./teleslottimings.component.scss'],
})
export class TeleslottimingsComponent implements OnInit {
  // export class SlottimingsComponent implements OnInit {

    // @ViewChild(RegistrationPage,{static: false}) private check: 
    // RegistrationPage;
    // @ViewChild(RegistrationPage,{static: false}) private myChild: RegistrationPage;
    // ngAfterViewInit() {
    //   this.myChild.ngOnInit();
    // }
  //   @ViewChild(forwardRef(() => RegistrationPage))
  // private myChild: RegistrationPage;
  // @ViewChild(forwardRef(() => RegistrationPage),{static: true}) private _child: RegistrationPage;
    // @ViewChild('RegistrationPage', { static: true }) data: ElementRef<HTMLDivElement>;
    
    dataTest:boolean =false;
    telemonMorToTime: any = 'Monday';
    telemonMorFromTime: any;
    telemonAftToTime: any;
    telemonAftFromTime: any;
    telemonEvngToTime: any;
    telemonEvngFromTime: any;
    teletueMorToTime: any = 'Tuesday';
    teletueMorFromTime: any;
    teletueAftToTime: any;
    teletueAftFromTime: any;
    teletueEvngToTime: any;
    teletueEvngFromTime: any;
    telewedMorToTime: any = 'Wednesday';
    telewedMorFromTime: any;
    telewedAftToTime: any;  
    telewedAftFromTime: any;
    telewedEvngToTime: any;
    telewedEvngFromTime: any;
    telethurMorToTime: any = 'Thrusday';
    telethurMorFromTime: any;
    telethurAftToTime: any;
    telethurAftFromTime: any;
    telethurEvngToTime: any;
    telethurEvngFromTime: any;
    telefriMorToTime: any  = 'Friday';
    telefriMorFromTime: any;
    telefriAftToTime: any;
    telefriAftFromTime: any;
    telefriEvngToTime: any;
    telefriEvngFromTime: any;
    telesatMorToTime: any = 'Saturday';
    telesatMorFromTime: any;
    telesatAftToTime: any;
    telesatAftFromTime: any;
    telesatEvngToTime: any;
    telesatEvngFromTime: any;
    telesunMorToTime: any = 'Sunday';
    telesunMorFromTime: any;
    telesunAftToTime: any;
    telesunAftFromTime: any;
    telesunEvngToTime: any;
    telesunEvngFromTime: any;
    slotTimings: string;
    session: any;
    day: any;
    clickedDay: any;
    // @Output() messageToEmit = new EventEmitter<string>();
    // @Output() demo = new EventEmitter<string>();
    message: any;
    monitorTitle: any;
    dayCount: any=[];
    finalCount: any=[];
    data: boolean=false;
    dataSingle: boolean=false;
    dataSingle_1: boolean=false;
    times: any;
    allCount: boolean=true;
    openCount: boolean=false;
    finalDays: any=[];
    master_checked: boolean = false;
    master_indeterminate: boolean = false;
    checkbox_list = [];
    teleslots: any;
    consult:boolean =false;
    optionsList: any;
    optionsDepart: any;
  
    
    constructor(public select:SelectService,private router: Router,@Inject(MAT_DIALOG_DATA) public result,private _dailogRef:MatDialogRef<TeleslottimingsComponent>,private examination:ExaminationService) {
      this.checkbox_list = [
        {
          name: "Monday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Tuesday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Wednesday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Thrusday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Friday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Saturday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        }, {
          name: "Sunday",
          disabled: false,
          checked: false,
          labelPosition: "after"
        },
      ]
     }
    // @ViewChild(RegistrationPage,{static: false}) private myChild: RegistrationPage;
    // @ViewChild(RegistrationPage,{static: false}) child;
  
    // ngAfterViewInit() {
    //   this.message = this.child.message
    // }
  
  
  
    ngOnInit() {
      // this.demo.emit("This is the child component");
      // console.log(this.checkbox_list);
  
      // console.log(this.finalCount);
  
      this.clickedDay = this.result.clickedDay;
      this.session = this.result.session;
  
      if(this.session == 'Tele Consultant')
      {
          this.day = 'Tele Consultant';
      }else if(this.session == 'More Clinics'){
        this.day = 'More Clinics';
      }
      // console.log(this.clickedDay);
      console.log(this.session);
  
      this.examination.count.subscribe(user =>{
        console.log(user);
        this.slotTimings=user;
        if(this.session == 'Morning')
        {
          for(var i=0;i<user.length;i++)
          {
            var a =this.slotTimings[i]['sessions'][0]['Morning'][0]['from_time'];
            if(a.substr(a.length-3) == 'day')
            {
              this.finalDays.push({day:this.slotTimings[i]['day'],disabled: false,checked: false,labelPosition: "after"});
            }
          }
        }else  if(this.session == 'Afternoon')
        {
          for(var i=0;i<user.length;i++)
          {
            // console.log(this.slotTimings[i]['day'])
            // console.log(this.slotTimings[i]['sessions'][0]['Morning'][0]['from_time'])
            // console.log(this.slotTimings[i]['sessions'][0]['Morning'][0]['to_time'])
            var a =this.slotTimings[i]['sessions'][1]['Afternoon'][0]['from_time'];
            if(a.substr(a.length-3) == 'day')
            {
              this.finalDays.push({day:this.slotTimings[i]['day'],disabled: false,checked: false,labelPosition: "after"});
              // console.log(this.finalDays);
            }
          }
        }else{
          for(var i=0;i<user.length;i++)
          {
            // console.log(this.slotTimings[i]['day'])
            // console.log(this.slotTimings[i]['sessions'][0]['Morning'][0]['from_time'])
            // console.log(this.slotTimings[i]['sessions'][0]['Morning'][0]['to_time'])
            var a =this.slotTimings[i]['sessions'][2]['Evening'][0]['from_time'];
            if(a.substr(a.length-3) == 'day')
            {
              this.finalDays.push({day:this.slotTimings[i]['day'],disabled: false,checked: false,labelPosition: "after"});
              // console.log(this.finalDays);
            }
          }
        }
   
       });
  
       let arr = this.finalDays;
       arr = arr.filter(e => e.day !==this.clickedDay); 
      //  console.log(arr)
       this.finalCount  = arr;
       console.log(this.finalCount);
       console.log(this.checkbox_list);
    }

    dropDown() {
      this.select.dropDown().subscribe((data: any) => {
        // console.log(data["result"]["clinics"]);
         this.optionsList = data["result"]["clinics"];
        // console.log(this.optionsList);
         //console.log(this.slectedvalue);
         this.optionsDepart = data["result"]["departments"];
     
      });
    }
  
    master_change() {
      console.log(this.finalCount);
      // console.log(Object.values(this.finalCount));
        for (let value of (this.finalCount)) {
          // console.log(value);
          // console.log(value.day);
          // console.log(value.checked);
          value.checked = this.master_checked;
        }
        console.log(this.finalCount);
    }
  
    list_change(){
      let checked_count = 0;
      //Get total checked items
      // for (let value of Object.values(this.finalCount)) {
        for (let value of (this.finalCount)) {
        if(value.checked)
        checked_count++;
        console.log(this.finalCount);
      }
  
      if(checked_count>0 && checked_count<this.finalCount.length){
        // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
        this.master_indeterminate = true;
        console.log(this.finalCount);
      }else if(checked_count == this.finalCount.length){
        //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
        this.master_indeterminate = false;
        this.master_checked = true;
        console.log(this.finalCount);
      }else{
        //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
        this.master_indeterminate = false;
        this.master_checked = false;
        console.log(this.finalCount);
      }
      // console.log(this.checkbox_list);
    }
  
    
  
    close() {
      this._dailogRef.close();
    }
  
    timeselection()
    {
      this._dailogRef.close();    
    }
  
    timeOne(e)
    {
      console.log(e.target.value);
      this.telemonMorFromTime = e.target.value;
      console.log(this.slotTimings['Monday']);
      // console.log(this.slotTimings);
    }
  
    timeTwo(e)
    {
      console.log(e.target.value);
      this.telemonMorToTime = e.target.value;
      if(e.target.value != '' && this.finalCount.length > 0)
      {
        console.log(this.finalCount);
        this.dataTest =true;
      }
      // console.log(this.slotTimings);
    }
  
    test(event){
  
      console.log(event.checked);
      if(event.checked == true)
      {
  
        console.log('success');
        // this.data = true;
        // this.dataSingle = true;
        this.times = this.finalCount;
        console.log(this.times);
        console.log(this.times.length);
        console.log(this.finalCount.length);
        if(this.times.length == this.finalCount.length)
        {
            this.dataSingle_1 = true;   
            this.data = true;
        }
        // console.log(this.times);
        // console.log(this.times.length);
        // console.log(this.finalCount.length);
        // if(this.times.length == )
        // {
  
        // }
      }
      else{
  
        this.data = false;
        this.dataSingle_1 =false;
        this.times =[];
        console.log(this.times);
        if(this.times.length == this.finalCount.length)
        {
          this.data = true;
          this.dataSingle_1 = true;
        }
      }
    }
  
    singleDay(event,i)
    {
      console.log(event.checked);
      console.log(i);
      if(event.checked == false)
      {
        this.data = false;
        var result = this.times.filter((x) => x.day === this.finalCount[i].day);
        console.log(result);
        console.log(this.times);
        this.times = this.times.filter(e => e.day !== result[0].day); 
        console.log(this.times)
        if(this.times.length == this.finalCount.length)
        {
          this.data = true;
          this.dataSingle_1 =true;
        }
      }
      else
      {
        this.dataSingle_1 =true;
        var result = this.times.filter((x) => x.day === this.finalCount[i].day);
        console.log(result);
        if(result == '')
        {
          this.times.push({day:this.finalCount[i].day});
          console.log(this.times);
        }
        if(this.times.length == this.finalCount.length)
        {
          this.data = true;
          this.dataSingle_1 =true;
        }
        console.log(this.times);
      }
      
    }
  
    submitData()
    {
      console.log(this.finalCount);
      // this._dailogRef.close();
      console.log(this.telemonMorFromTime);
      console.log(this.telemonMorToTime);
      console.log(this.slotTimings);
      // this.examination.roleId(this.slotTimings);
      console.log(this.clickedDay)
      if(this.clickedDay == 'Monday')
      {
        if(this.session == 'Morning')
        {
          this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
        }else{
          this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
        }
       
      }else if(this.clickedDay == 'Tuesday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
      }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
        }else{
          this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
        }
      }
      else if(this.clickedDay == 'Wednesday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
        }else{
          this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
          this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
        }
      }
      else if(this.clickedDay== 'Thursday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
      }else{
        this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
      }
      }
      else if(this.clickedDay == 'Friday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
      }else{
        this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
      }
      }
      else if(this.clickedDay == 'Saturday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
      }else{
        this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
      }
      }
      else if(this.clickedDay == 'Sunday'){
        if(this.session == 'Morning')
        {
        this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
      }else{
        this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
        this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
      }
      }else{
        
      }
      // console.log(this.times);
      // this.examination.roleId(this.slotTimings);
      // if(this.times.length > 0)
      // {
        for(var i=0;i<this.finalCount.length;i++)
        {
          console.log(this.finalCount[i])
          console.log(this.finalCount[i].checked)
          if(this.finalCount[i].checked == true)
          {
            if(this.finalCount[i].day == 'Monday')
            {
              if(this.session == 'Morning')
              {
                this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
              }
              else if(this.session == 'Afternoon')
              {
                this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
              }else{
                this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
              }
             
            }else if(this.finalCount[i].day == 'Tuesday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
            }
              else if(this.session == 'Afternoon')
              {
                this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
              }else{
                this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
              }
            }
            else if(this.finalCount[i].day == 'Wednesday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
              }
              else if(this.session == 'Afternoon')
              {
                this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
              }else{
                this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
                this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
              }
            }
            else if(this.finalCount[i].day == 'Thursday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
            }else{
              this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
            }
            }
            else if(this.finalCount[i].day == 'Friday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
            }else{
              this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
            }
            }
            else if(this.finalCount[i].day == 'Saturday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
            }else{
              this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
            }
            }
            else if(this.finalCount[i].day== 'Sunday'){
              if(this.session == 'Morning')
              {
              this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.telemonMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.telemonMorToTime;
            }else{
              this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.telemonMorFromTime;
              this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.telemonMorToTime;
            }
            }else{
              
            }
            // if(this.session == 'Morning')
            // {
            //   this.slotTimings[i]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            //   this.slotTimings[i]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
            // }
            // else if(this.session == 'Afternoon')
            // {
            //   this.slotTimings[i]['sessions'][1]['Afternoon'][0]['from_time']  = this.monMorFromTime;
            //   this.slotTimings[i]['sessions'][1]['Afternoon'][0]['to_time']  = this.monMorToTime;
            // }else{
            //   this.slotTimings[i]['sessions'][2]['Evening'][0]['from_time']  = this.monMorFromTime;
            //   this.slotTimings[i]['sessions'][2]['Evening'][0]['to_time']  = this.monMorToTime;
            // }
           
          }
          console.log(this.times);
          this.examination.countData(this.slotTimings);
          // console.log(this.finalCount[i].day)
          // if(this.times[i].day == 'Monday')
          // {
          //   this.slotTimings['Monday'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          //   this.slotTimings['Monday'][0]['Morning'][1]['to_time'] = this.monMorToTime;
          // }else if(this.times[i].day == 'Tuesday'){
          //   this.slotTimings['Tuesday'][0]['Morning'][0]['from_time'] = this.tueMorFromTime;
          //   this.slotTimings['Tuesday'][0]['Morning'][1]['to_time'] = this.tueMorFromTime;
          // }
          // else if(this.times[i].day == 'Wednesday'){
          //   this.slotTimings['Wednesday'][0]['Morning'][0]['from_time'] = this.wedMorFromTime;
          //   this.slotTimings['Wednesday'][0]['Morning'][1]['to_time'] = this.wedMorToTime;
          // }
          // else if(this.times[i].day == 'Thrusday'){
          //   this.slotTimings['Thrusday'][0]['Morning'][0]['from_time'] = this.thurMorFromTime;
          //   this.slotTimings['Thrusday'][0]['Morning'][1]['to_time'] = this.thurMorToTime;
          // }
          // else if(this.times[i].day == 'Friday'){
          //   this.slotTimings['Friday'][0]['Morning'][0]['from_time'] = this.friMorFromTime;
          //   this.slotTimings['Friday'][0]['Morning'][1]['to_time'] = this.friMorToTime;
          // }
          // else if(this.times[i].day == 'Saturday'){
          //   this.slotTimings['Saturday'][0]['Morning'][0]['from_time'] = this.satMorFromTime;
          //   this.slotTimings['Saturday'][0]['Morning'][1]['to_time'] = this.satMorToTime;
          // }
          // else if(this.times[i].day == 'Sunday'){
          //   this.slotTimings['Sunday'][0]['Morning'][0]['from_time'] = this.sunMorFromTime;
          //   this.slotTimings['Sunday'][0]['Morning'][1]['to_time'] = this.sunMorToTime;
          // }else{
  
          // }
        }
      // }
      // else{
  
      // }
      this._dailogRef.close();
      // this.check.ngOnInit();
      this.examination.countData(this.slotTimings);
    }
  
    checkTeleSlots(e)
    {
      console.log(e.checked);
      this.teleslots = e.checked;
      if(this.teleslots == undefined)
      {
        this.consult =true;
      }else
      {
          this.consult =false;
          // this._dailogRef.close(this.teleslots);
      }
      // this._dailogRef.close(e.checked);
    }
  
    closee(a)
    {
      if(a == 'no')
      {
        console.log(this.teleslots);
        this._dailogRef.close(false);
      }else{
        console.log(this.teleslots);
        if(this.teleslots == undefined)
        {
          this.consult =true;
        }else if(this.teleslots == false)
        {
          this.consult =true;
        }
        else
        {
            this.consult =false;
            this._dailogRef.close(this.teleslots);
        }
      }
    }
  
  }
  