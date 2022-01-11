import { Component, OnInit,Inject,ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ExaminationService } from 'src/app/service/examination.service';
import { RegistrationPage } from '../registration/registration.page';
import {Router, ActivatedRoute, Params} from '@angular/router';
// import { forwardRef } from '@angular/core';
import { forwardRef } from '@angular/core';
import { count } from 'console';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-slottimings',
  templateUrl: './slottimings.component.html',
  styleUrls: ['./slottimings.component.scss'],
})

export class SlottimingsComponent implements OnInit {

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
  monMorToTime: any = 'Monday';
  monMorFromTime: any;
  monAftToTime: any;
  monAftFromTime: any;
  monEvngToTime: any;
  monEvngFromTime: any;
  tueMorToTime: any = 'Tuesday';
  tueMorFromTime: any;
  tueAftToTime: any;
  tueAftFromTime: any;
  tueEvngToTime: any;
  tueEvngFromTime: any;
  wedMorToTime: any = 'Wednesday';
  wedMorFromTime: any;
  wedAftToTime: any;  
  wedAftFromTime: any;
  wedEvngToTime: any;
  wedEvngFromTime: any;
  thurMorToTime: any = 'Thrusday';
  thurMorFromTime: any;
  thurAftToTime: any;
  thurAftFromTime: any;
  thurEvngToTime: any;
  thurEvngFromTime: any;
  friMorToTime: any  = 'Friday';
  friMorFromTime: any;
  friAftToTime: any;
  friAftFromTime: any;
  friEvngToTime: any;
  friEvngFromTime: any;
  satMorToTime: any = 'Saturday';
  satMorFromTime: any;
  satAftToTime: any;
  satAftFromTime: any;
  satEvngToTime: any;
  satEvngFromTime: any;
  sunMorToTime: any = 'Sunday';
  sunMorFromTime: any;
  sunAftToTime: any;
  sunAftFromTime: any;
  sunEvngToTime: any;
  sunEvngFromTime: any;
  slotTimings: string;
  session: any;
  day: any;
  clickedDay: any;
  // @Output() messageToEmit = new EventEmitter<string>();
  @Output() demo = new EventEmitter<string>();
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
  showField: boolean;
  showFieldFrom: boolean;
  showFieldTo: boolean;
  edit: any;
  morningdays: any=[];
  afternoondays: any=[];
  eveningdays: any=[];
  doctor_id: any;
  clinic_id: any;
  working: any=[];
  morningdayss: any=[];
  afternoondayss: any=[];
  eveningdayss: any=[];
  
  

