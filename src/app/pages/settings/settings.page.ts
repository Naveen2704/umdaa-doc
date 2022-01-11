import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SlottimingsComponent } from 'src/app/auth/slottimings/slottimings.component';
import { EditTimeComponent } from './edit-time/edit-time.component';
import { AlertController, NavController } from '@ionic/angular';
import { ExaminationService } from 'src/app/service/examination.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SelectService } from 'src/app/service/select.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import Swal from 'sweetalert2'
import * as introJs from 'intro.js/intro.js';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {
  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 150,
    'canvasHeight': 100,
    'backgroundColor':"rgb(255,255,255)"
  };

  languages = [
    "English", "Hindi", "Telugu", "Kannada", "Malayalam", "Tamil", "Urdu", "Sindhi", "Punjabi", "Gujarati", "Marathi", "Bengali","Odia","Manipuri","Konkani","Assamese","Dogri","Kashmiri","Maithily","Santali","Nepali","Bodo"

 ];
//  idx:any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  monMorToTime: any = 'Monday';
  monMorFromTime: any = 'Monday';
  monAftToTime: any= 'Monday';
  monAftFromTime: any= 'Monday';
  monEvngToTime: any= 'Monday';
  monEvngFromTime: any= 'Monday';
  tueMorToTime: any  = 'Tuesday';
  tueMorFromTime: any  = 'Tuesday';
  tueAftToTime: any= 'Tuesday';
  tueAftFromTime: any= 'Tuesday';
  tueEvngToTime: any= 'Tuesday';
  tueEvngFromTime: any= 'Tuesday';
  wedMorToTime: any = 'Wednesday';
  wedMorFromTime: any = 'Wednesday';
  wedAftToTime: any= 'Wednesday';
  wedAftFromTime: any= 'Wednesday';
  wedEvngToTime: any= 'Wednesday';
  wedEvngFromTime: any= 'Wednesday';
  thurMorToTime: any = 'Thrusday';
  thurMorFromTime: any = 'Thrusday';
  thurAftToTime: any= 'Thrusday';
  thurAftFromTime: any= 'Thrusday';
  thurEvngToTime: any= 'Thrusday';
  thurEvngFromTime: any= 'Thrusday';
  friMorToTime: any = 'Friday';
  friMorFromTime: any = 'Friday';
  friAftToTime: any= 'Friday';
  friAftFromTime: any= 'Friday';
  friEvngToTime: any= 'Friday';
  friEvngFromTime: any= 'Friday';
  satMorToTime: any  = 'Saturday';
  satMorFromTime: any  = 'Saturday';
  satAftToTime: any = 'Saturday';
  satAftFromTime: any = 'Saturday';
  satEvngToTime: any = 'Saturday'
  satEvngFromTime: any = 'Saturday';
  sunMorToTime: any = 'Sunday';
  sunMorFromTime: any = 'Sunday';
  sunAftToTime: any= 'Sunday';
  sunAftFromTime: any= 'Sunday';
  sunEvngToTime: any= 'Sunday';
  sunEvngFromTime: any= 'Sunday';

  // daysMainData=[ {"day":"Monday", "count":"0", "sessions":[{"Morning" :[ {"from_time": this.monMorFromTime, "to_time": this.monMorToTime}]},{"Afternoon":  
  // [{"from_time": this.monAftFromTime,"to_time": this.monAftToTime}]},{"Evening":  [ {"from_time": this.monEvngFromTime, "to_time": this.monEvngToTime}]}]},
  // {"day":"Tuesday", "count":"1", "sessions":[{"Morning":  [ {"from_time": this.tueMorFromTime, "to_time": this.tueMorToTime,}]},{"Afternoon":  
  // [{"from_time":  this.tueAftFromTime,"to_time":  this.tueAftToTime}]},{"Evening":  [ {"from_time":this.tueEvngFromTime, "to_time": this.tueEvngToTime}]}]},
  // {"day":"Wednesday", "count":"2",  "sessions":[{"Morning":  [ {"from_time":  this.wedMorFromTime, "to_time":  this.wedMorToTime}]},{"Afternoon":  
  // [{"from_time":this.wedAftFromTime,"to_time": this.wedAftToTime}]},{"Evening":  [ {"from_time": this.wedEvngFromTime, "to_time": this.wedEvngToTime}]}]},
  // {"day":"Thursday",  "count":"3", "sessions":[{"Morning":  [ {"from_time": this.thurMorFromTime, "to_time": this.thurMorToTime}]},{"Afternoon":  
  // [{"from_time": this.thurAftFromTime,"to_time": this.thurAftToTime}]},{"Evening":  [ {"from_time": this.thurEvngFromTime, "to_time": this.thurEvngFromTime}]}]},
  // {"day":"Friday",  "count":"4", "sessions":[{"Morning":  [ {"from_time": this.friMorFromTime, "to_time": this.friMorToTime}]},{"Afternoon":  
  // [{"from_time": this.friAftFromTime,"to_time": this.friAftToTime}]},{"Evening":  [ {"from_time": this.friEvngFromTime, "to_time": this.friEvngToTime}]}]},
  // {"day":"Saturday", "count":"5",  "sessions":[{"Morning":  [ {"from_time":  this.satMorFromTime, "to_time":  this.satMorToTime}]},{"Afternoon":  
  // [{"from_time":this.satAftFromTime,"to_time": this.satAftToTime}]},{"Evening":  [ {"from_time": this.satEvngFromTime, "to_time": this.satEvngToTime}]}]},
  // {"day":"Sunday", "count":"6",  "sessions":[{"Morning":  [ {"from_time": this.sunMorFromTime, "to_time": this.sunMorToTime}]},{"Afternoon":  
  // [{"from_time": this.sunAftFromTime,"to_time": this.sunAftToTime}]},{"Evening":  [ {"from_time": this.sunEvngFromTime, "to_time": this.sunEvngToTime}]}]}]
  info: string;
  walkinConsultationfee: any;
  walkinConsultationTime: any;
  teleConsultationFees: any;
  teleConsultationTime: any;
  doctor_id: any;
  clinic_id: any;
  walkinTimings: any=[];
  daysMainData: any=[];
  clinic_doctor_weekday_slot_id: any;
  morId: any;
  monMorId: any;
  monEvngId: any;
  monAftId: any;
  tueAftId: any;
  tueMorId: any;
  tueEvngId: any;
  wedEvngId: any;
  wedMorId: any;
  wedAftId: any;
  thurEvngId: any;
  thurMorId: any;
  thurAftId: any;
  friEvngId: any;
  friMorId: any;
  friAftId: any;
  satAftId: any;
  satMorId: any;
  satEvngId: any;
  sunEvngId: any;
  sunMornId: any;
  sunAftId: any;
  daysMainDataa: any=[];
  teleTimings: any=[];

  telemonMorToTime: any = 'Monday';
  telemonMorFromTime: any = 'Monday';
  telemonAftToTime: any= 'Monday';
  telemonAftFromTime: any= 'Monday';
  telemonEvngToTime: any= 'Monday';
  telemonEvngFromTime: any= 'Monday';
  teletueMorToTime: any  = 'Tuesday';
  teletueMorFromTime: any  = 'Tuesday';
  teletueAftToTime: any= 'Tuesday';
  teletueAftFromTime: any= 'Tuesday';
  teletueEvngToTime: any= 'Tuesday';
  teletueEvngFromTime: any= 'Tuesday';
  telewedMorToTime: any = 'Wednesday';
  telewedMorFromTime: any = 'Wednesday';
  telewedAftToTime: any= 'Wednesday';
  telewedAftFromTime: any= 'Wednesday';
  telewedEvngToTime: any= 'Wednesday';
  telewedEvngFromTime: any= 'Wednesday';
  telethurMorToTime: any = 'Thrusday';
  telethurMorFromTime: any = 'Thrusday';
  telethurAftToTime: any= 'Thrusday';
  telethurAftFromTime: any= 'Thrusday';
  telethurEvngToTime: any= 'Thrusday';
  telethurEvngFromTime: any= 'Thrusday';
  telefriMorToTime: any = 'Friday';
  telefriMorFromTime: any = 'Friday';
  telefriAftToTime: any= 'Friday';
  telefriAftFromTime: any= 'Friday';
  telefriEvngToTime: any= 'Friday';
  telefriEvngFromTime: any= 'Friday';
  telesatMorToTime: any  = 'Saturday';
  telesatMorFromTime: any  = 'Saturday';
  telesatAftToTime: any = 'Saturday';
  telesatAftFromTime: any = 'Saturday';
  telesatEvngToTime: any = 'Saturday'
  telesatEvngFromTime: any = 'Saturday';
  telesunMorToTime: any = 'Sunday';
  telesunMorFromTime: any = 'Sunday';
  telesunAftToTime: any= 'Sunday';
  telesunAftFromTime: any= 'Sunday';
  telesunEvngToTime: any= 'Sunday';
  telesunEvngFromTime: any= 'Sunday';
  registartion_fees: any;
  registration_fees: any;
  walkinFee: any;
  feesConsultation: any;
  feesConsultationTele: any;
  telescheduledTime: any;
  walkinscheduledTime: any;
  registartionFees: any;
  feesConsultationwalkin: string;
  walkinscheduledTimes: string;
  feesConsultationTeles: string;
  telescheduledTimes: string;
  registartionFeess: string;
  slectedvalue: any;
  addnew: boolean = false;
  optionsList: any;
  optionsDepart: any;
  addClinicForm: FormGroup;
  sign: string;
  selectedLanguages: any=[];
  imageSrc: any;
  signStatus: any;
  docDetails: any=[];
  clinicdetails: any=[];
  introJS = introJs();
  variables2 = [{ id: '', clinic_name: "" }];
  public filteredList5 = this.variables2.slice();


  // swipeble


  // selectedIndex: number = 1;
  // public tabs = [
  //   {id:1}, 
  //   {id:2}, 
  //   {id:3}
  // ];
  // private tabsCount = this.tabs.length;
  // selectChange(): void{
  //   console.log("Selected INDEX: " + this.selectedIndex);
  // }

  // SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  // swipe(selectedIndex: number, action = this.SWIPE_ACTION.RIGHT) {
  //   console.log("swipe");
  //     console.log("number",selectedIndex);
  //     console.log("action",action);
  //     // Out of range
  //     if (this.selectedIndex < 0/* starter point as 1 */ || this.selectedIndex > this.tabsCount/* here it is */ ) return;
  
  //     // Swipe left, next tab
  //     if (action === this.SWIPE_ACTION.LEFT) {
  //       const isLast = this.selectedIndex === this.tabsCount;
  //       this.selectedIndex = isLast ? 0 : this.selectedIndex + 1;
  //       console.log("Swipe right - INDEX: " + this.selectedIndex);
  //     }
  
  //     // Swipe right, previous tab
  //     if (action === this.SWIPE_ACTION.RIGHT) {
  //       const isFirst = this.selectedIndex === 0 /* starter point as 1 */;
  //       this.selectedIndex = isFirst ? 1 : this.selectedIndex - 1;
  //       console.log("Swipe left - INDEX: " + this.selectedIndex);
  //     }
  //   }
  constructor(public select:SelectService,private zone:NgZone, public navCtrl:NavController,private examination:ExaminationService,private  alrtctl:AlertController,private _dialog:MatDialog,public formBuilder: FormBuilder,private auth:AuthService,private notification:NotificationService)
   { 
     this.dropDown()
   }
   ngAfterViewInit() {
    
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.sign = this.signaturePad.toDataURL();
    // this.uploadBase64(this.sign)
  }
  help(){
    introJs(document.querySelector("app-settings")).start();
    
  }

 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');

  }



   clear(): void {
    this.signaturePad.clear();
    // this.signature = '';
  }
  private imgSrc: string = ''
  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.addClinicForm = this.formBuilder.group({
      clinic_id :['',Validators.required],
      clinic_name:['',Validators.required],
      clinic_location:['',Validators.required]
    })
    console.log(localStorage.getItem('info'));
    this.info = JSON.parse(localStorage.getItem('info'));
    console.log(this.info);
    console.log(this.info['doctor_id']);
    console.log(this.info['clinic_id']);
    this.doctor_id=this.info['doctor_id'];
    this.clinic_id=this.info['clinic_id'];
    this.getData(this.info['doctor_id'],this.info['clinic_id']);
    this.checkSignatureStatus();
    this.getAddedlist();
  }

  checkSignatureStatus(){
    this.select.checkSign().subscribe((data: any)=>{
      this.signStatus = data.result.docSign[0].signStatus
      // console.log()
    })
  }

  handleInputChange(e){
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }

  getData(dId,cId){
    this.auth.getInfo(dId,cId).subscribe((data) => {
    console.log(data);
    this.walkinConsultationfee=data['result'].walkinConsultationFees;
    this.walkinConsultationTime=data['result'].walkinConsultationTime;
    this.teleConsultationFees=data['result'].teleConsultationFees;
    this.teleConsultationTime=data['result'].teleConsultationTime;
    this.registration_fees=data['result'].registration_fees;
    console.log(this.walkinConsultationfee);
    localStorage.setItem("walkinConsultationfee",this.walkinConsultationfee);
    localStorage.setItem("walkinConsultationTime",this.walkinConsultationTime);
    localStorage.setItem("teleConsultationFees",this.teleConsultationFees);
    localStorage.setItem("teleConsultationTime",this.teleConsultationTime);
    localStorage.setItem("registration_fees",this.registration_fees);
      // this.ProceduresList = data.result.procedure_list
    })
  }

  teleFees(e)
  {
    console.log(e);
    this.feesConsultationTele = e;
  }
  teleTime(e)
  {
    console.log(e);
    this.telescheduledTime=e;
    // console.log(e.target.value);
  }

  walkinTime(e)
  {
    console.log(e);
    this.walkinscheduledTime=e;
    // console.log(e.target.value);
  }

  registrationFees(e)
  {
    console.log(e);
    this.registartionFees=e;
  }

  walkinFees(e)
  {
    console.log(e);
    this.feesConsultation = e;
  }

  yourFn(e){
    // this.ngOnInit();
    // this.daysMainData=[];
    console.log(e);
    console.log(e.tab.textLabel);
    if(e.tab.textLabel == 'WalkinSlots Timings')
    {
        this.auth.getWalkinData(this.doctor_id,this.clinic_id,e.tab.textLabel).subscribe((data) => {
        console.log(data);
        console.log(data['result']['weekdays']);
        this.walkinTimings= data['result']['weekdays'];
        console.log(this.walkinTimings.length);
        // console.log(this.daysMainData);
        for(var i=0;i<this.walkinTimings.length;i++)
        {
          console.log(this.walkinTimings[i]);
          console.log(this.walkinTimings[i].day);
        // for(var k=1;k=7;k++){
          if(this.walkinTimings[i].day == '1')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.monAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monAftToTime = this.walkinTimings[i].slots[j].to_time;
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.monMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.monEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '2')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.tueAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueAftToTime = this.walkinTimings[i].slots[j].to_time;
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.tueMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.tueEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '3')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.wedAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.wedAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.wedAftFromTime);
                console.log(this.wedAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.wedMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.wedMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.wedEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.wedEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '4')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.thurAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.thurAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.thurMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.thurMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.thurEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.thurEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '5')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.friAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.friAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.friMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.friMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friMorToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.friMorId);
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.friEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.friEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '6')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.satAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.satAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.satMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.satMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.satEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.satEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '7')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.sunAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.sunAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.sunMornId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.sunMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.sunEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.sunEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }else{

          }
        // }
        }
        this.daysMainData=[ {"day":"Monday", "count":"1", "sessions":[{"Morning" :[ {"id":this.monMorId,"from_time": this.monMorFromTime, "to_time": this.monMorToTime}]},{"Afternoon":  
        [{"id":this.monAftId,"from_time": this.monAftFromTime,"to_time": this.monAftToTime}]},{"Evening":  [ {"id":this.monEvngId,"from_time": this.monEvngFromTime, "to_time": this.monEvngToTime}]}]},
        {"day":"Tuesday", "count":"2", "sessions":[{"Morning":  [ {"id":this.tueMorId,"from_time": this.tueMorFromTime, "to_time": this.tueMorToTime,}]},{"Afternoon":  
        [{"id":this.tueAftId,"from_time":  this.tueAftFromTime,"to_time":  this.tueAftToTime}]},{"Evening":  [ {"id":this.tueEvngId,"from_time":this.tueEvngFromTime, "to_time": this.tueEvngToTime}]}]},
        {"day":"Wednesday", "count":"3",  "sessions":[{"Morning":  [ {"id":this.wedMorId,"from_time":  this.wedMorFromTime, "to_time":  this.wedMorToTime}]},{"Afternoon":  
        [{"id":this.wedAftId,"from_time":this.wedAftFromTime,"to_time": this.wedAftToTime}]},{"Evening":  [ {"id":this.wedEvngId,"from_time": this.wedEvngFromTime, "to_time": this.wedEvngToTime}]}]},
        {"day":"Thursday",  "count":"4", "sessions":[{"Morning":  [ {"id":this.thurMorId,"from_time": this.thurMorFromTime, "to_time": this.thurMorToTime}]},{"Afternoon":  
        [{"id":this.thurAftId,"from_time": this.thurAftFromTime,"to_time": this.thurAftToTime}]},{"Evening":  [ {"id":this.thurEvngId,"from_time": this.thurEvngFromTime, "to_time": this.thurEvngToTime}]}]},
        {"day":"Friday",  "count":"5", "sessions":[{"Morning":  [ {"id":this.friMorId,"from_time": this.friMorFromTime, "to_time": this.friMorToTime}]},{"Afternoon":  
        [{"id":this.friAftId,"from_time": this.friAftFromTime,"to_time": this.friAftToTime}]},{"Evening":  [ {"id":this.friEvngId,"from_time": this.friEvngFromTime, "to_time": this.friEvngToTime}]}]},
        {"day":"Saturday", "count":"6",  "sessions":[{"Morning":  [ {"id":this.satMorId,"from_time":  this.satMorFromTime, "to_time":  this.satMorToTime}]},{"Afternoon":  
        [{"id":this.satAftId,"from_time":this.satAftFromTime,"to_time": this.satAftToTime}]},{"Evening":  [ {"id":this.satEvngId,"from_time": this.satEvngFromTime, "to_time": this.satEvngToTime}]}]},
        {"day":"Sunday", "count":"7",  "sessions":[{"Morning":  [ {"id":this.sunMornId,"from_time": this.sunMorFromTime, "to_time": this.sunMorToTime}]},{"Afternoon":  
        [{"id":this.sunAftId,"from_time": this.sunAftFromTime,"to_time": this.sunAftToTime}]},{"Evening":  [ {"id":this.sunEvngId,"from_time": this.sunEvngFromTime, "to_time": this.sunEvngToTime}]}]}]
        })
        // this.examination.roleId(this.slotTimings);
        console.log(this.daysMainData);
      }
      else if(e.tab.textLabel == 'TeleSlots Timings')
      {
        this.auth.getWalkinData(this.doctor_id,this.clinic_id,e.tab.textLabel).subscribe((data) => {
          console.log(data);
          console.log(data['result']['weekdays']);
          this.walkinTimings= data['result']['weekdays'];
          console.log(this.walkinTimings.length);
          // console.log(this.daysMainData);
          for(var i=0;i<this.walkinTimings.length;i++)
          {
            console.log(this.walkinTimings[i]);
            console.log(this.walkinTimings[i].day);
          // for(var k=1;k=7;k++){
            if(this.walkinTimings[i].day == '1')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.monAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonAftToTime = this.walkinTimings[i].slots[j].to_time;
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.monMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.monEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '2')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.tueAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueAftToTime = this.walkinTimings[i].slots[j].to_time;
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.tueMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.tueEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '3')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.wedAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telewedAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.wedAftFromTime);
                  console.log(this.wedAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.wedMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telewedMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.wedEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telewedEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '4')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.thurAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telethurAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.thurMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telethurMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.thurEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telethurEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '5')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.friAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telefriAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.friMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telefriMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriMorToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.friMorId);
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.friEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telefriEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '6')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.satAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telesatAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.satMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesatMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.satEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesatEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '7')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.sunAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telesunAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.sunMornId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesunMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.sunEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesunEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }else{
  
            }
          // }
          }
          this.daysMainDataa=[ {"day":"Monday", "count":"1", "sessions":[{"Morning" :[ {"id":this.monMorId,"from_time": this.telemonMorFromTime, "to_time": this.telemonMorToTime}]},{"Afternoon":  
          [{"id":this.monAftId,"from_time": this.telemonAftFromTime,"to_time": this.telemonAftToTime}]},{"Evening":  [ {"id":this.monEvngId,"from_time": this.telemonEvngFromTime, "to_time": this.telemonEvngToTime}]}]},
          {"day":"Tuesday", "count":"2", "sessions":[{"Morning":  [ {"id":this.tueMorId,"from_time": this.teletueMorFromTime, "to_time": this.teletueMorToTime,}]},{"Afternoon":  
          [{"id":this.tueAftId,"from_time":  this.teletueAftFromTime,"to_time":  this.teletueAftToTime}]},{"Evening":  [ {"id":this.tueEvngId,"from_time":this.teletueEvngFromTime, "to_time": this.teletueEvngToTime}]}]},
          {"day":"Wednesday", "count":"3",  "sessions":[{"Morning":  [ {"id":this.wedMorId,"from_time":  this.telewedMorFromTime, "to_time":  this.telewedMorToTime}]},{"Afternoon":  
          [{"id":this.wedAftId,"from_time":this.telewedAftFromTime,"to_time": this.telewedAftToTime}]},{"Evening":  [ {"id":this.wedEvngId,"from_time": this.telewedEvngFromTime, "to_time": this.telewedEvngToTime}]}]},
          {"day":"Thursday",  "count":"4", "sessions":[{"Morning":  [ {"id":this.thurMorId,"from_time": this.telethurMorFromTime, "to_time": this.telethurMorToTime}]},{"Afternoon":  
          [{"id":this.thurAftId,"from_time": this.telethurAftFromTime,"to_time": this.telethurAftToTime}]},{"Evening":  [ {"id":this.thurEvngId,"from_time": this.telethurEvngFromTime, "to_time": this.telethurEvngToTime}]}]},
          {"day":"Friday",  "count":"5", "sessions":[{"Morning":  [ {"id":this.friMorId,"from_time": this.telefriMorFromTime, "to_time": this.telefriMorToTime}]},{"Afternoon":  
          [{"id":this.friAftId,"from_time": this.telefriAftFromTime,"to_time": this.telefriAftToTime}]},{"Evening":  [ {"id":this.friEvngId,"from_time": this.telefriEvngFromTime, "to_time": this.telefriEvngToTime}]}]},
          {"day":"Saturday", "count":"6",  "sessions":[{"Morning":  [ {"id":this.satMorId,"from_time":  this.telesatMorFromTime, "to_time":  this.telesatMorToTime}]},{"Afternoon":  
          [{"id":this.satAftId,"from_time":this.telesatAftFromTime,"to_time": this.telesatAftToTime}]},{"Evening":  [ {"id":this.satEvngId,"from_time": this.telesatEvngFromTime, "to_time": this.telesatEvngToTime}]}]},
          {"day":"Sunday", "count":"7",  "sessions":[{"Morning":  [ {"id":this.sunMornId,"from_time": this.telesunMorFromTime, "to_time": this.telesunMorToTime}]},{"Afternoon":  
          [{"id":this.sunAftId,"from_time": this.telesunAftFromTime,"to_time": this.telesunAftToTime}]},{"Evening":  [ {"id":this.sunEvngId,"from_time": this.telesunEvngFromTime, "to_time": this.telesunEvngToTime}]}]}]
          })
          // this.examination.roleId(this.slotTimings);
          console.log(this.daysMainDataa);
      }
  }

  yourFnn(e){
    // this.ngOnInit();
    // this.daysMainData=[];
    // console.log(e);
    // console.log(e.tab.textLabel);
    if(e == 'WalkinSlots Timings')
    {
        this.auth.getWalkinData(this.doctor_id,this.clinic_id,e).subscribe((data) => {
        console.log(data);
        console.log(data['result']['weekdays']);
        this.walkinTimings= data['result']['weekdays'];
        console.log(this.walkinTimings.length);
        // console.log(this.daysMainData);
        for(var i=0;i<this.walkinTimings.length;i++)
        {
          console.log(this.walkinTimings[i]);
          console.log(this.walkinTimings[i].day);
        // for(var k=1;k=7;k++){
          if(this.walkinTimings[i].day == '1')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.monAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monAftToTime = this.walkinTimings[i].slots[j].to_time;
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.monMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.monEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.monEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.monEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '2')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.tueAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueAftToTime = this.walkinTimings[i].slots[j].to_time;
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.tueMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.tueEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.tueEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.tueEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '3')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.wedAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.wedAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.wedAftFromTime);
                console.log(this.wedAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.wedMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.wedMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.wedEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.wedEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.wedEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '4')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.thurAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.thurAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.thurMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.thurMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.thurEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.thurEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.thurEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '5')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.friAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.friAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.friMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.friMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friMorToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.friMorId);
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.friEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.friEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.friEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '6')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.satAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.satAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.satMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.satMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.satEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.satEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.satEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }
          else if(this.walkinTimings[i].day == '7')
          {
            for(var j=0;j<this.walkinTimings[i].slots.length;j++)
            {
              console.log(this.walkinTimings[i].slots);
              if(this.walkinTimings[i].slots[j].session == 'afternoon')
              {
                this.sunAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                console.log(this.walkinTimings[i].slots[j].session);
                console.log(this.walkinTimings[i].slots[j].from_time);
                console.log(this.walkinTimings[i].slots[j].to_time);
                this.sunAftFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunAftToTime = this.walkinTimings[i].slots[j].to_time;
                console.log(this.monAftFromTime);
                console.log(this.monAftToTime);
              }
              else if(this.walkinTimings[i].slots[j].session == 'morning')
              {
                this.sunMornId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.sunMorFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunMorToTime = this.walkinTimings[i].slots[j].to_time;
              }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                this.sunEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                this.sunEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                this.sunEvngToTime = this.walkinTimings[i].slots[j].to_time;
              }else{

              }
            }
          }else{

          }
        // }
        }
        this.daysMainData=[ {"day":"Monday", "count":"1", "sessions":[{"Morning" :[ {"id":this.monMorId,"from_time": this.monMorFromTime, "to_time": this.monMorToTime}]},{"Afternoon":  
        [{"id":this.monAftId,"from_time": this.monAftFromTime,"to_time": this.monAftToTime}]},{"Evening":  [ {"id":this.monEvngId,"from_time": this.monEvngFromTime, "to_time": this.monEvngToTime}]}]},
        {"day":"Tuesday", "count":"2", "sessions":[{"Morning":  [ {"id":this.tueMorId,"from_time": this.tueMorFromTime, "to_time": this.tueMorToTime,}]},{"Afternoon":  
        [{"id":this.tueAftId,"from_time":  this.tueAftFromTime,"to_time":  this.tueAftToTime}]},{"Evening":  [ {"id":this.tueEvngId,"from_time":this.tueEvngFromTime, "to_time": this.tueEvngToTime}]}]},
        {"day":"Wednesday", "count":"3",  "sessions":[{"Morning":  [ {"id":this.wedMorId,"from_time":  this.wedMorFromTime, "to_time":  this.wedMorToTime}]},{"Afternoon":  
        [{"id":this.wedAftId,"from_time":this.wedAftFromTime,"to_time": this.wedAftToTime}]},{"Evening":  [ {"id":this.wedEvngId,"from_time": this.wedEvngFromTime, "to_time": this.wedEvngToTime}]}]},
        {"day":"Thursday",  "count":"4", "sessions":[{"Morning":  [ {"id":this.thurMorId,"from_time": this.thurMorFromTime, "to_time": this.thurMorToTime}]},{"Afternoon":  
        [{"id":this.thurAftId,"from_time": this.thurAftFromTime,"to_time": this.thurAftToTime}]},{"Evening":  [ {"id":this.thurEvngId,"from_time": this.thurEvngFromTime, "to_time": this.thurEvngToTime}]}]},
        {"day":"Friday",  "count":"5", "sessions":[{"Morning":  [ {"id":this.friMorId,"from_time": this.friMorFromTime, "to_time": this.friMorToTime}]},{"Afternoon":  
        [{"id":this.friAftId,"from_time": this.friAftFromTime,"to_time": this.friAftToTime}]},{"Evening":  [ {"id":this.friEvngId,"from_time": this.friEvngFromTime, "to_time": this.friEvngToTime}]}]},
        {"day":"Saturday", "count":"6",  "sessions":[{"Morning":  [ {"id":this.satMorId,"from_time":  this.satMorFromTime, "to_time":  this.satMorToTime}]},{"Afternoon":  
        [{"id":this.satAftId,"from_time":this.satAftFromTime,"to_time": this.satAftToTime}]},{"Evening":  [ {"id":this.satEvngId,"from_time": this.satEvngFromTime, "to_time": this.satEvngToTime}]}]},
        {"day":"Sunday", "count":"7",  "sessions":[{"Morning":  [ {"id":this.sunMornId,"from_time": this.sunMorFromTime, "to_time": this.sunMorToTime}]},{"Afternoon":  
        [{"id":this.sunAftId,"from_time": this.sunAftFromTime,"to_time": this.sunAftToTime}]},{"Evening":  [ {"id":this.sunEvngId,"from_time": this.sunEvngFromTime, "to_time": this.sunEvngToTime}]}]}]
        })
        // this.examination.roleId(this.slotTimings);
        console.log(this.daysMainData);
      }
      else if(e == 'TeleSlots Timings')
      {
        this.auth.getWalkinData(this.doctor_id,this.clinic_id,e).subscribe((data) => {
          console.log(data);
          console.log(data['result']['weekdays']);
          this.walkinTimings= data['result']['weekdays'];
          console.log(this.walkinTimings.length);
          // console.log(this.daysMainData);
          for(var i=0;i<this.walkinTimings.length;i++)
          {
            console.log(this.walkinTimings[i]);
            console.log(this.walkinTimings[i].day);
          // for(var k=1;k=7;k++){
            if(this.walkinTimings[i].day == '1')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.monAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonAftToTime = this.walkinTimings[i].slots[j].to_time;
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.monMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.monEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telemonEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telemonEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '2')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.tueAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueAftToTime = this.walkinTimings[i].slots[j].to_time;
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.tueMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.tueEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.teletueEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.teletueEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '3')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.wedAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telewedAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.wedAftFromTime);
                  console.log(this.wedAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.wedMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telewedMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.wedEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telewedEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telewedEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '4')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.thurAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telethurAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.thurMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telethurMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.thurEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telethurEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telethurEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '5')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.friAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telefriAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.friMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telefriMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriMorToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.friMorId);
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.friEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telefriEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telefriEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '6')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.satAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telesatAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.satMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesatMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.satEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesatEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesatEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }
            else if(this.walkinTimings[i].day == '7')
            {
              for(var j=0;j<this.walkinTimings[i].slots.length;j++)
              {
                console.log(this.walkinTimings[i].slots);
                if(this.walkinTimings[i].slots[j].session == 'afternoon')
                {
                  this.sunAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  console.log(this.walkinTimings[i].slots[j].session);
                  console.log(this.walkinTimings[i].slots[j].from_time);
                  console.log(this.walkinTimings[i].slots[j].to_time);
                  this.telesunAftFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunAftToTime = this.walkinTimings[i].slots[j].to_time;
                  console.log(this.monAftFromTime);
                  console.log(this.monAftToTime);
                }
                else if(this.walkinTimings[i].slots[j].session == 'morning')
                {
                  this.sunMornId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesunMorFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunMorToTime = this.walkinTimings[i].slots[j].to_time;
                }else if(this.walkinTimings[i].slots[j].session == 'evening'){
                  this.sunEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
                  this.telesunEvngFromTime = this.walkinTimings[i].slots[j].from_time;
                  this.telesunEvngToTime = this.walkinTimings[i].slots[j].to_time;
                }else{
  
                }
              }
            }else{
  
            }
          // }
          }
          this.daysMainDataa=[ {"day":"Monday", "count":"1", "sessions":[{"Morning" :[ {"id":this.monMorId,"from_time": this.telemonMorFromTime, "to_time": this.telemonMorToTime}]},{"Afternoon":  
          [{"id":this.monAftId,"from_time": this.telemonAftFromTime,"to_time": this.telemonAftToTime}]},{"Evening":  [ {"id":this.monEvngId,"from_time": this.telemonEvngFromTime, "to_time": this.telemonEvngToTime}]}]},
          {"day":"Tuesday", "count":"2", "sessions":[{"Morning":  [ {"id":this.tueMorId,"from_time": this.teletueMorFromTime, "to_time": this.teletueMorToTime,}]},{"Afternoon":  
          [{"id":this.tueAftId,"from_time":  this.teletueAftFromTime,"to_time":  this.teletueAftToTime}]},{"Evening":  [ {"id":this.tueEvngId,"from_time":this.teletueEvngFromTime, "to_time": this.teletueEvngToTime}]}]},
          {"day":"Wednesday", "count":"3",  "sessions":[{"Morning":  [ {"id":this.wedMorId,"from_time":  this.telewedMorFromTime, "to_time":  this.telewedMorToTime}]},{"Afternoon":  
          [{"id":this.wedAftId,"from_time":this.telewedAftFromTime,"to_time": this.telewedAftToTime}]},{"Evening":  [ {"id":this.wedEvngId,"from_time": this.telewedEvngFromTime, "to_time": this.telewedEvngToTime}]}]},
          {"day":"Thursday",  "count":"4", "sessions":[{"Morning":  [ {"id":this.thurMorId,"from_time": this.telethurMorFromTime, "to_time": this.telethurMorToTime}]},{"Afternoon":  
          [{"id":this.thurAftId,"from_time": this.telethurAftFromTime,"to_time": this.telethurAftToTime}]},{"Evening":  [ {"id":this.thurEvngId,"from_time": this.telethurEvngFromTime, "to_time": this.telethurEvngToTime}]}]},
          {"day":"Friday",  "count":"5", "sessions":[{"Morning":  [ {"id":this.friMorId,"from_time": this.telefriMorFromTime, "to_time": this.telefriMorToTime}]},{"Afternoon":  
          [{"id":this.friAftId,"from_time": this.telefriAftFromTime,"to_time": this.telefriAftToTime}]},{"Evening":  [ {"id":this.friEvngId,"from_time": this.telefriEvngFromTime, "to_time": this.telefriEvngToTime}]}]},
          {"day":"Saturday", "count":"6",  "sessions":[{"Morning":  [ {"id":this.satMorId,"from_time":  this.telesatMorFromTime, "to_time":  this.telesatMorToTime}]},{"Afternoon":  
          [{"id":this.satAftId,"from_time":this.telesatAftFromTime,"to_time": this.telesatAftToTime}]},{"Evening":  [ {"id":this.satEvngId,"from_time": this.telesatEvngFromTime, "to_time": this.telesatEvngToTime}]}]},
          {"day":"Sunday", "count":"7",  "sessions":[{"Morning":  [ {"id":this.sunMornId,"from_time": this.telesunMorFromTime, "to_time": this.telesunMorToTime}]},{"Afternoon":  
          [{"id":this.sunAftId,"from_time": this.telesunAftFromTime,"to_time": this.telesunAftToTime}]},{"Evening":  [ {"id":this.sunEvngId,"from_time": this.telesunEvngFromTime, "to_time": this.telesunEvngToTime}]}]}]
          })
          // this.examination.roleId(this.slotTimings);
          console.log(this.daysMainDataa);
      }
  }
 
  getSlotsData()
  {
    // console.log(this.daysMainData);
  }

  editData(slot_type,id,session,from,to,day)
  {
    console.log(id,session,from,to,day);
    const dialog_ref = this._dialog.open(EditTimeComponent,{
      panelClass: ['myapp-no-padding-dialog'],
      data:{
        day:session,
        session:'Edit Timings',
        id:id,
        from:from,
        to:to,
        days:day,
        // slot_type:slot_type
      }
    })

    dialog_ref.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'success'){
        this.yourFnn(slot_type);
      }
      //   this.auth.getWalkinData(this.doctor_id,this.clinic_id,'walkin').subscribe((data) => {
      //     console.log(data);
      //     console.log(data['result']['weekdays']);
      //     this.walkinTimings= data['result']['weekdays'];
      //     console.log(this.walkinTimings.length);
      //     // console.log(this.daysMainData);
      //     for(var i=0;i<this.walkinTimings.length;i++)
      //     {
      //       console.log(this.walkinTimings[i]);
      //       console.log(this.walkinTimings[i].day);
      //     // for(var k=1;k=7;k++){
      //       if(this.walkinTimings[i].day == '1')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.monAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.monAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.monAftToTime = this.walkinTimings[i].slots[j].to_time;
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.monMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.monMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.monMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.monEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.clinic_doctor_weekday_slot_id = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.monEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.monEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '2')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.tueAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.tueAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.tueAftToTime = this.walkinTimings[i].slots[j].to_time;
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.tueMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.tueMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.tueMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.tueEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.tueEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.tueEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '3')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           console.log(this.walkinTimings[i].slots);
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.wedAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             console.log(this.walkinTimings[i].slots[j].session);
      //             console.log(this.walkinTimings[i].slots[j].from_time);
      //             console.log(this.walkinTimings[i].slots[j].to_time);
      //             this.wedAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.wedAftToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.wedAftFromTime);
      //             console.log(this.wedAftToTime);
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.wedMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.wedMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.wedMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.wedEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.wedEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.wedEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '4')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           console.log(this.walkinTimings[i].slots);
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.thurAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             console.log(this.walkinTimings[i].slots[j].session);
      //             console.log(this.walkinTimings[i].slots[j].from_time);
      //             console.log(this.walkinTimings[i].slots[j].to_time);
      //             this.thurAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.thurAftToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.monAftFromTime);
      //             console.log(this.monAftToTime);
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.thurMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.thurMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.thurMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.thurEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.thurEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.thurEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '5')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           console.log(this.walkinTimings[i].slots);
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.friAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             console.log(this.walkinTimings[i].slots[j].session);
      //             console.log(this.walkinTimings[i].slots[j].from_time);
      //             console.log(this.walkinTimings[i].slots[j].to_time);
      //             this.friAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.friAftToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.monAftFromTime);
      //             console.log(this.monAftToTime);
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.friMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.friMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.friMorToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.friMorId);
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.friEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.friEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.friEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '6')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           console.log(this.walkinTimings[i].slots);
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.satAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             console.log(this.walkinTimings[i].slots[j].session);
      //             console.log(this.walkinTimings[i].slots[j].from_time);
      //             console.log(this.walkinTimings[i].slots[j].to_time);
      //             this.satAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.satAftToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.monAftFromTime);
      //             console.log(this.monAftToTime);
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.satMorId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.satMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.satMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.satEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.satEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.satEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }
      //       else if(this.walkinTimings[i].day == '7')
      //       {
      //         for(var j=0;j<this.walkinTimings[i].slots.length;j++)
      //         {
      //           console.log(this.walkinTimings[i].slots);
      //           if(this.walkinTimings[i].slots[j].session == 'afternoon')
      //           {
      //             this.sunAftId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             console.log(this.walkinTimings[i].slots[j].session);
      //             console.log(this.walkinTimings[i].slots[j].from_time);
      //             console.log(this.walkinTimings[i].slots[j].to_time);
      //             this.sunAftFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.sunAftToTime = this.walkinTimings[i].slots[j].to_time;
      //             console.log(this.monAftFromTime);
      //             console.log(this.monAftToTime);
      //           }
      //           else if(this.walkinTimings[i].slots[j].session == 'morning')
      //           {
      //             this.sunMornId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.sunMorFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.sunMorToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else if(this.walkinTimings[i].slots[j].session == 'evening'){
      //             this.sunEvngId = this.walkinTimings[i].slots[j].clinic_doctor_weekday_slot_id;
      //             this.sunEvngFromTime = this.walkinTimings[i].slots[j].from_time;
      //             this.sunEvngToTime = this.walkinTimings[i].slots[j].to_time;
      //           }else{
  
      //           }
      //         }
      //       }else{
  
      //       }
      //     // }
      //     }
      //     this.daysMainData=[ {"day":"Monday", "count":"1", "sessions":[{"Morning" :[ {"id":this.monMorId,"from_time": this.monMorFromTime, "to_time": this.monMorToTime}]},{"Afternoon":  
      //     [{"id":this.monAftId,"from_time": this.monAftFromTime,"to_time": this.monAftToTime}]},{"Evening":  [ {"id":this.monEvngId,"from_time": this.monEvngFromTime, "to_time": this.monEvngToTime}]}]},
      //     {"day":"Tuesday", "count":"2", "sessions":[{"Morning":  [ {"id":this.tueMorId,"from_time": this.tueMorFromTime, "to_time": this.tueMorToTime,}]},{"Afternoon":  
      //     [{"id":this.tueAftId,"from_time":  this.tueAftFromTime,"to_time":  this.tueAftToTime}]},{"Evening":  [ {"id":this.tueEvngId,"from_time":this.tueEvngFromTime, "to_time": this.tueEvngToTime}]}]},
      //     {"day":"Wednesday", "count":"3",  "sessions":[{"Morning":  [ {"id":this.wedMorId,"from_time":  this.wedMorFromTime, "to_time":  this.wedMorToTime}]},{"Afternoon":  
      //     [{"id":this.wedAftId,"from_time":this.wedAftFromTime,"to_time": this.wedAftToTime}]},{"Evening":  [ {"id":this.wedEvngId,"from_time": this.wedEvngFromTime, "to_time": this.wedEvngToTime}]}]},
      //     {"day":"Thursday",  "count":"4", "sessions":[{"Morning":  [ {"id":this.thurMorId,"from_time": this.thurMorFromTime, "to_time": this.thurMorToTime}]},{"Afternoon":  
      //     [{"id":this.thurAftId,"from_time": this.thurAftFromTime,"to_time": this.thurAftToTime}]},{"Evening":  [ {"id":this.thurEvngId,"from_time": this.thurEvngFromTime, "to_time": this.thurEvngToTime}]}]},
      //     {"day":"Friday",  "count":"5", "sessions":[{"Morning":  [ {"id":this.friMorId,"from_time": this.friMorFromTime, "to_time": this.friMorToTime}]},{"Afternoon":  
      //     [{"id":this.friAftId,"from_time": this.friAftFromTime,"to_time": this.friAftToTime}]},{"Evening":  [ {"id":this.friEvngId,"from_time": this.friEvngFromTime, "to_time": this.friEvngToTime}]}]},
      //     {"day":"Saturday", "count":"6",  "sessions":[{"Morning":  [ {"id":this.satMorId,"from_time":  this.satMorFromTime, "to_time":  this.satMorToTime}]},{"Afternoon":  
      //     [{"id":this.satAftId,"from_time":this.satAftFromTime,"to_time": this.satAftToTime}]},{"Evening":  [ {"id":this.satEvngId,"from_time": this.satEvngFromTime, "to_time": this.satEvngToTime}]}]},
      //     {"day":"Sunday", "count":"7",  "sessions":[{"Morning":  [ {"id":this.sunMornId,"from_time": this.sunMorFromTime, "to_time": this.sunMorToTime}]},{"Afternoon":  
      //     [{"id":this.sunAftId,"from_time": this.sunAftFromTime,"to_time": this.sunAftToTime}]},{"Evening":  [ {"id":this.sunEvngId,"from_time": this.sunEvngFromTime, "to_time": this.sunEvngToTime}]}]}]
      //     })
      // }
    });
  }

