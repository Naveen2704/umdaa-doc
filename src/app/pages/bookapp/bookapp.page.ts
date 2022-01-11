import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone } from '@angular/core';
import { SelectService } from 'src/app/service/select.service';
import { CscServiceService } from 'src/app/service/csc-service.service';
import { BookappService } from 'src/app/service/bookapp.service';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl, FormArray, AbstractControl, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/service/loader.service';
import { ModalController, AlertController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import moment from 'moment-timezone';
import { SlotbookingService } from 'src/app/service/slotbooking.service';
import { PaymentmodalPage } from '../../paymentmodal/paymentmodal.page';
import { DOCUMENT } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Storage } from '@ionic/storage'
import { from, empty } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatStepper } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';
import { invalid } from '@angular/compiler/src/render3/view/util';





@Component({
  selector: 'app-bookapp',
  templateUrl: './bookapp.page.html',
  styleUrls: ['./bookapp.page.scss'],
})



export class BookappPage implements OnInit{
  // @ViewChild('registerForm', { static: true }) formValues

  // @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  patient:any =[]
  patientInfo: any = [];
  patientbillInfo: any = [];
  employee='';
  isOptional = false;
  isCompleted = false;
  RegisterForm: FormGroup;
  submitted = false;
  submittedd = false;
  titles: string[];
  genders: string[];
  languages: string[];
  years: string[];
  age: number;
  birthdate: any;
  languges: any[];
  referredbys: any[];
  states: any[];
  districts: any;
  SelectedValue: any[];
  state_ids: any = [];
  result: any[];
  filterDistricts: any = [];
  responceData: any = [];
  title: any;
  gender: any;
  showMyContainer: boolean = false;
  showMyPayment: boolean = false;

  //slot booking section

  momentjs: any = moment;
  slots: any = [];
  addslots: boolean;
  today = new Date();
  jstoday = '';
  day: number;
  slottimings: any = [];
  length: any = [];
  doctorTimings: any = [];
  timeValue: any = [];
  slotsTime: number;
  timeStops: any = [];
  length1: any = [];
  MtimeStops: any = [];
  AtimeStops: any = [];
  hide: boolean = false;
  session1: any = [];
  afternoonAr: any = [];
  morningAr: any = [];
  eveningAr: any = [];
  disableButton;
  time: string;
  timeResp: any = [];
  priority: HTMLElement;
  bookingMode: any = [];
  bookingDate: any = [];
  data: any = [];
  sms: any = [];
  public form = [
    { val: '1', isChecked: true },

  ];
  bookedSlots: any;
  clickedDate: any = [];
  convertedDate: Date;
  bs: any;
  bslength: number;
  isenabled: boolean = false;
  session: string;


  disabled: boolean = false;
  isLinear = false;
  stepHigh = false;



  public json_data = [
    { "id": 1, "name": "Registration Fee", "price": 100, isChecked: true },
    { "id": 2, "name": "Consultation Fee", "price": 500, isChecked: true }
  ]
  total_price: any = [];
  total: any;
  price1: number;
  price2: number;
  payment: any = [];
  totalPrice: number;
  conPrice: any;
  regPrice: any;
  reg: HTMLElement;
  con: HTMLElement;
  discount: any;
  discount_unit: any;
  discounted: number;
  withDiscount: any;
  max: any;
  billPayment: FormGroup;
  res: any[];
  checkedReg: any;
  checkedCon: any;
  billing: any;
  regCheck: any;
  conCheck: any;
  loadDate: string;
  patient_id: any;
  test: any;
  modeofpayment: any;
  reg_fee: number;
  con_fee: number;
  minDate: string = new Date().toISOString();
  maxData : any = '2024-12-01T04:49:05.501Z';
  selectedDate: string = new Date().toISOString();
  bookSlotForm: FormGroup;
  patientInfoget: any = [];
  appointmentsInfo: Promise<any>;
  billingInfo: any;
  error: string;
  patientAppointmentInfo: any = [];
  responses: any = [];
  slotid: any;
  className: HTMLCollectionOf<Element>;
  elements: any;
  MorePatientInfo: any;
  maxLenght: number;
  ntimes: any;
  bdate: string;
  hidee: boolean = false;

  addAttributeForm: FormGroup;
  loadTime: string;
  slotsSunday: string;
  todayDate: string;
  checkingInfo: string;
  specialMorning=[];
  agetypes: string[];
  userData: string;
  roleId: string;
  app_id: any;
  firstname: any;
  mobile: any;
  location: any;
  appointment_type: string;
  slotType: any;
  detail: any=[];
  nurseList: any=[];
  impData: any;
  checkRoleId: any;
  selectedDoc: any;
  constructor

