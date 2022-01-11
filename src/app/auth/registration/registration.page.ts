import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-validator';
// import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { SelectService } from '../../service/select.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
// import { MatDialog } from '@angular/material';
import { PasswordStrengthValidator } from 'src/app/password-strength.validators';
// import { AmazingTimePickerService } from 'amazing-time-picker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadComponent } from 'src/app/pages/he/upload/upload.component';
import { SlottimingsComponent } from '../slottimings/slottimings.component';
import { ExaminationService } from 'src/app/service/examination.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TeleslottimingsComponent } from '../teleslottimings/teleslottimings.component';
import { MatStepper } from '@angular/material';
// import { TimingsPage } from './timings/timings.page';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  // export class RegisterPage implements OnInit {
    @ViewChild(SlottimingsComponent,{static: false}) private myChild: SlottimingsComponent;
    @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
    // @ViewChild(SlottimingsComponent) child;
    public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
      'minWidth': 1,
      'canvasWidth': 300,
      'canvasHeight': 100,
      'backgroundColor':"rgb(255,255,255)"
    };
    terms = ''
    validations_form: FormGroup;
    matching_passwords_group : FormGroup;
    responceData:any = [];
    optionsList:any=[];
    optionsDepart:any=[];
    submitted: boolean;
    showSpinner :any  = false;
    loaderToShow: any;
    loading: any;
    timeoutTime: number;
    hide:boolean =true;
    closes:boolean =false;
    hidee:boolean =false;
    iconHide:boolean=true;
    iconHideee:boolean=false;
    day:any=[];
  
    slectedvalue: any;
    addnew: boolean;
    addnewdeprtment: boolean;
    slecteddepvalue: any;
    hideee: boolean = false;
    finalValue: any;
    pConfirm: boolean = false;
    cpValue: any;
    selectedTime: string;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    startTime: boolean = false;
    endTime:boolean = false;

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

    
    backId: string; 
    teleslots:boolean = false;
    walkinslots:boolean = true;
    // @Output() setItemEvent  = new EventEmitter();
    receivedChildMessage: string;
    message: any = '';
    daysMainData=[ {"day":"Monday", "count":"0", "sessions":[{"Morning" :[ {"from_time": this.monMorFromTime, "to_time": this.monMorToTime}]},{"Afternoon":  
    [{"from_time": this.monAftFromTime,"to_time": this.monAftToTime}]},{"Evening":  [ {"from_time": this.monEvngFromTime, "to_time": this.monEvngToTime}]}]},
    {"day":"Tuesday", "count":"1", "sessions":[{"Morning":  [ {"from_time": this.tueMorFromTime, "to_time": this.tueMorToTime,}]},{"Afternoon":  
    [{"from_time":  this.tueAftFromTime,"to_time":  this.tueAftToTime}]},{"Evening":  [ {"from_time":this.tueEvngFromTime, "to_time": this.tueEvngToTime}]}]},
    {"day":"Wednesday", "count":"2",  "sessions":[{"Morning":  [ {"from_time":  this.wedMorFromTime, "to_time":  this.wedMorToTime}]},{"Afternoon":  
    [{"from_time":this.wedAftFromTime,"to_time": this.wedAftToTime}]},{"Evening":  [ {"from_time": this.wedEvngFromTime, "to_time": this.wedEvngToTime}]}]},
    {"day":"Thursday",  "count":"3", "sessions":[{"Morning":  [ {"from_time": this.thurMorFromTime, "to_time": this.thurMorToTime}]},{"Afternoon":  
    [{"from_time": this.thurAftFromTime,"to_time": this.thurAftToTime}]},{"Evening":  [ {"from_time": this.thurEvngFromTime, "to_time": this.thurEvngFromTime}]}]},
    {"day":"Friday",  "count":"4", "sessions":[{"Morning":  [ {"from_time": this.friMorFromTime, "to_time": this.friMorToTime}]},{"Afternoon":  
    [{"from_time": this.friAftFromTime,"to_time": this.friAftToTime}]},{"Evening":  [ {"from_time": this.friEvngFromTime, "to_time": this.friEvngToTime}]}]},
    {"day":"Saturday", "count":"5",  "sessions":[{"Morning":  [ {"from_time":  this.satMorFromTime, "to_time":  this.satMorToTime}]},{"Afternoon":  
    [{"from_time":this.satAftFromTime,"to_time": this.satAftToTime}]},{"Evening":  [ {"from_time": this.satEvngFromTime, "to_time": this.satEvngToTime}]}]},
    {"day":"Sunday", "count":"6",  "sessions":[{"Morning":  [ {"from_time": this.sunMorFromTime, "to_time": this.sunMorToTime}]},{"Afternoon":  
    [{"from_time": this.sunAftFromTime,"to_time": this.sunAftToTime}]},{"Evening":  [ {"from_time": this.sunEvngFromTime, "to_time": this.sunEvngToTime}]}]}]

    teledaysMainData=[ {"day":"Monday", "count":"0","sessions":[{"Morning" :[ {"from_time": this.telemonMorFromTime, "to_time": this.telemonMorToTime}]},{"Afternoon":  
    [{"from_time": this.telemonAftFromTime,"to_time": this.telemonAftToTime}]},{"Evening":  [ {"from_time": this.telemonEvngFromTime, "to_time": this.telemonEvngToTime}]}]},
    {"day":"Tuesday", "count":"1","sessions":[{"Morning":  [ {"from_time": this.teletueMorFromTime, "to_time": this.teletueMorToTime,}]},{"Afternoon":  
    [{"from_time":  this.teletueAftFromTime,"to_time":  this.teletueAftToTime}]},{"Evening":  [ {"from_time":this.teletueEvngFromTime, "to_time": this.teletueEvngToTime}]}]},
    {"day":"Wednesday", "count":"2","sessions":[{"Morning":  [ {"from_time":  this.telewedMorFromTime, "to_time":  this.telewedMorToTime}]},{"Afternoon":  
    [{"from_time":this.telewedAftFromTime,"to_time": this.telewedAftToTime}]},{"Evening":  [ {"from_time": this.telewedEvngFromTime, "to_time": this.telewedEvngToTime}]}]},
    {"day":"Thursday","count":"3", "sessions":[{"Morning":  [ {"from_time": this.telethurMorFromTime, "to_time": this.telethurMorToTime}]},{"Afternoon":  
    [{"from_time": this.telethurAftFromTime,"to_time": this.telethurAftToTime}]},{"Evening":  [ {"from_time": this.telethurEvngFromTime, "to_time": this.telethurEvngFromTime}]}]},
    {"day":"Friday", "count":"4","sessions":[{"Morning":  [ {"from_time": this.telefriMorFromTime, "to_time": this.telefriMorToTime}]},{"Afternoon":  
    [{"from_time": this.telefriAftFromTime,"to_time": this.telefriAftToTime}]},{"Evening":  [ {"from_time": this.telefriEvngFromTime, "to_time": this.telefriEvngToTime}]}]},
    {"day":"Saturday","count":"5", "sessions":[{"Morning":  [ {"from_time":  this.telesatMorFromTime, "to_time":  this.telesatMorToTime}]},{"Afternoon":  
    [{"from_time":this.telesatAftFromTime,"to_time": this.telesatAftToTime}]},{"Evening":  [ {"from_time": this.telesatEvngFromTime, "to_time": this.telesatEvngToTime}]}]},
    {"day":"Sunday", "count":"6","sessions":[{"Morning":  [ {"from_time": this.telesunMorFromTime, "to_time": this.telesunMorToTime}]},{"Afternoon":  
    [{"from_time": this.telesunAftFromTime,"to_time": this.telesunAftToTime}]},{"Evening":  [ {"from_time": this.telesunEvngFromTime, "to_time": this.telesunEvngToTime}]}]}]

  consultation_fees: any;
  consult: boolean;
  schedulingWindow: any;
  ConsultationSchedulingWindow: any;
  firstRegistration: any;
  reviewLink: any;
  checkWhether: any;
  teleconsultation_fees: any;
  teleconsult: boolean;
  teleConsultationSchedulingWindow: any;
  teleschedulingWindow: any;
  more: boolean;
  walkinSlotsData: string;
  days: any=[];
  afternoondays: any=[];
  eveningdays: any=[];
  morningdays: any=[];
  teleSlotsData: string;
  telemorningdays: any=[];
  teleafternoondays: any=[];
  teleeveningdays: any=[];
  clinicIdAfterRegister: any;
  doctorIdAfterRegister: any;
  // numbers=['1','2','3'];
  languages = [
    "English", "Hindi", "Telugu", "Kannada", "Malayalam", "Tamil", "Urdu", "Sindhi", "Panjabi", "Gujarati", "Marathi", "Bengali"

 ];
  Enable: boolean = false;
  Load: boolean = false;
  addneww: boolean = false;
  selectedLanguages: any;
  sign: string;
  addclinicname: any;
  addclinicaddress: any;
  moreClinics: boolean = false;
  selectedvalue: any;

    constructor(private examination:ExaminationService,private _dialog:MatDialog,public navCtrl:NavController,private  alrtctl:AlertController,public formBuilder: FormBuilder,private auth:AuthService,public navCtl:NavController,public select:SelectService, private alertctrl:AlertController, private router:Router,private loadingctrl:LoadingController , public loader:LoaderService,public zone:NgZone) {
      this.dropDown();
      
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
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

   clear(): void {
    this.signaturePad.clear();
    // this.signature = '';
  }
  
    onKeyPress(event) {
      if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46 ) {
        
        return true 
      }
      else {
          return false
      }
  }

  backWalk()
  {
    this.teleslots =false;
    this.walkinslots =true;
  }
  
  
  @ViewChild('stepper', { static: true }) myStepper: MatStepper;

    ngOnInit() {
      // console.log(this.daysMainData);

      // this.firstFormGroup = this.formBuilder.group({
      //   firstCtrl: ['', Validators.required]
      // });
      // this.secondFormGroup = this.formBuilder.group({
      //   secondCtrl: ['', Validators.required]
      // });

      this.examination.roleIdd.subscribe(user =>{
        console.log(user);
       });

       this.matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
        //  Validators.minLength(5),
         // Validators.maxLength(8),
          Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$')
          
        ])),
        confirm_password: new FormControl('',)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      });
  
      this.validations_form = this.formBuilder.group({
        first_name: ['',Validators.required],
        last_name: [''],
        registration_code:['',Validators.required],
        password:[''],
        confirm_password:[''],
        email: ['', Validators.compose([
            // Validators.required,
            // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])],
        matching_passwords: this.matching_passwords_group,
         mobile: ['', Validators.compose([
            // Validators.pattern('[6-9]{1}[0-9]{9}'),
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.required
          ])],
          qualification: [''],
          clinic_id: ['',Validators.required],
          department_id: [''],
          department_name:[''],
          clinic_name:[''],
          clinic_location:['']
          
        });
    }

    // goBack(stepper: MatStepper) {
    //   stepper.previous();
    // }
    // goForward(stepper: MatStepper) {
    //   stepper.next();
    // }

    
    getMessage(message: string) {
      this.receivedChildMessage = message;
      console.log(message);
    }

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';
  
    passwordType_c: string = 'password';
    passwordIcon_c: string = 'eye-off';
    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    hideShowPassword_c() {
      this.passwordType_c = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon_c = this.passwordIcon === 'eyadd(e-off' ? 'eye' : 'eye-off';
  }
    get f() { return this.validations_form.controls; }
  
    validation_messages = {
      
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'pattern', message: 'Minimum 8 Characters with Atleast One Capital Letter,One Number,One Special Character' },
      ],
      'confirm_password': [
        { type: 'required', message: 'Confirm password is required.' }
      ],
      'matching_passwords': [
        { type: 'areEqual', message: 'Password mismatch.' }
      ]
       
    };
    public inputValidator(event: any) {
      //console.log(event.target.value);
      const pattern = /^[a-zA-Z0-9]*$/;   
      //let inputChar = String.fromCharCode(event.charCode)
      // if (!pattern.test(event.target.value)) {
      //   event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      //   // invalid character, prevent input
  
      // }
    }
     numberOnly(event): boolean {
      //  console.log(event.detail.value);
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }

    fees(e)
    {
      // console.log(e.target.value);
      this.consultation_fees = e.target.value;
      console.log(this.consultation_fees);
      if(this.consultation_fees == undefined || this.consultation_fees == '')
      {
        this.consult=true;
      }else{
        this.consult=false;
      }
    }

    telefees(e)
    {
      this.teleconsultation_fees = e.target.value;
      console.log(this.teleconsultation_fees);
      if(this.teleconsultation_fees == undefined || this.teleconsultation_fees == '')
      {
        this.teleconsult=true;
      }else{
        this.teleconsult=false;
      }
    }

    next(stepper)
    {
      console.log();
      stepper.next();
    }

    telegetSchedulingWindow(e)
    {
      console.log(e.target.value);
      this.teleschedulingWindow = e.target.value;
    }

    telegetConsultationSchedulingWindow(e)
    {
      console.log(e.target.value);
      this.teleConsultationSchedulingWindow = e.target.value;
    }

    getSchedulingWindow(e)
    {
      console.log(e.target.value);
      this.schedulingWindow = e.target.value;
    }

    getConsultationSchedulingWindow(e)
    {
      console.log(e.target.value);
      this.ConsultationSchedulingWindow = e.target.value;
    }
  
    telenextPopUp(stepper)
    {
      this.myStepper.next();
    }

    goBack(stepper: MatStepper){
      stepper.previous();
  }
  
  goForward(stepper: MatStepper){
      stepper.next();
  }
    // open() {
    //   const amazingTimePicker = this.atp.open();
    //   amazingTimePicker.afterClose().subscribe(time => {
    //     console.log(time);
    //   });
    // }
  
  //   open() {
  //     const amazingTimePicker = this.atp.open({
  //         time:  this.selectedTime,
  //         theme: 'dark',
  //         arrowStyle: {
  //             background: 'red',
  //             color: 'white'
  //         }
  //     });
  //     amazingTimePicker.afterClose().subscribe(time => {
  //         this.selectedTime = time;
  //     });
  // }
  // }
  add(a,b)
  {
    console.log(a,b);
    // this.day = [this.monMorFromTime, this.tueMorFromTime, this.wedMorFromTime,
    //         this.thurMorFromTime,this.friMorFromTime, this.satMorFromTime,this.sunMorFromTime];

         this.examination.roleId(this.daysMainData);
        //  this.examination.roleIdd.subscribe(data => {console.log(data);
        //  this.backId=data});

    const dialog_ref = this._dialog.open(SlottimingsComponent,{
      panelClass: ['myapp-no-padding-dialog'],
      data:{
        clickedDay:a,
        // day:this.day,
        session:b,
        working:this.daysMainData
      }
    })
    dialog_ref.afterClosed().subscribe(result => {
      this.nextPopUpp();
    });
  }

  teleadd(a,b)
  {
    console.log(a,b);
    // this.day = [this.monMorFromTime, this.tueMorFromTime, this.wedMorFromTime,
    //         this.thurMorFromTime,this.friMorFromTime, this.satMorFromTime,this.sunMorFromTime];

         this.examination.countData(this.teledaysMainData);
        //  this.examination.roleIdd.subscribe(data => {console.log(data);
        //  this.backId=data});

    const dialog_ref = this._dialog.open(TeleslottimingsComponent,{
      panelClass: ['myapp-no-padding-dialog'],
      data:{
        clickedDay:a,
        // day:this.day,
        session:b
      }
    })
    dialog_ref.afterClosed().subscribe(result => {
      this.nextPopUppp();
    });
  }


  nextPopUpp()
  {
    this.examination.roleIdd.subscribe(user =>{
      console.log(user);
     });
  }



  
  nextPopUppp()
  {
    this.examination.count.subscribe(user =>{
      console.log(user);
     });
  }


  nextPopUp(stepper: MatStepper)
  {
     //console.log(stepper);
    //  stepper.next();
  //   console.log(this.consultation_fees);
    if(this.consultation_fees == undefined || this.consultation_fees == '')
    {
      this.consult=true;
    }else{
      this.consult=false;
       
    if(this.checkWhether == true){
      this.teleslots = true;
      this.walkinslots = false;
    }else
    {
      const dialog_ref = this._dialog.open(SlottimingsComponent,{
        panelClass: ['myapp-no-padding-dialog'],
        data:{
          day:'Tele Consultant',
          session:'Tele Consultant'
        }
      })
  
      dialog_ref.afterClosed().subscribe(result => {
        console.log(result);
        this.checkWhether = result;
        console.log(this.checkWhether);
        if(result == true)
        {
          this.teleslots = true;
          this.walkinslots = false;
          // stepper.next();
        }else{
          this.myStepper.next();
        }
        // this.nextPopUp();
      });
    }
  }
    this.examination.roleIdd.subscribe(user =>{
      console.log(user);
     });

  }

  review(e)
  {
    // console.log(e);
    console.log(e.target.value);
    this.reviewLink = e.target.value;
  }
  checkMobile(terms){
    console.log(terms.length)
    this.Enable = true
    if(terms.length === 10){
      this.auth.checkingMobile(terms).subscribe((res) =>{
        console.log(res)
        if(res['code'] == 201){
          this.Enable = false
          this.presentAlert2(res.message)
        }
        else{
          this.Enable = false
          // this.presentAlert2(res.message)
        }
      })
    }
    if(terms.length == 0){
      this.Enable = false
    }
  }
  checkEmail(term){
    console.log(term)
    this.Load = true
      this.auth.checkingEmail(term).subscribe((res) =>{
        console.log(res)
        if(res['code'] =='200'){
          this.Load = false
          this.presentAlert3(res.message)
        }
        else{
          this.Load = false
          this.presentAlert3(res.message)
        }
      })
    if(term.length == 0){
      this.Load = false
    }
  }

 

 

  moreClincs(e)
  {
    this.moreClinics = e.checked;
    console.log(e.checked);
    if(e.checked == true)
    {
      this.more =true;
    }else
    {
      this.more =false;
      this.addnew= false;
    }

    // const dialog_ref = this._dialog.open(TeleslottimingsComponent,{
    //   panelClass: ['myapp-no-padding-dialog'],
    //   data:{
    //     clickedDay:'',
    //     // day:this.day,
    //     session:'More Clinics'
    //   }
    // })
  }
  
  async presentAlertt() {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: "Add Slot Timings Here",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Save',
          handler: () => {
            // this.zone.run(()=>{
            //   localStorage.removeItem('data')
            //   localStorage.removeItem('roleId')
            //   this.navCtrl.navigateRoot('/login');
            //   localStorage.removeItem('appointments');
            // })
          }
        }
      ],
      
    });
    (await alert).present();
  }
  async presentAlert2(msg) {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          this.validations_form.get('mobile').setValue('')
          }
        }
      ],
      
    });
    (await alert).present();
  }
  async presentAlert3(msg) {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: msg,
      buttons: [
        {
          text: 'Cancel',
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
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  nextTimings(stepper)
  {
    stepper.next();
  }
    
  signUp(data,stepper)
  {
    console.log(data);
    this.firstRegistration = data;
    console.log(data.password==''?'Apple':'Banana');
    if(data.password =='')
    {
      this.hidee =  true;
    }
    else{
      this.hidee = false;
    }
    if(data.confirm_password =='')
    {
      this.hideee =  true;
    }
    else{
      this.hideee = false;
    }
  
    // console.log(this.finalValue);
    // console.log(this.cpValue);
  
  
  
    // this.validations_form.get('password').value;
    // console.log(this.validations_form.get('password').value);
    // console.log(data.password,data.confirm_password);
    // if(data.password == null)
    // {
    //     this.hidee = true;
    // }else{
    //   this.hidee= false;
    // }
    // if(data.confirm_password == null)
    // {
    //     this.hidee = true;
    // }else{
    //   this.hidee= false;
    // }
    this.submitted = true;
    if(data.first_name && data.registration_code && data.email && data.mobile ){
    //  stepper.next();
        // this.loader.loadingPresent();
        // this.auth.postData(this.firstRegistration).subscribe((data)=>
  
        //   {
            
        //     if(data["code"]=="200")
        //     {
        //       this.responceData = data;
        //       console.log(this.responceData)
        //       this.loader.loadingDismiss();
        //       this.presentAlert("Registered successfully Login with Email or Mobile");
              
        //     }else{
        //       this.loader.loadingDismiss();
        //       return  this.presentAlert(data["message"]);  
              
        //     }
        //   });
   
      
  }else{
  
  }
  
  
  // var n = this.finalValue.localeCompare(this.cpValue);
  // console.log(n);
  
  // if(n != 0)
  // {
  //   this.presentAlert("Password Pattern Not Matched");
  // }
  
  
  
  
  }
  
  
  // async signUp(data) {
  
  //   if(this.submitted = true){
  //     return;
  //   }
  //   const loader = await this.loadingctrl.create({
  //     message: 'Loading...',
  //   });
  //   loader.present().then(() => {               // show loader
  //     this.auth.postData(data).subscribe(res => {
  //        if(res["code"]=="200"){
  //         this.responceData = res;
  //         loader.dismiss();  
  //         this.presentAlert("Thank You for succesful Registration with Us"); 
  //       } else{
  //         return  this.presentAlert(res["message"]); 
  //       }
  //     },
  // );
  
  //                           // dismiss loader
  //   });
  // }
  
  dropDown() {
    this.select.dropDown().subscribe((data: any) => {
      // console.log(data["result"]["clinics"]);
       this.optionsList = data["result"]["clinics"];
      // console.log(this.optionsList);
       //console.log(this.slectedvalue);
       this.optionsDepart = data["result"]["departments"];
   
    });
  }
  
  
  async presentAlert(msg) {
    let alert = this.alertctrl.create({
      cssClass:['alertLogCss'],
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.zone.run(()=>{
              this.navCtl.navigateRoot('/login');
            })
           
            // this.navCtl.navigateRoot(LoginPage, {}, {animate: true, direction: 'forward'});
          }
        }
      ],
      
    });
    (await alert).present();
  }
  
  
  checkClincValue(event)
  { 
    console.log(event.detail.value)
    this.slectedvalue = event.detail.value;
    //console.log(this.slectedvalue);
    if(this.slectedvalue == 0)
    {
     return this.addnew = true;
    }else{
      this.addnew = false;
    }
  }

  selectClinic(event)
  {
    console.log(event.detail.value)
    this.selectedvalue = event.detail.value;
    if(this.selectedvalue == 0)
    {
     return this.addneww = true;
    }else{
      this.addneww = false;
    }
  }

  newClinic(event)
  {
    console.log(event.detail.value)
  }
  
  checkDeprtValue(event){
    this.slecteddepvalue = event.detail.value;
   // console.log(event.detail.value);
    if(this.slecteddepvalue == 0)
    {
     return this.addnewdeprtment = true;
    }else{
      this.addnewdeprtment = false;
    }
  }
  
  checkPassword(e)
  {
    this.hidee=false;
    this.closes =true;
    // console.log(e.target.value);
    this.finalValue= e.target.value;
    var format =/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(format.test(e.target.value));
    if(e.target.value.length >= 8 && format.test(e.target.value) == true)
    {
      this.hide =false;
      this.closes =false;
      // e.target.classList.remove('ion-invalid');
      // var element = document.getElementById("myDIV") as HTMLElement;
      // element.classList.add("mystyle");
      // e.target.classList.remove('ion-invalid');
    }
    else{
      this.hide = true;
      // var element = document.getElementById("myDIV") as HTMLElement;
      // element.classList.remove("mystyle");
      // e.target.classList.add('ion-invalid');
    }
    
  }
  
  checkCPassword(e)
  {
    this.hideee=false;
    this.pConfirm = true;
    this.cpValue=e.target.value;
      // console.log(e.target.value);
      // console.log(this.finalValue);
      var n = e.target.value.localeCompare(this.finalValue);
      console.log(n);
      if(n == 0)
      {
        this.pConfirm = false;
      }
      else{
        this.pConfirm = true;
      }
  }

  getLanguages(e)
  {
    console.log(e.target.value);
    this.selectedLanguages = e.target.value;
  }

  additionalClinic(e)
  {
    console.log(e.target.value);
  }

  addclinicName(e)
  {
    this.addclinicname = e.target.value;
    console.log(e.target.value);
  }

  addclinicAddress(e)
  {
    this.addclinicaddress = e.target.value;
    console.log(e.target.value);
  }

  // selectClinic(e)
  // {
  //   console.log(e.detail.value)
  //   this.selectedvalue = e.detail.value;
  //   console.log(this.selectedvalue);
  //   if(this.selectedvalue == 0)
  //   {
  //    return this.addneww = true;
  //   }else{
  //     this.addneww = false;
  //   }
  // }

  finalSubmit()
  {
    this.loader.loadingPresent();
    this.examination.roleIdd.subscribe(user =>{
      this.walkinSlotsData = user;
      for(var i=0;i<this.walkinSlotsData.length;i++)
      {
        for(var j=0;j<this.walkinSlotsData[i]['sessions'].length;j++){
          if(this.walkinSlotsData[i]['sessions'][j]['Morning'] != undefined)
          {
            var a =this.walkinSlotsData[i]['sessions'][j]['Morning'][0].from_time;
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
          else if(this.walkinSlotsData[i]['sessions'][j]['Afternoon'] != undefined)
          {
            var b =this.walkinSlotsData[i]['sessions'][j]['Afternoon'][0].from_time;
            if(b.substr(b.length-3) != 'day')
            {
              var filterAfternoonDays= this.afternoondays.filter((x)=>x === i+1);
              if(filterAfternoonDays == ''){
              this.afternoondays.push(i+1);
              }
            }
          }else if(this.walkinSlotsData[i]['sessions'][j]['Evening'] != undefined){
            var c =this.walkinSlotsData[i]['sessions'][j]['Evening'][0].from_time;
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
     });
     this.examination.count.subscribe(tele =>{
      console.log(tele);
      this.teleSlotsData = tele;
      for(var i=0;i<this.teleSlotsData.length;i++)
      {
        for(var j=0;j<this.teleSlotsData[i]['sessions'].length;j++){
          if(this.teleSlotsData[i]['sessions'][j]['Morning'] != undefined)
          {
            var a =this.teleSlotsData[i]['sessions'][j]['Morning'][0].from_time;
            if(a.substr(a.length-3) != 'day')
            {
              var filterTeleMorningDays= this.telemorningdays.filter((x)=>x === i+1);
              if(filterTeleMorningDays == ''){
              this.telemorningdays.push(i+1);
              }
            }
          }
          else if(this.teleSlotsData[i]['sessions'][j]['Afternoon'] != undefined)
          {
            var b =this.teleSlotsData[i]['sessions'][j]['Afternoon'][0].from_time;
            if(b.substr(b.length-3) != 'day')
            {
              var filterTeleAfternoonDays= this.teleafternoondays.filter((x)=>x === i+1);
              if(filterTeleAfternoonDays == ''){
              this.teleafternoondays.push(i+1);
              }
            }
          }else if(this.teleSlotsData[i]['sessions'][j]['Evening'] != undefined){
            var c =this.teleSlotsData[i]['sessions'][j]['Evening'][0].from_time;
            if(c.substr(c.length-3) != 'day')
            {
              var filterTeleEveningDays= this.teleeveningdays.filter((x)=>x === i+1);
              if(filterTeleEveningDays == ''){
              this.teleeveningdays.push(i+1);
              }
            }
          }else{

          }
        }
      }
     });
      console.log(this.firstRegistration);
      // console.log(this.consultation_fees);
      console.log(this.schedulingWindow);
      console.log(this.ConsultationSchedulingWindow);
      console.log(this.reviewLink);
      console.log(this.consultation_fees);
      console.log(this.teleconsultation_fees);
      console.log(this.morningdays);
      console.log(this.afternoondays);
      console.log(this.eveningdays);
      console.log(this.telemorningdays);
      console.log(this.teleafternoondays);
      console.log(this.teleeveningdays);
      console.log(this.selectedLanguages);
      console.log(this.sign);
      console.log(this.sign.replace("data:image/png;base64,", ""))
      console.log(this.addclinicname);
      console.log(this.addclinicaddress);
      console.log(this.moreClinics);
      console.log(this.selectedvalue);
      console.log(this.slectedvalue);

      // console.log(this.selectedLanguages);

  //     this.auth.postDataa(this.firstRegistration,this.reviewLink).subscribe((data)=>
  //     {
  //       if(data["code"]=="200")
  //       {
  //         this.responceData = data;
  //         console.log(this.responceData);
  //         console.log(this.responceData['result']);
  //         console.log(this.responceData['result']['docDetails'].clinic_id);
  //         console.log(this.responceData['result']['docDetails'].doctor_id);
  //         this.clinicIdAfterRegister = this.responceData['result']['docDetails'].clinic_id;
  //         this.doctorIdAfterRegister = this.responceData['result']['docDetails'].doctor_id;
  //         this.auth.postwalkinSlots(this.walkinSlotsData,this.morningdays,
  //         this.afternoondays,this.eveningdays,this.schedulingWindow,
  //         this.ConsultationSchedulingWindow,this.consultation_fees,
  //         this.clinicIdAfterRegister,this.doctorIdAfterRegister).subscribe((res)=>
  //         {
  //           console.log(res);
  //         });
  //         this.auth.postteleSlots(this.teleSlotsData,this.telemorningdays,
  //           this.teleafternoondays,this.teleeveningdays,this.teleschedulingWindow,
  //           this.teleConsultationSchedulingWindow,this.teleconsultation_fees,
  //           this.clinicIdAfterRegister,this.doctorIdAfterRegister).subscribe((res)=>
  //           {
  //             console.log(res);
  //           });

  //           this.auth.addSignature(this.doctorIdAfterRegister,this.sign).subscribe((res)=>
  //           {
  //             console.log(res);
  //           });

  //           this.auth.languages(this.doctorIdAfterRegister,this.selectedLanguages).subscribe((res)=>
  //           {
  //             console.log(res);
  //           });

  //           if(this.moreClinics == true)
  //           {
  //             if(this.selectedvalue == 0)
  //             {
  //               this.auth.newClinics(this.doctorIdAfterRegister,this.addclinicname,this.addclinicaddress).subscribe((res)=>
  //               {
  //                 console.log(res);
  //               });
  //             }
  //             else{
  //               this.auth.addSecondaryClinic(this.doctorIdAfterRegister,this.selectedvalue).subscribe((res)=>
  //               {
  //                 console.log(res);
  //               });
  //             }
  //           }
  //         this.loader.loadingDismiss();
  //         this.presentAlert("Registered successfully Login with Email or Mobile");
          
  //       }
  //       else{
  //         this.loader.loadingDismiss();
  //         return  this.presentAlert(data["message"]);  
          
  //       }
  //     });
    
   }
   
  }