deleteData(id,session,from,to,day)
{
  this.presentAlert(id);
}

async presentAlert(id) {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Do you really want to logout?",
    buttons: [
       {
        text: 'YES',
        handler: () => {
          this.auth.deleteData(id).subscribe((data) => {
            console.log(data);
            if(data['code'] =='200'){
              // this.yourFnn('WalkinSlots Timings')
            }
        
            })
          // this.yourFnn('WalkinSlots Timings')
          // this.zone.run(()=>{
          //   localStorage.removeItem('data')
          //   localStorage.removeItem('roleId')
          //   this.navCtrl.navigateRoot('/login');
          // })
        }
      },
      {
        text: 'NO',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        // console.log('Confirm Cancel: blah');
        }
      }
    ],
    
  });
  (await alert).present();
}

submitGeneral()
{
  console.log(this.feesConsultation);
  console.log(this.walkinscheduledTime);
  console.log(this.feesConsultationTele);
  console.log(this.telescheduledTime);
  console.log(this.registartionFees);
  if(this.feesConsultation == undefined)
  {
    this.feesConsultationwalkin =  localStorage.getItem("walkinConsultationfee");
  }else{
    this.feesConsultationwalkin = this.feesConsultation;
  }
  if(this.walkinscheduledTime == undefined)
  {
    this.walkinscheduledTimes = localStorage.getItem("walkinConsultationTime");
  }else{
    this.walkinscheduledTimes =  this.walkinscheduledTime;
  }
  if(this.feesConsultationTele == undefined)
  {
    this.feesConsultationTeles = localStorage.getItem("teleConsultationFees");
  }else{
    this.feesConsultationTeles = this.feesConsultationTele;
  }
  if(this.telescheduledTime == undefined)
  {
    this.telescheduledTimes = localStorage.getItem("teleConsultationTime");
  }else{
    this.telescheduledTimes = this.telescheduledTime;
  }
  if(this.registartionFees ==undefined)
  {
    this.registartionFeess = localStorage.getItem("registration_fees");
  }else{
    this.registartionFeess = this.registartionFees;
  }


  this.auth.generalData(this.feesConsultationwalkin,this.walkinscheduledTimes,
    this.feesConsultationTeles,this.telescheduledTimes,this.registartionFeess,this.doctor_id,this.clinic_id).subscribe((data) => {
      console.log(data);
      if(data['code']=='200'){
        this.notification.success('Settings Updated successfully');
        this.ngOnInit();
        // Swal.fire('','Updated successfully','success')
      }
      
      // this.ProceduresList = data.result.procedure_list
    })
}