    (private _dialog:MatDialog,private ngZone: NgZone, public elm: ElementRef, private storageData: Storage, @Inject(DOCUMENT) private document: Document, private datePicker: DatePicker, public alrtctl: AlertController,
      private slotbooking: SlotbookingService, private router: Router, private loader: LoaderService, private select: SelectService, public alertctrl: AlertController, public navctrl: NavController, public root: Router,
      private formBuilder: FormBuilder, private CscService: CscServiceService, private bookapp: BookappService, private http: HttpClient, private modal: ModalController

    ) {

  }



  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      this.maxLenght = 25
      return true
    }
    else {
      return false
    }
  }
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  ngOnInit() {
    console.log((new Date()).getFullYear() + 3);
    console.log(this.minDate);
    this.loadtime();
    localStorage.getItem('slotType');
    // console.log(localStorage.getItem('slotType'));
    // console.log(JSON.parse(localStorage.getItem('data')));
    this.impData = JSON.parse(localStorage.getItem('data'));
    console.log(this.impData.result.role_id);
    this.checkRoleId = this.impData.result.role_id;
    console.log(this.checkRoleId);

    if(this.impData.result.role_id =='6')
    {
      this.nurse(this.impData.result.role_id,this.impData.result.clinic_id);
    }
    
    this.roleId = localStorage.getItem('roleId')
    
    this.bookSlotForm = new FormGroup({
      priority: new FormControl('',),
      doctor_id: new FormControl(''),
      bookingMode: new FormControl('',Validators.required),
      bookingDate: new FormControl(''),
      sms: new FormControl(''),
      morningslot: new FormControl(''),
      after: new FormControl(''),
      evenslot: new FormControl('')
    })
    this.patientbillInfo.regPrice = true;
    this.patientbillInfo.conPrice = true;
    this.paymentTotals();
    this.patientInfo.priority = "none"
    this.patientInfo.bookingMode = "Walk-in";
   
    this.patient.title = ""
    this.patient.gender = ""
    this.patient.language = "English"
    this.patient.agetype = ""
    this.RegisterForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.email]],
      mobile: ['', Validators.compose([Validators.required, Validators.maxLength(10),
      Validators.minLength(10)])],
      occupation: [''],
      age: [''],
      agetype:[''],
      gender: [''],
      title: [''],
      location: ['', Validators.required],
      language:['']


      //password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.minDate)

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours < 10 ? '0'+ hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    var month = new Date().getMonth() + 1;
    this.loadDate = new Date().getFullYear() + "-" + (month < 9 ? '0' : '') + month + "-" + (new Date().getDate() < 9 ? '0' : '') + new Date().getDate();
    console.log(this.loadDate);
    // console.log(formatAMPM(new Date));
    //this.loadTime = formatAMPM(new Date());
    console.log(this.loadTime)
    this.createSlots(this.loadDate);
    this.patientInfo.bookingDate = new Date().getFullYear() + "-" + month + "-" + new Date().getDate();
    this.billPayment = new FormGroup({
      reg: new FormControl(''),
      consult: new FormControl(''),
      disc: new FormControl(''),
    })
    //console.log(this.minDate)
    //this.createSlots();
    this.titles = [
      "Mr",
      "Mrs",
      "MISS",
      // "MASTER",
      // "BABY"
    ];
    this.agetypes = [
      "Days",
      "Months",
      "Years"
    ];
    this.genders = [
      "Male",
      "Female",
      "Others",

    ];
    this.languages = [
       "English", "Hindi", "Telugu", "Kannada", "Malayalam", "Tamil", "Urdu", "Sindhi", "Panjabi", "Gujarati", "Marathi", "Bengali"

    ];
    this.years = [
      "DAYS",
      "MONTHES",
      "YEARS"
    ];
    this.languges = [
      "ENGLISH",
      "HINDI",
      "TELUGU",
      "KANNADA",
      "MALAYALAM",
      "THAMIL",
      "URDHU",
      "SINDHI",
      "PANJABHI",
      "MARATHI",
      "GUJARATHI",
      "BENGALI"
    ];
    this.referredbys = [
      "word of mouth",
      "online",
      "doctor"
    ];

    localStorage.setItem('slotType', 'Walk-in Slots');

  }
  ionViewWillEnter() {
    this.opendailog()
}
 
  addslot(){
    this.router.navigateByUrl('/settings')
  }

  loadtime(){
    this.loadTime = (new Date().getHours()<10?'0':'')+new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'')+new Date().getMinutes();
    //  alert(this.loadTime)
    console.log("loadtime" + this.loadTime)

  }
  nurse(role_id,clinic_id)
  {
    this.slotbooking.getNurseList(role_id,clinic_id).subscribe((res)=>{
      console.log(res);
      console.log(res['result']['doctor']);
      this.nurseList = res['result']['doctor'];
      this.selectedDoc = this.nurseList[0].doctor_id;
      console.log(this.nurseList[0].doctor_id);
      console.log(this.nurseList[0].doctor_name);
    });
  }
  
  yourFn(a,$event,id){
    console.log(a)
    this.loadtime();
    let date = a.split("-")
    console.log(date);
    console.log(date[0]);
    console.log(date[1]);
    console.log(date[2]);
    
      // let last = ('0'+date[2]).slice(-2);
      a = date[0]+"-"+(date[1]<=9?'0':'')+date[1]+"-"+(date[2]<=9?'0':'')+date[2];
      console.log(a);
     
    console.log($event);
    console.log($event['tab']);
    console.log($event['tab'].textLabel);
    this.slotType = $event['tab'].textLabel;
    localStorage.setItem('slotType', $event['tab'].textLabel);

    this.createSlotss(a,id)
}