  constructor(private auth:AuthService,private router: Router,@Inject(MAT_DIALOG_DATA) public result,private _dailogRef:MatDialogRef<SlottimingsComponent>,private examination:ExaminationService) {
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
    this.edit = this.result.edit;
    this.clinic_id = this.result.clinic_id;
    this.doctor_id = this.result.doctor_id;
    this.working = this.result.working;
    if(this.session == 'Tele Consultant')
    {
        this.day = 'Tele Consultant';
    }
    else if(this.edit == 'editAdd')
    {
      console.log(this.edit);
      this.day = 'Edit Add';
    }
    else if(this.edit == 'teleeditAdd')
    {
      console.log(this.edit);
      this.day = 'Tele Edit Add';
    }
    else{
      this.day = 'Walkin';
    }
    // console.log(this.working.length);
    for(var i=0;i<this.working.length;i++)
{
  for(var j=0;j<this.working[i]['sessions'].length;j++){
    if(this.working[i]['sessions'][j]['Morning'] != undefined)
    {
      var a =this.working[i]['sessions'][j]['Morning'][0].from_time;
      if(a.substr(a.length-3) != 'day')
      {
        var filterMainSection= this.morningdays.filter((x)=>x === i+1);
        // console.log(filterMainSection);
        // console.log(this.morningdays);
        if(filterMainSection == ''){
          this.morningdays.push(i+1);
        }
      }
    }
    else if(this.working[i]['sessions'][j]['Afternoon'] != undefined)
    {
      var b =this.working[i]['sessions'][j]['Afternoon'][0].from_time;
      if(b.substr(b.length-3) != 'day')
      {
        var filterAfternoonDays= this.afternoondays.filter((x)=>x === i+1);
        if(filterAfternoonDays == ''){
        this.afternoondays.push(i+1);
        }
      }
    }else if(this.working[i]['sessions'][j]['Evening'] != undefined){
      var c =this.working[i]['sessions'][j]['Evening'][0].from_time;
      if(c.substr(c.length-3) != 'day')
      {
        var filterEveningDays= this.eveningdays.filter((x)=>x === i+1);
        if(filterEveningDays == ''){
        this.eveningdays.push(i+1);
        }
      }
    }else{

    }
  }
}
    console.log(this.working);
    console.log(this.session);
    console.log(this.edit);
    console.log(this.morningdays);
    console.log(this.afternoondays);
    console.log(this.eveningdays);
    // if(this.session == 'Tele Consultant')
    // {
    //     this.day = 'Tele Consultant';
    // }
    // else if(this.edit == 'editAdd')
    // {
    //   console.log(this.edit);
    //   this.day = 'Edit Add';
    // }
    // else if(this.edit == 'teleeditAdd')
    // {
    //   console.log(this.edit);
    //   this.day = 'Tele Edit Add';
    // }
    // else{
    //   this.day = 'Walkin';
    // }
    // if(this.session == 'Edit Timings')
    // {
    //     this.day = 'Edit Timings';
    // }
    // console.log(this.clickedDay);
    console.log(this.session);

    this.examination.roleIdd.subscribe(user =>{
      console.log("Fire ="+user);
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
    console.log(this.monMorToTime);
    this.monMorFromTime = e.target.value;
    if(this.monMorToTime == undefined || this.monMorToTime == 'Monday'){
      this.showFieldTo = true;
    }
    console.log(this.slotTimings['Monday']);
    // console.log(this.slotTimings);
  }

  timeTwo(e)
  {
    console.log(e.target.value);
    this.monMorToTime = e.target.value;
    console.log(this.monMorFromTime);
    if(this.monMorFromTime == undefined){
      this.showFieldFrom = true;
    }else{
    if(e.target.value != '' && this.finalCount.length > 0)
    {
      console.log(this.finalCount);
      this.dataTest =true;
    }
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
    console.log(this.monMorFromTime);
    console.log(this.monMorToTime);
    console.log(this.slotTimings);
    this.examination.roleId(this.slotTimings);
    console.log(this.clickedDay)
    if(this.clickedDay == 'Monday')
    {
      if(this.session == 'Morning')
      {
        this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
     
    }else if(this.clickedDay == 'Tuesday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
    }
    else if(this.clickedDay == 'Wednesday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
    }
    else if(this.clickedDay== 'Thursday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Friday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Saturday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Sunday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
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
              this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
            }else{
              this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
            }
           
          }else if(this.finalCount[i].day == 'Tuesday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
            }else{
              this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
            }
          }
          else if(this.finalCount[i].day == 'Wednesday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
            }
            else if(this.session == 'Afternoon')
            {
              this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
            }else{
              this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
              this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
            }
          }
          else if(this.finalCount[i].day == 'Thursday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
          }
          else if(this.finalCount[i].day == 'Friday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
          }
          else if(this.finalCount[i].day == 'Saturday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
          }
          else if(this.finalCount[i].day== 'Sunday'){
            if(this.session == 'Morning')
            {
            this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
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
        this.examination.roleId(this.slotTimings);
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

      for(var i=0;i<this.slotTimings.length;i++)
{
  for(var j=0;j<this.slotTimings[i]['sessions'].length;j++){
    if(this.slotTimings[i]['sessions'][j]['Morning'] != undefined)
    {
      var a =this.slotTimings[i]['sessions'][j]['Morning'][0].from_time;
      if(a.substr(a.length-3) != 'day')
      {
        var filterMainSection= this.morningdayss.filter((x)=>x === i+1);
        // console.log(filterMainSection);
        // console.log(this.morningdays);
        if(filterMainSection == ''){
          this.morningdayss.push(i+1);
        }
      }
    }
    else if(this.slotTimings[i]['sessions'][j]['Afternoon'] != undefined)
    {
      var b =this.slotTimings[i]['sessions'][j]['Afternoon'][0].from_time;
      if(b.substr(b.length-3) != 'day')
      {
        var filterAfternoonDays= this.afternoondayss.filter((x)=>x === i+1);
        if(filterAfternoonDays == ''){
        this.afternoondayss.push(i+1);
        }
      }
    }else if(this.slotTimings[i]['sessions'][j]['Evening'] != undefined){
      var c =this.slotTimings[i]['sessions'][j]['Evening'][0].from_time;
      if(c.substr(c.length-3) != 'day')
      {
        var filterEveningDays= this.eveningdayss.filter((x)=>x === i+1);
        if(filterEveningDays == ''){
        this.eveningdayss.push(i+1);
        }
      }
    }else{

    }
  }
}
console.log(this.slotTimings);
console.log(this.morningdays);
console.log(this.afternoondays);
console.log(this.eveningdays);
console.log(this.morningdayss);
console.log(this.afternoondayss);
console.log(this.eveningdayss);

if(this.session == 'Morning')
{
  let intersection = this.morningdayss.filter(x => !this.morningdays.includes(x));
console.log(intersection);
  this.auth.postwalkinSlotss(this.slotTimings,intersection,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}
else if(this.session == 'Afternoon')
{
  let intersectionn = this.afternoondayss.filter(x => !this.afternoondays.includes(x));
  console.log(intersectionn);
  this.auth.postwalkinSlotsss(this.slotTimings,intersectionn,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}
else if(this.session == 'Evening')
{
  let intersectionss = this.eveningdayss.filter(x => !this.eveningdays.includes(x));
  console.log(intersectionss);
  this.auth.postwalkinSlotssss(this.slotTimings,intersectionss,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}
      
    // }
    // else{

    // }
    this._dailogRef.close('success');
    // this.check.ngOnInit();
    this.examination.roleId(this.slotTimings);
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

  submitDataa()
  {
    console.log(this.finalCount);
    // this._dailogRef.close();
    console.log(this.monMorFromTime);
    console.log(this.monMorToTime);
    console.log(this.slotTimings);
    console.log(this.session);

    // this.examination.roleId(this.slotTimings);
    console.log(this.clickedDay)
    if(this.clickedDay == 'Monday')
    {
      if(this.session == 'Morning')
      {
        this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
     
    }else if(this.clickedDay == 'Tuesday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
    }
    else if(this.clickedDay == 'Wednesday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
      }
      else if(this.session == 'Afternoon')
      {
        this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
      }else{
        this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
        this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
      }
    }
    else if(this.clickedDay== 'Thursday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Friday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Saturday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }
    else if(this.clickedDay == 'Sunday'){
      if(this.session == 'Morning')
      {
      this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
    }
    else if(this.session == 'Afternoon')
    {
      this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
    }else{
      this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
      this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
    }
    }else{
      
    }
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
            this.slotTimings[0]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[0]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[0]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[0]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[0]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[0]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
         
        }else if(this.finalCount[i].day == 'Tuesday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[1]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[1]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
        }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[1]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[1]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[1]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[1]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
        }
        else if(this.finalCount[i].day == 'Wednesday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[2]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[2]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
          }
          else if(this.session == 'Afternoon')
          {
            this.slotTimings[2]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[2]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
          }else{
            this.slotTimings[2]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
            this.slotTimings[2]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
          }
        }
        else if(this.finalCount[i].day == 'Thursday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[3]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[3]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[3]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[3]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
        }else{
          this.slotTimings[3]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[3]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
        }
        }
        else if(this.finalCount[i].day == 'Friday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[4]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[4]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[4]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[4]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
        }else{
          this.slotTimings[4]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[4]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
        }
        }
        else if(this.finalCount[i].day == 'Saturday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[5]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[5]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[5]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[5]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
        }else{
          this.slotTimings[5]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[5]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
        }
        }
        else if(this.finalCount[i].day== 'Sunday'){
          if(this.session == 'Morning')
          {
          this.slotTimings[6]['sessions'][0]['Morning'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[6]['sessions'][0]['Morning'][0]['to_time'] = this.monMorToTime;
        }
        else if(this.session == 'Afternoon')
        {
          this.slotTimings[6]['sessions'][1]['Afternoon'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[6]['sessions'][1]['Afternoon'][0]['to_time'] = this.monMorToTime;
        }else{
          this.slotTimings[6]['sessions'][2]['Evening'][0]['from_time'] = this.monMorFromTime;
          this.slotTimings[6]['sessions'][2]['Evening'][0]['to_time'] = this.monMorToTime;
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
      this.examination.roleId(this.slotTimings);
    }
    

console.log(this.slotTimings);
for(var i=0;i<this.slotTimings.length;i++)
{
  for(var j=0;j<this.slotTimings[i]['sessions'].length;j++){
    if(this.slotTimings[i]['sessions'][j]['Morning'] != undefined)
    {
      var a =this.slotTimings[i]['sessions'][j]['Morning'][0].from_time;
      if(a.substr(a.length-3) != 'day')
      {
        var filterMainSection= this.morningdayss.filter((x)=>x === i+1);
        // console.log(filterMainSection);
        // console.log(this.morningdays);
        if(filterMainSection == ''){
          this.morningdayss.push(i+1);
        }
      }
    }
    else if(this.slotTimings[i]['sessions'][j]['Afternoon'] != undefined)
    {
      var b =this.slotTimings[i]['sessions'][j]['Afternoon'][0].from_time;
      if(b.substr(b.length-3) != 'day')
      {
        var filterAfternoonDays= this.afternoondayss.filter((x)=>x === i+1);
        if(filterAfternoonDays == ''){
        this.afternoondayss.push(i+1);
        }
      }
    }else if(this.slotTimings[i]['sessions'][j]['Evening'] != undefined){
      var c =this.slotTimings[i]['sessions'][j]['Evening'][0].from_time;
      if(c.substr(c.length-3) != 'day')
      {
        var filterEveningDays= this.eveningdayss.filter((x)=>x === i+1);
        if(filterEveningDays == ''){
        this.eveningdayss.push(i+1);
        }
      }
    }else{

    }
  }
}
console.log(this.slotTimings);
console.log(this.morningdays);
console.log(this.afternoondays);
console.log(this.eveningdays);
console.log(this.morningdayss);
console.log(this.afternoondayss);
console.log(this.eveningdayss);

if(this.session == 'Morning')
{
  let intersection = this.morningdayss.filter(x => !this.morningdays.includes(x));
console.log(intersection);
  this.auth.postteleSlotss(this.slotTimings,intersection,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}
else if(this.session == 'Afternoon')
{
  let intersectionn = this.afternoondayss.filter(x => !this.afternoondays.includes(x));
  console.log(intersectionn);
  this.auth.postteleSlotsss(this.slotTimings,intersectionn,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}
else if(this.session == 'Evening')
{
  let intersectionss = this.eveningdayss.filter(x => !this.eveningdays.includes(x));
  console.log(intersectionss);
  this.auth.postteleSlotssss(this.slotTimings,intersectionss,
    this.clinic_id,this.doctor_id).subscribe((res)=>
    {
      console.log(res);
    });
}

    // }
    this._dailogRef.close('success');
    // this.check.ngOnInit();
    // this.examination.roleId(this.slotTimings);
  }
}