add(a,b)
{
  console.log(a,b);
  console.log(this.daysMainData);
  // this.day = [this.monMorFromTime, this.tueMorFromTime, this.wedMorFromTime,
  //         this.thurMorFromTime,this.friMorFromTime, this.satMorFromTime,this.sunMorFromTime];

       this.examination.roleId(this.daysMainData);
      //  this.examination.roleIdd.subscribe(data => {console.log(data);
      //  this.backId=data});

  const dialog_ref = this._dialog.open(SlottimingsComponent,{
    panelClass: ['myapp-no-padding-dialog'],
    data:{
      clickedDay:a,
      edit:'editAdd',
      session:b,
      clinic_id:this.clinic_id,
      doctor_id:this.doctor_id,
      working:this.daysMainData
    }
  })
  dialog_ref.afterClosed().subscribe(result => {
    console.log(result);
    if(result == 'success')
    {
      this.yourFnn('WalkinSlots Timings');
    }
    // this.nextPopUpp();
  });
}

teleadd(a,b)
{
  console.log(a,b);
  console.log(this.daysMainDataa);
  // this.day = [this.monMorFromTime, this.tueMorFromTime, this.wedMorFromTime,
  //         this.thurMorFromTime,this.friMorFromTime, this.satMorFromTime,this.sunMorFromTime];

       this.examination.roleId(this.daysMainDataa);
      //  this.examination.roleIdd.subscribe(data => {console.log(data);
      //  this.backId=data});

  const dialog_ref = this._dialog.open(SlottimingsComponent,{
    panelClass: ['myapp-no-padding-dialog'],
    data:{
      clickedDay:a,
      edit:'teleeditAdd',
      session:b,
      clinic_id:this.clinic_id,
      doctor_id:this.doctor_id,
      working:this.daysMainDataa
    }
  })
  dialog_ref.afterClosed().subscribe(result => {
    console.log(result);
    if(result == 'success')
    {
      this.yourFnn('TeleSlots Timings');
    }
    // this.nextPopUpp();
  });
}