opendailog(){
  const dialog_ref = this._dialog.open(DailogComponent,{
    panelClass: ['patient'],
    hasBackdrop: true,
  })
  
  dialog_ref.afterClosed().subscribe(result => {
    console.log(result.event)
    console.log(result.p_id)
    if(result.event == 'book'){
      this.appointment_type = 'Follow-up';
      this.slotbooking.getPatients(result.p_id).subscribe((res)=>{
        console.log(res)
        if(res.result.popStatus == 1){
          this.slotbooking.PatientDetails = res.result;
          this.MorePatientInfo = res.result
          console.log(this.slotbooking.PatientDetails)
          // console.log(index)
          this.stepper.linear = false
          this.stepper.selectedIndex = 1;
        }
        // else{
        //   this.slotbooking.PatientDetails = this.detail
        // }
        // this.firstname = res.result.first_name;
        // this.mobile = res.result.mobile;
        // this.location = res.result.location;
        // this.appointment_type = 'Follow-up';
      })
    } 
    if(result.event == 'add')
    {
      this.mobile = result.number;
      this.appointment_type = 'New';
    }
    if(result.event == 'close'){
      this.router.navigate(['/appointment']);
    }
  });
}

  date(event) {
    this.slots = event.detail.value;
    if (this.slots == null) {
      return this.addslots = false;
    } else {
      this.addslots = true;
    }

  }

  get f() { return this.RegisterForm.controls }

  get slot() { return this.bookSlotForm.controls }

  numberOnly_m(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  numberOnly_D(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  numberOnly_A(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onSubmit(data) {
    console.log(data)  
    
    console.log(data.age,data.agetype)
    this.submitted = true;

    if (!this.RegisterForm.valid) {
      return false;
    } else {
      this.loader.loadingPresent();
      (this.slotbooking.postData(data)).subscribe((res) => {
        //console.log(res['result'].patient_id);
        if (res['code'] == '200') {
          this.responceData = res;
          console.log(this.responceData)
          this.detail = res.result
          this.slotbooking.PatientDetails = this.detail
          console.log(this.slotbooking.PatientDetails)
          this.MorePatientInfo = this.slotbooking.PatientDetails
          console.log(this.MorePatientInfo.full_name)
          this.loader.loadingDismiss();
        }
        return ;
        // return this.presentAlert(this.responceData["message"]);
      })
    }
    // if(data.firstname && data.location && data.email && data.mobile && data.age){
    //   this.loader.loadingPresent();

    // }
    // localStorage.setItem('slotType'0000000000000000000000000000000, 'Walk-in Slots');

  }
  reset() {
    this.onSubmit(this.data);
  }

  //getSlotValue
  getSlotID(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    // console.log(this.document.getElementById('slotBtn_{{i}}').value)
    console.log(this.patientInfo.after)
    this.elements = this.elm.nativeElement.querySelectorAll('.btn-primary');
    for (var n = 0; n < this.elements.length; n++) {
      this.elements[n].classList.remove('btn-primary');
      this.elements[n].classList.add('button-outline');
    }
    event.target.classList.toggle('btn-primary'); // To ADD
    event.target.classList.toggle('button-outline'); // To Remove
  }
  validAge(event) {
    console.log(event.detail.value);
    if(event.detail.value > 101)
    {
      alert('Please enter valid age');
      // this.age = 100;
      this.RegisterForm.get('age').setValue('')
    }
    if (event.detail.value == 0 && event.detail.value != '') {
      alert('Please enter Valid age');
      // this.age = 1;
      this.RegisterForm.get('age').setValue('')
    }
  }
  //slot booking  section...........///

  
    trueclick_M(timingss1,stepper: MatStepper){
     this.submittedd = true;
    //  if (!this.bookSlotForm.valid ) {
    //    return false;
    //  }// else{
      // localStorage.removeItem('slotType');
      console.log(timingss1)
      if(timingss1 == 'No Slots Available')
      {
        alert('No Slots Available');
      }
      if (!this.bookSlotForm.valid) {
        return false;
      }
      else{
     this.priority = this.patientInfo.priority
     console.log(this.priority)
    //  this.sms =this.patientInfo.sms;
     this.bookingMode =this.patientInfo.bookingMode;
     this.bookingDate = this.patientInfo.bookingDate;
  
     this.time= timingss1
     this.bookingDate = this.bookingDate.substr(0,10),
     console.log(this.bookingDate)
     this.selectedDate;
    //  if(this.patientInfo.sms == true){
    //    this.patientInfo.sms = "1";
    //  }
    //  else{
    //    this.patientInfo.sms = "0";
    //  }
     
     this.data = new Array();
     this.data['sms'] = this.patientInfo.sms
     this.data['priority'] = this.priority;
     this.data['bookingMode'] = this.bookingMode;
     this.data['bookingDate'] = this.bookingDate;
     this.data['time'] = this.time; 
     console.log(this.data)
     this.loader.loadingPresent();
     
    
       this.slotbooking.slotTime(localStorage.getItem('slotType'),this.data,this.appointment_type,this.checkRoleId, this.selectedDoc).subscribe((res)=>{
       this.timeResp = res;
       console.log(this.timeResp)
       console.log(this.timeResp.result.appointment.con_payment_status);
       console.log(this.timeResp.result.appointment.reg_payment_status)
       if(this.timeResp.result.appointment.con_payment_status > 0 && this.timeResp.result.appointment.reg_payment_status > 0){
           this.presentAlert_1();
       }else{
        stepper.next();
       }
       if(res['code']=="200")
       {
   
          this.slotbooking.PatientSlotTime = this.timeResp.result.appointment;
          console.log(this.slotbooking.PatientSlotTime)
          this.patientInfoget = this.slotbooking.PatientSlotTime 
          console.log(this.patientInfoget )
          this.loader.loadingDismiss();
          stepper.next();
          localStorage.removeItem('slotType');
      //   console.log(this.timeResp)
       }
       if(res['code']=="201"){
        this.submittedd = false;
        this.presentAlert_2();
        this.loader.loadingDismiss();
       }
       return;
      /// return this.presentAlert(this.timeResp["message"]);
     })
     //}
    }
    }

  trueclick_A(timingss2,stepper: MatStepper) {
    // localStorage.removeItem('slotType');
    this.submitted = true;
    if(timingss2 == 'No Slots Available')
    {
      alert('No Slots Available');
    }
    if (!this.bookSlotForm.valid) {
      return false;
    }
    else{

 
    this.submittedd = true;
    if (!this.bookSlotForm.valid) {
      return false;
    } else {
      this.priority = this.patientInfo.priority
      // this.sms = this.patientInfo.sms;
      this.bookingMode = this.patientInfo.bookingMode;
      this.bookingDate = this.patientInfo.bookingDate;
      // this.time = timingss2 + ":00" + " PM"
      this.time = timingss2;
      this.bookingDate = this.bookingDate.substr(0, 10),
        this.selectedDate;
      // if (this.patientInfo.sms == true) {
      //   this.patientInfo.sms = "1";
      // }
      // else {
      //   this.patientInfo.sms = "0";
      // }

      this.data = new Array();
      this.data['sms'] = this.patientInfo.sms
      this.data['priority'] = this.priority;
      this.data['bookingMode'] = this.bookingMode;
      this.data['bookingDate'] = this.bookingDate;
      this.data['time'] = this.time;
     console.log(this.data)
      this.loader.loadingPresent();
      this.slotbooking.slotTime(localStorage.getItem('slotType'),this.data,this.appointment_type,this.checkRoleId, this.selectedDoc).subscribe((res) => {
        this.timeResp = res;
        
        if (res['code'] == "200") {

          this.slotbooking.PatientSlotTime = this.timeResp.result.appointment;
          console.log(this.slotbooking.PatientSlotTime)
          this.patientInfoget = this.slotbooking.PatientSlotTime
          console.log(this.patientInfoget)
          this.loader.loadingDismiss();
          stepper.next();
          localStorage.removeItem('slotType');
          //   console.log(this.timeResp)
        } if (res['code'] == "201") {
          this.presentAlert_2();
          this.loader.loadingDismiss();
        }
        return;
        /// return this.presentAlert(this.timeResp["message"]);
      })
    }
  }
  }
  trueclick_E(timingss3,stepper: MatStepper) {
    // localStorage.removeItem('slotType');
    this.submitted = true;
    console.log(timingss3);
    if(timingss3 == 'No Slots Available')
    {
      alert('No Slots Available');
    }
    if (!this.bookSlotForm.valid) {
      return false;
    }
    else
    {
    this.submittedd = true;
    if (!this.bookSlotForm.valid) {
      return false;
    } else {
      this.priority = this.patientInfo.priority
      this.sms = this.patientInfo.sms;
      this.bookingMode = this.patientInfo.bookingMode;
      this.bookingDate = this.patientInfo.bookingDate;
      // this.time = timingss3 + ":00"+ " PM";
      this.time = timingss3;

      this.bookingDate = this.bookingDate.substr(0, 10),
        this.selectedDate;
      // if (this.patientInfo.sms == true) {
      //   this.patientInfo.sms = "1";
      // }
      // else {
      //   this.patientInfo.sms = "0";
      // }
      this.data = new Array();
      this.data['sms'] = this.patientInfo.sms
      this.data['priority'] = this.priority;
      this.data['bookingMode'] = this.bookingMode;
      this.data['bookingDate'] = this.bookingDate;
      this.data['time'] = this.time;
      // console.log(this.data)
      this.loader.loadingPresent();
      this.slotbooking.slotTime(localStorage.getItem('slotType'),this.data,this.appointment_type,this.checkRoleId, this.selectedDoc).subscribe((res) => {
        this.timeResp = res;

        if (res['code'] == "200") {
          this.slotbooking.PatientSlotTime = this.timeResp.result.appointment;
          console.log(this.slotbooking.PatientSlotTime)
          this.patientInfoget = this.slotbooking.PatientSlotTime
          console.log(this.patientInfoget)
          this.loader.loadingDismiss();
          stepper.next();
          localStorage.removeItem('slotType');
          //   console.log(this.timeResp)
        } if (res['code'] == "201") {
          this.presentAlert_2();
          this.loader.loadingDismiss();
        }
        return;
        /// return this.presentAlert(this.timeResp["message"]);
      })
    }}
  }
  createSlots(loadDate) {

    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // var todayy = mm + '/' + dd + '/' + yyyy;
    // console.log(todayy);
    // document.write(todayy);
    // console.log(this.slotType);
       var dd = String(new Date().getDate()).padStart(2, '0');
                  var mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = new Date().getFullYear();
                  console.log( yyyy + '-' + mm + '-' + dd);

                  this.todayDate = yyyy + '-' + mm + '-' + dd;
                  console.log(this.todayDate);
                  // console.log(this.loadDate);

    // this.hidee=false;
    console.log(this.morningAr);
    console.log(this.morningAr.length);
    this.morningAr.splice(0, this.morningAr.length);
    console.log(this.morningAr.length);
    console.log(this.morningAr);

    console.log(this.afternoonAr);
    console.log(this.afternoonAr.length);
    this.afternoonAr.splice(0, this.afternoonAr.length);
    console.log(this.afternoonAr.length);
    console.log(this.afternoonAr);

    console.log(this.eveningAr);
    console.log(this.eveningAr.length);
    this.eveningAr.splice(0, this.eveningAr.length);
    console.log(this.eveningAr.length);
    console.log(this.eveningAr);

    console.log(loadDate)
    if (loadDate != null) {
      this.clickedDate = loadDate;
      this.clickedDate = this.clickedDate.substr(0, 10);
      console.log(this.clickedDate+' loaded')
      this.convertedDate = new Date(this.clickedDate);
      console.log(this.todayDate+' Today');
      console.log(this.convertedDate)
      console.log(this.convertedDate.getDay())
    
    }

    if(this.clickedDate == this.todayDate)
    {
        this.checkingInfo = 'EQUAL';
        console.log(this.checkingInfo);
    }
    else{
      this.checkingInfo = 'NEQUAL';
      console.log(this.checkingInfo);
    }
    localStorage.getItem('slotType');
    console.log(localStorage.getItem('slotType'));
    console.log(JSON.parse(localStorage.getItem('data')));
    var impDataa = JSON.parse(localStorage.getItem('data'));
    console.log(impDataa.result.role_id);
  
    if(impDataa.result.role_id == '4')
    {
      this.slotbooking.getslots(localStorage.getItem('slotType'))
      .subscribe((data) => {
        this.slots = data;

        console.log(this.slots)
        this.bookedSlots = this.slots['result']['booked_slots'];
        console.log(this.bookedSlots)

        this.slottimings = this.slots['result']['doctor']['clinics']['working_days'];
        console.log(this.slottimings)
        this.payment = this.slots['result']['doctor']['clinics'];
        this.reg_fee = parseInt(this.payment.registration_fee)
        this.con_fee = parseInt(this.payment.consulting_fee)
        this.totalPrice = this.reg_fee + this.con_fee


        console.log(this.slottimings);
        this.day = this.convertedDate.getDay();
        console.log(this.day);

        for (var z1 = 0; z1 < this.slottimings.length; z1++) {
          // console.log(this.slottimings[z1].dayNum);
          if (this.slottimings[z1].dayNum != 0) {
            this.morningAr = ['No Slots Available'];
            this.afternoonAr = ['No Slots Available'];
            this.eveningAr = ['No Slots Available'];
          }
          for (var z = 0; z < this.slottimings.length; z++) {
            if (loadDate != null) {
              this.clickedDate = loadDate;
              this.clickedDate = this.clickedDate.substr(0, 10);
              //console.log(this.clickedDate)
              this.convertedDate = new Date(this.clickedDate);
              console.log(this.convertedDate)
              console.log(this.convertedDate.getDay())
              if(this.convertedDate.getDay() == 0)
              {var dayCount = 7}
              else
              {var dayCount =this.convertedDate.getDay()}
              
            }
            if (this.slottimings[z].dayNum == dayCount) {
              console.log(this.slottimings[z]);
              console.log(this.slottimings[z].timings);
              // for (var i = 0; i <= this.slottimings[z].timings - 1; i++) {

              // this.length1 = this.slottimings[i].timings;

              for (var n = 0; n < this.slottimings[z].timings.length; n++) {
                // var ar1 = this.length1[n];
                console.log(this.slottimings[z].timings[n].session);
                var times = this.slottimings[z].timings[n].schedule.split("-");
                console.log(times);
                var start = times[0];
                console.log(start);
                var end = times[1];
                console.log(end);
                var intervel = this.slots['result']['doctor']['clinics']['consultation_time']
                console.log(intervel);
                this.timeStops[n] = this.getTimeStops(start, end, intervel);
                // console.log(this.timeStops[n]);

                if (this.slottimings[z].timings[n].session == 'Morning') {
                  this.morningAr = this.timeStops[n];
                }
                else if (this.slottimings[z].timings[n].session == 'Afternoon') {
                  this.afternoonAr = this.timeStops[n];
                  
                  console.log(this.afternoonAr);

                }
                else if (this.slottimings[z].timings[n].session == 'Evening') {
                  this.eveningAr = this.timeStops[n];
                 
                  console.log(this.eveningAr);
                  
                }
                else {

                }
                console.log(this.morningAr); console.log(this.afternoonAr); console.log(this.eveningAr);
                if (this.morningAr == '' ) {
                  this.morningAr = ['No Slots Available'];
                  
                }
                if (this.afternoonAr == '') {
                  this.afternoonAr = ['No Slots Available'];
                }
                if (this.eveningAr == '') {
                  this.eveningAr = ['No Slots Available'];
                }
              }

              // }
            }
          }

        }

        // console.log(this.morningAr);
        // console.log(this.afternoonAr);
        // console.log(this.eveningAr);

                  // console.log(this.loadDate);
                  // console.log(this.loadTime);
                  // var dd = String(new Date().getDate()).padStart(2, '0');
                  // var mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
                  // var yyyy = new Date().getFullYear();
                  // console.log( yyyy + '-' + mm + '-' + dd);
                  // if(this.loadDate == yyyy + '-' + mm + '-' + dd)
                  // {

                  //   console.log(this.morningAr.length);
                  //   console.log(this.morningAr.length[0]);
                  //   for(var r= 0;this.morningAr.length;r++)
                  //   {
                  //       console.log(this.morningAr[r]);
                  //   }
                  // }

        this.loader.loadingDismiss();

        this.bslength = this.bookedSlots.length - 1;
        console.log(this.bslength)
        console.log(this.clickedDate)
        if (this.bslength != null) {

          for (var cd = 0; cd < this.bslength; cd++) {
            console.log(this.clickedDate, this.bookedSlots[cd]['date'], this.bookingDate)
            if (this.clickedDate == this.bookedSlots[cd]['date']) {
              this.bs = this.bookedSlots[cd]['time_slot'];
              console.log(this.bs)

              if (this.bs != null) {
                for (var c = 0; c < this.bs.length; c++) {
                  var split = this.bs[c].split(" ");
                  var mrindex = this.morningAr.indexOf(split[0]);
                  console.log(mrindex)
                  if (mrindex > -1) {
                    console.log(this.morningAr.splice(mrindex, 1))

                  }
                  var afindex = this.afternoonAr.indexOf(split[0]);
                  if (afindex > -1) {
                    this.afternoonAr.splice(afindex, 1);

                  }
                  var evindex = this.eveningAr.indexOf(split[0]);
                  if (evindex > -1) {
                    this.eveningAr.splice(evindex, 1);

                  }
                }
              }

            }

          }
        }

      });
  
    }
    else{

      this.slotbooking.getNurseList(this.impData.result.role_id,this.impData.result.clinic_id).subscribe((res)=>{
        console.log(res);
        console.log(res['result']['doctor']);
        this.nurseList = res['result']['doctor'];
        this.selectedDoc = this.nurseList[0].doctor_id;
        console.log(this.nurseList[0].doctor_id);
        console.log(this.nurseList[0].doctor_name);

        this.slotbooking.getslotss(localStorage.getItem('slotType'),this.nurseList[0].doctor_id)
        .subscribe((data) => {
          this.slots = data;
  
          console.log(this.slots)
          this.bookedSlots = this.slots['result']['booked_slots'];
          console.log(this.bookedSlots)
  
          this.slottimings = this.slots['result']['doctor']['clinics']['working_days'];
          console.log(this.slottimings)
          this.payment = this.slots['result']['doctor']['clinics'];
          this.reg_fee = parseInt(this.payment.registration_fee)
          this.con_fee = parseInt(this.payment.consulting_fee)
          this.totalPrice = this.reg_fee + this.con_fee
  
  
          console.log(this.slottimings);
          this.day = this.convertedDate.getDay();
          console.log(this.day);
  
          for (var z1 = 0; z1 < this.slottimings.length; z1++) {
            // console.log(this.slottimings[z1].dayNum);
            if (this.slottimings[z1].dayNum != 0) {
              this.morningAr = ['No Slots Available'];
              this.afternoonAr = ['No Slots Available'];
              this.eveningAr = ['No Slots Available'];
            }
            for (var z = 0; z < this.slottimings.length; z++) {
              if (loadDate != null) {
                this.clickedDate = loadDate;
                this.clickedDate = this.clickedDate.substr(0, 10);
                //console.log(this.clickedDate)
                this.convertedDate = new Date(this.clickedDate);
                console.log(this.convertedDate)
                console.log(this.convertedDate.getDay())
                if(this.convertedDate.getDay() == 0)
                {var dayCount = 7}
                else
                {var dayCount =this.convertedDate.getDay()}
                
              }
              if (this.slottimings[z].dayNum == dayCount) {
                console.log(this.slottimings[z]);
                console.log(this.slottimings[z].timings);
                // for (var i = 0; i <= this.slottimings[z].timings - 1; i++) {
  
                // this.length1 = this.slottimings[i].timings;
  
                for (var n = 0; n < this.slottimings[z].timings.length; n++) {
                  // var ar1 = this.length1[n];
                  console.log(this.slottimings[z].timings[n].session);
                  var times = this.slottimings[z].timings[n].schedule.split("-");
                  console.log(times);
                  var start = times[0];
                  console.log(start);
                  var end = times[1];
                  console.log(end);
                  var intervel = this.slots['result']['doctor']['clinics']['consultation_time']
                  this.timeStops[n] = this.getTimeStops(start, end, intervel);
                  // console.log(this.timeStops[n]);
  
                  if (this.slottimings[z].timings[n].session == 'Morning') {
                    this.morningAr = this.timeStops[n];
                  }
                  else if (this.slottimings[z].timings[n].session == 'Afternoon') {
                    this.afternoonAr = this.timeStops[n];
                    
                    console.log(this.afternoonAr);
  
                  }
                  else if (this.slottimings[z].timings[n].session == 'Evening') {
                    this.eveningAr = this.timeStops[n];
                   
                    console.log(this.eveningAr);
                    
                  }
                  else {
  
                  }
                  console.log(this.morningAr); console.log(this.afternoonAr); console.log(this.eveningAr);
                  if (this.morningAr == '' ) {
                    this.morningAr = ['No Slots Available'];
                    
                  }
                  if (this.afternoonAr == '') {
                    this.afternoonAr = ['No Slots Available'];
                  }
                  if (this.eveningAr == '') {
                    this.eveningAr = ['No Slots Available'];
                  }
                }
  
                // }
              }
            }
  
          }
          this.loader.loadingDismiss();
  
          this.bslength = this.bookedSlots.length - 1;
          console.log(this.bslength)
          console.log(this.clickedDate)
          if (this.bslength != null) {
  
            for (var cd = 0; cd < this.bslength; cd++) {
              console.log(this.clickedDate, this.bookedSlots[cd]['date'], this.bookingDate)
              if (this.clickedDate == this.bookedSlots[cd]['date']) {
                this.bs = this.bookedSlots[cd]['time_slot'];
                console.log(this.bs)
  
                if (this.bs != null) {
                  for (var c = 0; c < this.bs.length; c++) {
                    var split = this.bs[c].split(" ");
                    var mrindex = this.morningAr.indexOf(split[0]);
                    console.log(mrindex)
                    if (mrindex > -1) {
                      console.log(this.morningAr.splice(mrindex, 1))
  
                    }
                    var afindex = this.afternoonAr.indexOf(split[0]);
                    if (afindex > -1) {
                      this.afternoonAr.splice(afindex, 1);
  
                    }
                    var evindex = this.eveningAr.indexOf(split[0]);
                    if (evindex > -1) {
                      this.eveningAr.splice(evindex, 1);
  
                    }
                  }
                }
  
              }
  
            }
          }
  
        });
      }); 
    }
 
      // console.log(this.specialMorning)
      // console.log(this.specialMorning.length);
      // console.log(this.specialMorning);
  }

  createSlotss(loadDate,id) {

    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // var todayy = mm + '/' + dd + '/' + yyyy;
    // console.log(todayy);
    // document.write(todayy);
    // console.log(this.slotType);
       var dd = String(new Date().getDate()).padStart(2, '0');
                  var mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = new Date().getFullYear();
                  console.log( yyyy + '-' + mm + '-' + dd);

                  this.todayDate = yyyy + '-' + mm + '-' + dd;
                  console.log(this.todayDate);
                  // console.log(this.loadDate);

    // this.hidee=false;
    console.log(this.morningAr);
    console.log(this.morningAr.length);
    this.morningAr.splice(0, this.morningAr.length);
    console.log(this.morningAr.length);
    console.log(this.morningAr);

    console.log(this.afternoonAr);
    console.log(this.afternoonAr.length);
    this.afternoonAr.splice(0, this.afternoonAr.length);
    console.log(this.afternoonAr.length);
    console.log(this.afternoonAr);

    console.log(this.eveningAr);
    console.log(this.eveningAr.length);
    this.eveningAr.splice(0, this.eveningAr.length);
    console.log(this.eveningAr.length);
    console.log(this.eveningAr);

    console.log(loadDate)
    //  alert(loadDate)
    if (loadDate != null) {
      this.clickedDate = loadDate;
      this.clickedDate = this.clickedDate.substr(0, 10);
      console.log(this.clickedDate+' loaded')
      this.convertedDate = new Date(this.clickedDate);
      console.log(this.todayDate+' Today');
      console.log(this.convertedDate)
      console.log(this.convertedDate.getDay())
    
    }

    if(this.clickedDate == this.todayDate)
    {
        this.checkingInfo = 'EQUAL';
        console.log(this.checkingInfo);
    }
    else{
      this.checkingInfo = 'NEQUAL';
      console.log(this.checkingInfo);
    }
    localStorage.getItem('slotType');
    console.log(localStorage.getItem('slotType'));
    console.log(JSON.parse(localStorage.getItem('data')));
    var impDataa = JSON.parse(localStorage.getItem('data'));
    console.log(impDataa.result.role_id);
  
    if(impDataa.result.role_id == '4')
    {
      this.slotbooking.getslots(localStorage.getItem('slotType'))
      .subscribe((data) => {
        this.slots = data;

        console.log(this.slots)
        this.bookedSlots = this.slots['result']['booked_slots'];
        console.log(this.bookedSlots)

        this.slottimings = this.slots['result']['doctor']['clinics']['working_days'];
        console.log(this.slottimings)
        this.payment = this.slots['result']['doctor']['clinics'];
        this.reg_fee = parseInt(this.payment.registration_fee)
        this.con_fee = parseInt(this.payment.consulting_fee)
        this.totalPrice = this.reg_fee + this.con_fee


        console.log(this.slottimings);
        this.day = this.convertedDate.getDay();
        console.log(this.day);

        for (var z1 = 0; z1 < this.slottimings.length; z1++) {
          // console.log(this.slottimings[z1].dayNum);
          if (this.slottimings[z1].dayNum != 0) {
            this.morningAr = ['No Slots Available'];
            this.afternoonAr = ['No Slots Available'];
            this.eveningAr = ['No Slots Available'];
          }
          for (var z = 0; z < this.slottimings.length; z++) {
            if (loadDate != null) {
              this.clickedDate = loadDate;
              this.clickedDate = this.clickedDate.substr(0, 10);
              //console.log(this.clickedDate)
              this.convertedDate = new Date(this.clickedDate);
              console.log(this.convertedDate)
              console.log(this.convertedDate.getDay())
              if(this.convertedDate.getDay() == 0)
              {var dayCount = 7}
              else
              {var dayCount =this.convertedDate.getDay()}
              
            }
            if (this.slottimings[z].dayNum == dayCount) {
              console.log(this.slottimings[z]);
              console.log(this.slottimings[z].timings);
              // for (var i = 0; i <= this.slottimings[z].timings - 1; i++) {

              // this.length1 = this.slottimings[i].timings;

              for (var n = 0; n < this.slottimings[z].timings.length; n++) {
                // var ar1 = this.length1[n];
                console.log(this.slottimings[z].timings[n].session);
                var times = this.slottimings[z].timings[n].schedule.split("-");
                console.log(times);
                var start = times[0];
                console.log(start);
                var end = times[1];
                console.log(end);
                var intervel = this.slots['result']['doctor']['clinics']['consultation_time']
                this.timeStops[n] = this.getTimeStops(start, end, intervel);
                // console.log(this.timeStops[n]);

                if (this.slottimings[z].timings[n].session == 'Morning') {
                  this.morningAr = this.timeStops[n];
                }
                else if (this.slottimings[z].timings[n].session == 'Afternoon') {
                  this.afternoonAr = this.timeStops[n];
                  
                  console.log(this.afternoonAr);

                }
                else if (this.slottimings[z].timings[n].session == 'Evening') {
                  this.eveningAr = this.timeStops[n];
                 
                  console.log(this.eveningAr);
                  
                }
                else {

                }
                console.log(this.morningAr); console.log(this.afternoonAr); console.log(this.eveningAr);
                if (this.morningAr == '' ) {
                  this.morningAr = ['No Slots Available'];
                  
                }
                if (this.afternoonAr == '') {
                  this.afternoonAr = ['No Slots Available'];
                }
                if (this.eveningAr == '') {
                  this.eveningAr = ['No Slots Available'];
                }
              }

              // }
            }
          }

        }

        // console.log(this.morningAr);
        // console.log(this.afternoonAr);
        // console.log(this.eveningAr);

                  // console.log(this.loadDate);
                  // console.log(this.loadTime);
                  // var dd = String(new Date().getDate()).padStart(2, '0');
                  // var mm = String(new Date().getMonth() + 1).padStart(2, '0'); //January is 0!
                  // var yyyy = new Date().getFullYear();
                  // console.log( yyyy + '-' + mm + '-' + dd);
                  // if(this.loadDate == yyyy + '-' + mm + '-' + dd)
                  // {

                  //   console.log(this.morningAr.length);
                  //   console.log(this.morningAr.length[0]);
                  //   for(var r= 0;this.morningAr.length;r++)
                  //   {
                  //       console.log(this.morningAr[r]);
                  //   }
                  // }

        this.loader.loadingDismiss();

        this.bslength = this.bookedSlots.length - 1;
        console.log(this.bslength)
        console.log(this.clickedDate)
        if (this.bslength != null) {

          for (var cd = 0; cd < this.bslength; cd++) {
            console.log(this.clickedDate, this.bookedSlots[cd]['date'], this.bookingDate)
            if (this.clickedDate == this.bookedSlots[cd]['date']) {
              this.bs = this.bookedSlots[cd]['time_slot'];
              console.log(this.bs)

              if (this.bs != null) {
                for (var c = 0; c < this.bs.length; c++) {
                  var split = this.bs[c].split(" ");
                  var mrindex = this.morningAr.indexOf(split[0]);
                  console.log(mrindex)
                  if (mrindex > -1) {
                    console.log(this.morningAr.splice(mrindex, 1))

                  }
                  var afindex = this.afternoonAr.indexOf(split[0]);
                  if (afindex > -1) {
                    this.afternoonAr.splice(afindex, 1);

                  }
                  var evindex = this.eveningAr.indexOf(split[0]);
                  if (evindex > -1) {
                    this.eveningAr.splice(evindex, 1);

                  }
                }
              }

            }

          }
        }

      });
  
    }
    else{

      this.slotbooking.getNurseList(this.impData.result.role_id,this.impData.result.clinic_id).subscribe((res)=>{
        console.log(res);
        console.log(res['result']['doctor']);
        this.nurseList = res['result']['doctor'];
        this.selectedDoc = id;
        console.log(this.nurseList[0].doctor_id);
        console.log(this.nurseList[0].doctor_name);

        this.slotbooking.getslotss(localStorage.getItem('slotType'),id)
        .subscribe((data) => {
          this.slots = data;
  
          console.log(this.slots)
          this.bookedSlots = this.slots['result']['booked_slots'];
          console.log(this.bookedSlots)
  
          this.slottimings = this.slots['result']['doctor']['clinics']['working_days'];
          console.log(this.slottimings)
          if(this.slottimings == undefined){
            alert('Please Add slots in settings page')
          }
          this.payment = this.slots['result']['doctor']['clinics'];
          this.reg_fee = parseInt(this.payment.registration_fee)
          this.con_fee = parseInt(this.payment.consulting_fee)
          this.totalPrice = this.reg_fee + this.con_fee
  
  
          console.log(this.slottimings);
          this.day = this.convertedDate.getDay();
          console.log(this.day);
  
          for (var z1 = 0; z1 < this.slottimings.length; z1++) {
            // console.log(this.slottimings[z1].dayNum);
            if (this.slottimings[z1].dayNum != 0) {
              this.morningAr = ['No Slots Available'];
              this.afternoonAr = ['No Slots Available'];
              this.eveningAr = ['No Slots Available'];
            }
            for (var z = 0; z < this.slottimings.length; z++) {
              if (loadDate != null) {
                this.clickedDate = loadDate;
                this.clickedDate = this.clickedDate.substr(0, 10);
                //console.log(this.clickedDate)
                this.convertedDate = new Date(this.clickedDate);
                console.log(this.convertedDate)
                console.log(this.convertedDate.getDay())
                if(this.convertedDate.getDay() == 0)
                {var dayCount = 7}
                else
                {var dayCount =this.convertedDate.getDay()}
                
              }
              if (this.slottimings[z].dayNum == dayCount) {
                console.log(this.slottimings[z]);
                console.log(this.slottimings[z].timings);
                // for (var i = 0; i <= this.slottimings[z].timings - 1; i++) {
  
                // this.length1 = this.slottimings[i].timings;
  
                for (var n = 0; n < this.slottimings[z].timings.length; n++) {
                  // var ar1 = this.length1[n];
                  console.log(this.slottimings[z].timings[n].session);
                  var times = this.slottimings[z].timings[n].schedule.split("-");
                  console.log(times);
                  var start = times[0];
                  console.log(start);
                  var end = times[1];
                  console.log(end);
                  var intervel = this.slots['result']['doctor']['clinics']['consultation_time']
                  this.timeStops[n] = this.getTimeStops(start, end, intervel);
                  // console.log(this.timeStops[n]);
  
                  if (this.slottimings[z].timings[n].session == 'Morning') {
                    this.morningAr = this.timeStops[n];
                  }
                  else if (this.slottimings[z].timings[n].session == 'Afternoon') {
                    this.afternoonAr = this.timeStops[n];
                    
                    console.log(this.afternoonAr);
  
                  }
                  else if (this.slottimings[z].timings[n].session == 'Evening') {
                    this.eveningAr = this.timeStops[n];
                   
                    console.log(this.eveningAr);
                    
                  }
                  else {
  
                  }
                  console.log(this.morningAr); console.log(this.afternoonAr); console.log(this.eveningAr);
                  if (this.morningAr == '' ) {
                    this.morningAr = ['No Slots Available'];
                    
                  }
                  if (this.afternoonAr == '') {
                    this.afternoonAr = ['No Slots Available'];
                  }
                  if (this.eveningAr == '') {
                    this.eveningAr = ['No Slots Available'];
                  }
                }
  
                // }
              }
            }
  
          }
          this.loader.loadingDismiss();
  
          this.bslength = this.bookedSlots.length - 1;
          console.log(this.bslength)
          console.log(this.clickedDate)
          if (this.bslength != null) {
  
            for (var cd = 0; cd < this.bslength; cd++) {
              console.log(this.clickedDate, this.bookedSlots[cd]['date'], this.bookingDate)
              if (this.clickedDate == this.bookedSlots[cd]['date']) {
                this.bs = this.bookedSlots[cd]['time_slot'];
                console.log(this.bs)
  
                if (this.bs != null) {
                  for (var c = 0; c < this.bs.length; c++) {
                    var split = this.bs[c].split(" ");
                    var mrindex = this.morningAr.indexOf(split[0]);
                    console.log(mrindex)
                    if (mrindex > -1) {
                      console.log(this.morningAr.splice(mrindex, 1))
  
                    }
                    var afindex = this.afternoonAr.indexOf(split[0]);
                    if (afindex > -1) {
                      this.afternoonAr.splice(afindex, 1);
  
                    }
                    var evindex = this.eveningAr.indexOf(split[0]);
                    if (evindex > -1) {
                      this.eveningAr.splice(evindex, 1);
  
                    }
                  }
                }
  
              }
  
            }
          }
  
        });
      }); 
    }
 
      // console.log(this.specialMorning)
      // console.log(this.specialMorning.length);
      // console.log(this.specialMorning);
  }
  //////////end...............///////////
  //Function To Get Payment 
  getTimeStops(start, end, intervel) {
    console.log(start, end, intervel);
    var startTime = moment(start, 'HH:mm ');
    console.log(startTime);
    var endTime = moment(end, 'HH:mm ');
    console.log(moment(startTime).format('hh:mm '));
    // console.log(endTime.isBefore(startTime))
    console.log(endTime);
    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }
    var timeStops = [];
    while (startTime <= endTime) {

      timeStops.push(moment(startTime).format('HH:mm'));
      startTime.add(intervel, 'minutes');
      // console.log(timeStops);
    }
    return timeStops;
  }
  smsReminder(e){
    console.log(e.detail.checked)
    console.log(e.detail.value)
    if(e.detail.checked == true){
      this.patientInfo.sms = "1"
    }
    else{
      this.patientInfo.sms = "0"
    }
  }
  paymentTotals() {
    // this.reg = this.patientbillInfo.regPrice;
    // this.con = this.patientbillInfo.conPrice;
    console.log(this.patientbillInfo.regPrice);
    console.log(this.patientbillInfo.conPrice);
    if (this.patientbillInfo.regPrice == true) {
      this.checkedReg = this.reg_fee // register price == 50
      console.log(this.checkedReg)
    } else {
      this.checkedReg = 0
    }
    // if(this.patientbillInfo.regPrice == false){
    //   alert('Registration Amount Must be Checked');
    //   this.patientbillInfo.regPrice = true
    // }
    if (this.patientbillInfo.conPrice == true) {
      this.checkedCon = this.con_fee;  // conprice == 500
      console.log(this.checkedCon);
      this.disabled = false;
    } else {
      this.checkedCon = 0
      this.disabled = true;
    }
    if(this.patientbillInfo.discount == undefined){
      this.discount = 0
    }
    else{
      this.discount = this.patientbillInfo.discount; // enterd amount 
    }

    console.log(this.discount)
    // if (this.discount > 100) {
    //   alert("Plsese add below 100")
    //   this.patientbillInfo.discount = 100;
    // }
    this.discount_unit = this.patientbillInfo.discount_unit; //selcted unit 
    console.log(this.discount_unit)

    if (this.discount_unit == "INR") {
      this.totalPrice = (this.checkedCon+this.checkedReg ) - this.discount
      console.log(this.totalPrice)
    }
    else if (this.discount_unit == "%") {
      this.totalPrice = (this.checkedCon+this.checkedReg ) - (( this.checkedCon) * this.discount) / 100
      console.log(this.totalPrice)
    }
    else {
      this.totalPrice = (this.checkedReg + this.checkedCon)
      console.log(this.totalPrice)
    }
    if (this.totalPrice < 0)
     { this.totalPrice = 0;}

     
    if (this.discount_unit == "INR") {
      if (this.discount > this.totalPrice) {
        alert("Please add below "+ (this.checkedReg + this.checkedCon))
        this.patientbillInfo.discount = (this.checkedReg + this.checkedCon);
      }
    }
    else if (this.discount_unit == "%") {
        if (this.discount > 100) {
      alert("Please add below 100")
      this.patientbillInfo.discount = 100;
    }
    }
   else{
     
   }
  }

  changeDoctor(event)
  {
    var month = new Date().getMonth() + 1;
    this.loadDate = new Date().getFullYear() + "-" + (month < 9 ? '0' : '') + month + "-" + (new Date().getDate() < 9 ? '0' : '') + new Date().getDate();
    console.log(this.loadDate);
    this.createSlotss(this.loadDate,event.detail.value);
  }

  SaveBill() {
    //console.log(this.patientbillInfo.regPrice)
    this.reg = this.patientbillInfo.regPrice;
    this.con = this.patientbillInfo.conPrice;
    if (this.patientbillInfo.regPrice == true) {
      this.checkedReg = this.reg_fee
    } else {
      this.checkedReg = "0"
    }

    if (this.patientbillInfo.conPrice == true) {
      this.checkedCon = this.con_fee;
    } else {
      this.checkedCon = "0"
    }
    // if(this.checkedReg)
    // {
    //   this.discount = this.patientbillInfo.discount;
    // }

    this.discount_unit = this.patientbillInfo.discount_unit;
    //this.modeofpayment = this.patientbillInfo.modeofpayment
    this.res = new Array();
    this.res['rePrice'] = this.checkedReg
    this.res['conPrice'] = this.checkedCon;
    this.res['discount'] = this.discount;
    this.res['discount_unit'] = this.discount_unit;
    this.res['modeofpayment'] = this.patientbillInfo.modeofpayment

    this.loader.loadingPresent();
    this.slotbooking.getBill(this.patientbillInfo.regPrice,this.patientbillInfo.conPrice,this.res,this.discount).subscribe((data) => {
      this.billing = data;
      console.log(data);
      console.log(this.billing.result.appointment.appointment_id)
      this.app_id = this.billing.result.appointment.appointment_id;
      if (data['code'] == 200) {
        this.loader.loadingDismiss();
        console.log(this.billing.result.appointment.pdf_file)
        
        this.presentAlert_1();

      }
    })
  }
  /// end.......///

  async presentAlert_1() {
    let alert = this.alertctrl.create({
      cssClass: ['alertLogCss'],
      message: "Appointment Created Successfully",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //console.log('Confirm Cancel: blah');
            this.ngZone.run(() => {
              this.navctrl.navigateRoot('/webpage/' + this.app_id + '/'+this.roleId);
              //   this.router.navigateByUrl('/appointment');
              //formDirective.get(0).resetForm();
              // window.location.reload()
            })
          }
        },
        {
          text: 'Print Invoice',
          role: 'cancel',
          handler: () => {
           
            let url = this.billing.result.appointment.pdf_file
             window.open(url,'_blank')
             this.ngZone.run(() => {
              this.navctrl.navigateRoot('/appointment');
              //   this.router.navigateByUrl('/appointment');
              //formDirective.get(0).resetForm();
              // window.location.reload()
            })
          }
        }
      ]
      // buttons: [
      //   {
      //     text: 'Ok',
      //     handler: () => {
      //       //console.log('Confirm Cancel: blah');
      //       this.ngZone.run(() => {
      //         this.navctrl.navigateRoot('/appointment');
      //         //   this.router.navigateByUrl('/appointment');
      //         //formDirective.get(0).resetForm();
      //         // window.location.reload()
      //       })
      //     }
      //   }
      // ]

    });
    (await alert).present();
  }
  async presentAlert_2() {
    let alert = this.alertctrl.create({
      cssClass: ['alertLogCss'],
      message: "Appointment already exists",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //console.log('Confirm Cancel: blah');
            this.ngZone.run(() => {
              this.navctrl.navigateRoot('/appointment');
              //   this.router.navigateByUrl('/appointment');
              //formDirective.get(0).resetForm();
              // window.location.reload()
            })
          }
        },
       
      ]
    
    });
    (await alert).present();
  }
  async presentAlert(msg) {
    let alert = this.alertctrl.create({
      cssClass: ['alertLogCss'],
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.submitted = false
            this.RegisterForm.reset()
            this.bookSlotForm.reset()
          }
        }
      ],

    });
    (await alert).present();
  }

  async presentModal() {
    const modal = await this.modal.create({
      cssClass: "my-modal",
      component: PaymentmodalPage,
      componentProps: { responce: this.billing }
    });

    return await modal.present();
  }
  dismiss() {
    this.modal.dismiss({
      'dismissed': true
    });
  }
  logout() {
    this.presentAlert_logout();
}

async presentAlert_logout() {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Do you really want to logout ?",
    buttons: [
       {
        text: 'YES',
        handler: () => {
          this.ngZone.run(()=>{
            localStorage.removeItem('data')
            localStorage.removeItem('roleId')
            this.navctrl.navigateRoot('/login');
          })
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
}