logout() {
  this.presentAlert1();
}

async presentAlert1() {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Do you really want to logout ?",
    buttons: [
      {
        text: 'NO',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        // console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'YES',
        handler: () => {
          this.zone.run(()=>{
            localStorage.removeItem('data')
            localStorage.removeItem('roleId')
            this.navCtrl.navigateRoot('/login');
          })
        }
      }
    ],
    
  });
  (await alert).present();
  }



  checkClincValue(event)

{ 
  console.log(event.value)
  this.slectedvalue = event.value;
  //console.log(this.slectedvalue);
  if(this.slectedvalue == 0)
  {
   return this.addnew = true;
  }else{
    this.addnew = false;
  }
}

dropDown() {
  this.select.dropDown().subscribe((data: any) => {
     console.log(data);
     this.optionsList = data["result"]["clinicInfo"];
     this.variables2 = data["result"]["clinicInfo"];
     console.log(this.variables2);
     //console.log(this.slectedvalue);
     this.optionsDepart = data["result"]["departments"];
 
  });
}
addclinic(data){
  console.log(data)
 
  
    if(this.slectedvalue == 0)
    {
      if(!this.addClinicForm.valid){
        return  false 
      }else{
      this.auth.newClinics(this.info,data).subscribe((res)=>
      {
        console.log(res);
        if(res['code'] =='200'){
          this.notification.success('Updated successfully')
          // Swal.fire('','Updated successfully','success');
          this.getAddedlist()
         }
         else{
          this.notification.error('Something Wrong')
          // Swal.fire('','Somthing Wrong','error')
         }
  
      });
    }
    }
  else{
    
     
      this.auth.addSecondaryClinic(this.info,data).subscribe((res)=>
      {
        console.log(res);
        if(res['code'] =='200'){
          this.notification.success('Updated successfully')
          // Swal.fire('','Updated successfully','success')
         }
         else{
          this.notification.error('Something Wrong')
          // Swal.fire('','Somthing Wrong','error')
         }
      });
    }
  }

 getAddedlist(){
   this.auth.addedlist(this.info).subscribe((res)=>{
     console.log(res.result.docDetails)
     this.docDetails = res.result.docDetails;
     this.clinicdetails = res.result.docDetails.clinicInfo
   })
 }


addsign(){
  this.auth.addSignature(this.info,this.sign).subscribe((res)=>
     {
     console.log(res);
     if(res['code'] =='200'){
      this.notification.success('Updated successfully')
      // Swal.fire('','Updated successfully','success')
     }
     else{
      this.notification.error('Somthing Wrong')
      // Swal.fire('','Somthing Wrong','error')
     }
   });
}
addReview(value){
  console.log(value)
  if(value == ''){
    alert('Please add Review Link')
  }else{

 
  this.auth.addReviewLink(this.info,value).subscribe((res)=>
     {
     console.log(res);
     if(res['code'] =='200'){
      this.notification.success('Updated successfully')
      // Swal.fire('','Updated successfully','success');
      this.getAddedlist()
     }
     else{
      this.notification.error('Something wrong')
      // Swal.fire('','Somthing Wrong','error')
     }
   });
  }
}
selectlang(e){
  console.log(e.value)
  this.selectedLanguages = e.value
}
addLanguages(){
  if(this.selectedLanguages == ''){
    alert('Please Select languages')
  }else{
    this.auth.languages(this.info,this.selectedLanguages).subscribe((res)=>
            {
              console.log(res);
              if(res['code'] =='200'){
                this.notification.success('Updated successfully')
                // Swal.fire('','Updated successfully','success');
                this.getAddedlist();
               }
               else{
                this.notification.success('Something wrong')
                // Swal.fire('','Somthing Wrong','error')
               }
            });
}
  }

}
