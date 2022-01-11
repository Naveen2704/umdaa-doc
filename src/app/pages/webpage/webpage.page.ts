import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ExaminationService } from '../../service/examination.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SlotbookingService } from 'src/app/service/slotbooking.service';
import { DialogBodyComponentComponent } from './dialog-body-component/dialog-body-component.component';
import { UserService } from 'src/app/service/user.service';
import { LoadingController, AlertController, NavController, Platform } from '@ionic/angular';
import { ElementRef, ViewChild} from '@angular/core';
import { AppointmentPageModule } from '../appointment/appointment.module';
import { AppointmentPage } from '../appointment/appointment.page';
import { ExpertComponent } from './expert/expert.component';
import { DOCUMENT } from '@angular/common';
import { WindowState } from '@progress/kendo-angular-dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { LoaderService } from 'src/app/service/loader.service';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PatientprofilePage } from '../patientprofile/patientprofile.page';
import { ReviewComponent } from './review/review.component';

declare var QB: any;
declare var Peer:any;


@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.page.html',
  styleUrls: ['./webpage.page.scss'],
  
})
export class WebpagePage implements OnInit {

  @ViewChild('videoPlayer',{static: true}) videoPlayer: ElementRef;
  @ViewChild('receivingPlayer',{static:true}) receivingPlayer: ElementRef;
  @ViewChild('audioOption',{static:false}) audioPlayerRef: ElementRef;
  public windowState: WindowState = 'maximized';
  public opened: boolean = false;
  public openedd: boolean = false;

  public height=500;
  public width=500;
  patientMobile: any;
  patientDeta: any;
  slot_type: any;
  volume: boolean=true;
  volumee:boolean = false;
  showcam: boolean=true;
  offcam: boolean;
  showcame: boolean;
  initiateStart:boolean = true;
  defaultHide:boolean = false;
  showOnly:boolean = false;
  // startvideo: boolean;
  // startvideoo: boolean;
  currentState = 'final';
  endCount: number;
  v_number: any;
  details: any;
  opentokShow: boolean;
  videoUrl: string;
  urlSafee: SafeResourceUrl;
  nowshow: boolean;
  isCardExpanded: boolean=false;
  isLoading: boolean=false;
 

  // opened:boolean = false;
  openClose(isOpened: boolean) {
    this.opened = isOpened;
    var vid = ElementRef
    // this.currentSession.stop({});
    // this.stopCall();
  }



 

  public onStateChange(e) {
    console.log(e);
     if (e != 'default') {
      //  this.windowState = 'minimized';
      this.height=118;
        this.width=134;
    
    //  this.startVideo=false;
      // this.startvideoo=true;
    }else
    {    
      // this.startVideo=true;
      this.height = 118;
      this.width = 95;
      //  this.startVideo=true;
    }

  }
  // isCardExpanded = false;
  expand() {
    // this.opened = true;
    this.isCardExpanded = !this.isCardExpanded;
  }
  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  // fasak:any = 108196309;
  // userId: any = 106229296;
  // calleeId: any=localStorage.getItem('calleId');
  data:string='widnow';
  userId:any= 106229296;
  calleeId:any = localStorage.getItem('calleId');
  CREDENTIALS = {
    appId: 81237,
    authKey: 'CT3YksQRwhkwfMN',
    authSecret: 'gyq2HehvUxrwmeG'
  };


  public currentSession: any = undefined;
  public calling: boolean = false;
 
  stop:boolean =false;
  streamabc:any;


    public myImgUrl : string ="assets/icon/profile.png";
    id: any;
    mainData: any;
    innerheading: any;
    form_id: any;
    get_form_id: any;
    innerSubHeading: any;
    innerSubHeadingFieldName: any;
    array123: any = [];
    dependencyList: any;
    dependencyFieldId: any;
    getDropdownId: any;
    getCollapseHeadingId: any;
    getCollapseFormId: any;
    finalList: any;
    arrayObj: any;
    arrayObject: any;
    internalDependencyList: any;
    radioSelected:string = 'checked';
    flag: any;
    orderForm: FormGroup;
    items: FormArray;
    fg: FormGroup;
    profileForm: FormGroup;
    heading: any;
    panelOpenState = false;
    chosenItem:any = 'yes';
    hide:boolean =false;
    hideButton:boolean = false;
    number: any;
    checked: any =[];
    checkedd: any;
    settle: any[];
    twentynine: any;
    impValue: any;
    fieldOption: any=[];
    selectedEntry: any;
    radioSelect:any;
    radioSel: any;
    orders: any=[];
    orderss: any;
    optionsss:any =[];
    sat:boolean = false;
    form:FormGroup;
    selectedAnswers:any =[{}];
    toDos: any={};
    selectedCheckbox:any={};
    checkcheck: any;
    dd: any=[];
    showBlock:boolean = false;
    field_id: any;
    ddd: any = [];
    finalArray: any = [];
    checkEmpty: any = [];
    wed: any = [];
    fi: any = [];
     result:any=[];
    fixed: any=[];
    dddd: any = [];
    count: any;
    countNumber: any;
    add: any = [];
    info: string;
    label: any;
    arrayObjj: any = [];
    fillArray: any = [];
    arrayObjjj: any = [];
    finalSubmit: any = [];
    removeformId: any;
    main_section: any = [];
    arrayOb: any=[];
    video:boolean = false;
    videoInfo:any;
    checkPatientData:any;
  // urlData: string;
  // url:string = "http://13.234.116.111/testse/#/Se/432";
  localCallId = 'agora_local';
  remoteCalls: string[] = [];

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;

  url: string;
  urlSafe: SafeResourceUrl;
  id1: any;
  patientDetails: any=[];
  image_link: any;
  headerObj: any;
  status: any;
  // calleeId: any;
    // router: any;
  loading;
  @ViewChild(AppointmentPage,{static:true}) alert: AppointmentPage;
  // @ViewChild('videoPlayer') localvideoplayer: ElementRef;
    constructor(@Inject(DOCUMENT) document,public loadingController: LoadingController,private ngxAgoraService: NgxAgoraService,public platform: Platform,private patientservice:UserService,private router: Router, private sanitizer: DomSanitizer,
      private route: ActivatedRoute,public dialog: MatDialog,private notification:NotificationService,private loader:LoaderService,
      private se:ExaminationService,private formBuilder: FormBuilder,private finishservice:SlotbookingService,private loadingCtrl:LoadingController,private  alrtctl:AlertController,private zone:NgZone, public navCtrl:NavController) 
      { 
        this.uid = Math.floor(Math.random() * 100);
        // QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret);
      }

    ngOnInit() {
      console.log(this.opened)
  
      this.connect();
      console.log(QB);
      console.log(this.alert)
      this.loader.loadingPresent();
      this.route.params.subscribe(res => {
        this.id =  res['id'];
         console.log(this.id);
         this.getPatientInfo(this.id)
         this.patientservice.GetPatient(this.id).subscribe(data =>{
          console.log(data.result['parameters'][0])
          this.details = data.result['parameters'][0]
          console.log(data.result['parameters'][0].mobile);
          if(data.result['parameters'][0].rmp_status != '1'){
            localStorage.setItem('videocallNumber',data.result['parameters'][0].mobile);
          }else{
            localStorage.setItem('videocallNumber',data.result['parameters'][0].rmp_number);
          }
      
          this.patientDeta= data.result['parameters'][0].mobile;
          this.slot_type= data.result['parameters'][0].slot_type;
          console.log(this.patientDeta);

          this.headerObj = data.result['parameters'][0];  
          console.log(this.headerObj)
          console.log(this.headerObj.doctor_name);
          console.log(this.headerObj.patient_name);
          localStorage.setItem('doctor_name',this.headerObj.doctor_name);
          localStorage.setItem('patient_name',this.headerObj.patient_name);
          if(this.headerObj.rmp_status != 1){
            this.v_number = this.headerObj.mobile;
          }
          else{
            this.v_number = this.headerObj.rmp_number;
          }
          console.log(this.headerObj.rmp_status)
          this.status = this.headerObj.status;

         this.id1 =  res['id1'];
         console.log(this.id1);
         if(this.headerObj.rmp_status == 1){
          // this.url  = 'patient/#/Summary/'+this.id+'/'+'1';
          // this.url  = 'https://prodoc.devumdaa.in/patient/#/Summary/'+this.id+'/'+'1';
        //  this.url  = 'https://doctor.umdaa.co/patient/#/Summary/'+this.id+'/'+'1';
        //  this.url  = 'http://localhost:4200/#/Summary/'+this.id+'/'+'1';
         this.url  = 'https://doctor.umdaa.co/patient/#/Summary/'+this.id+'/'+'1';
       }
       else if(this.headerObj.slot_type == "video call" && this.id1 == '6'){
        // this.url  = 'patient/#/Vitals/'+this.id+'/'+'2';
        //  this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+'2';
        //  this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'2';
        //  this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+'2' 
         this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'2';
       }
       else if(this.headerObj.slot_type == "video call" && this.id1 == '4'){
         // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'3';
        //  this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+'3';
        // this.url  = 'patient/#/Vitals/'+this.id+'/'+'3';
        //  this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+'3' 
         this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'3';
       }
       else{
        // this.url  = 'https://prodoc.devumdaa.in/patient/#/version2/'+this.id+'/'+this.id1+'/'+false;
        // this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+this.id1;
        // this.url  = 'patient/#/Vitals/'+this.id+'/'+this.id1;
        //  this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+this.id1;
         this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+this.id1;
          //  this.url  = 'https://doctor.umdaa.co/patient/#/version2/'+this.id+'/'+this.id1+'/'+true;
        // this.url  = 'http://localhost:4200/#/version2/'+this.id+'/'+this.id1+'/'+true;
        
        // this.url  = 'patient/#/Vitals/'+this.id+'/'+this.id1;
       }
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // this.videoUrl = 'https://tokbox.com/embed/embed/ot-embed.js?embedId=31ced376-6b33-4faf-bff6-2a3bd232c2c7&room=DEFAULT_ROOM&iframe=true';
        // this.urlSafee = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        // this.loader.loadingDismiss();
      }); 

    })
    }

    toggle(e)
    {
      console.log('toggle', e.checked);
      console.log(this.id);
      console.log(this.id1);
      if(e.checked == true)
      {
        this.url  = 'https://prodoc.devumdaa.in/patient/#/version2/'+this.id+'/'+this.id1+'/'+e.checked;
        // this.url  = 'http://localhost:4200/#/version2/'+this.id+'/'+this.id1+'/'+e.checked;
        // this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+this.id1;
        // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+this.id1;
        // this.url  = 'https://doctor.umdaa.co/patient/#/version2/'+this.id+'/'+this.id1+'/'+ e.checked;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }else if(e.checked == false){
        // this.url  = 'http://localhost:4200/#/version2/'+this.id+'/'+this.id1+'/'+true;
        // this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+this.id1;
        // this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+this.id1;
        // this.url  = 'patient/#/version2/'+this.id+'/'+this.id1+'/'+'true';
        // this.url  = 'https://doctor.umdaa.co/patient/#/version2/'+this.id+'/'+this.id1+'/'+true;
        // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+this.id1;
        // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // this.url  = 'http://localhost:4200/#/version2/'+this.id+'/'+this.id1+'/'+e.checked;
        window.location.reload();
      //   console.log(this.id);
      //   this.patientservice.GetPatient(this.id).subscribe(data =>{
      //     console.log(data.result['parameters'][0])
      //     this.details = data.result['parameters'][0]
      //     console.log(data.result['parameters'][0].mobile);
      //     if(data.result['parameters'][0].rmp_status != '1'){
      //       localStorage.setItem('videocallNumber',data.result['parameters'][0].mobile);
      //     }else{
      //       localStorage.setItem('videocallNumber',data.result['parameters'][0].rmp_number);
      //     }
      
      //     this.patientDeta= data.result['parameters'][0].mobile;
      //     this.slot_type= data.result['parameters'][0].slot_type;
      //     console.log(this.patientDeta);

      //     this.headerObj = data.result['parameters'][0];  
      //     console.log(this.headerObj)
      //     console.log(this.headerObj.doctor_name);
      //     console.log(this.headerObj.patient_name);
      //     localStorage.setItem('doctor_name',this.headerObj.doctor_name);
      //     localStorage.setItem('patient_name',this.headerObj.patient_name);
      //     if(this.headerObj.rmp_status != 1){
      //       this.v_number = this.headerObj.mobile;
      //     }
      //     else{
      //       this.v_number = this.headerObj.rmp_number;
      //     }
      //     console.log(this.headerObj.rmp_status)
      //     this.status = this.headerObj.status;

      //   //  this.id1 =  res['id1'];
      //   //  console.log(this.id1);
      //    if(this.headerObj.rmp_status == 1){
      //     this.url  = 'https://prodoc.devumdaa.in/patient/#/Summary/'+this.id+'/'+'1';
      //    // this.url  = 'https://doctor.umdaa.co/patient/#/Summary/'+this.id+'/'+'1';
      //   //  this.url  = 'http://localhost:4200/#/Summary/'+this.id+'/'+'1';
      //    // this.url  = 'patient/#/Summary/'+this.id+'/'+'1';
      //  }
      //  else if(this.headerObj.slot_type == "video call" && this.id1 == '6'){
      //    this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+'2';
      //    // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'2';
      //   //  this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+'2' 
      //    // this.url  = 'patient/#/Vitals/'+this.id+'/'+'2';
      //  }
      //  else if(this.headerObj.slot_type == "video call" && this.id1 == '4'){
      //    // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+'3';
      //    this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+'3';
      //   //  this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+'3' 
      //    // this.url  = 'patient/#/Vitals/'+this.id+'/'+'3';
      //  }
      //  else{
      //    this.url  = 'https://prodoc.devumdaa.in/patient/#/Vitals/'+this.id+'/'+this.id1;
      //    // this.url  = 'https://doctor.umdaa.co/patient/#/Vitals/'+this.id+'/'+this.id1;
      //   //  this.url  = 'http://localhost:4200/#/Vitals/'+this.id+'/'+this.id1;
      //   // this.url  = 'http://localhost:4200/#/version2/'+this.id+'/'+this.id1+'/'+true;
      //  //  this.url  = 'patient/#/Vitals/'+this.id+'/'+this.id1;
      //  }
      //   this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      // }); 

      }else{

      }
    }

    onLoad(){
      this.loader.loadingDismiss();
    }
    
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }

    // startCall(isOpened,number)
    // {

    // }

    startCall(isOpened,number){
      // console.log(isOpened,number);
      // this.assignLocalStreamHandlers();
   
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    // Join and publish methods added in this step
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    this.opened = true;
    //   this.se.getAgoraToken().subscribe((data)=>{ 
    //     console.log(data);
    //     console.log(data.result);
    //     console.log(data.channel);
    //     localStorage.setItem('token',data.result);
    //     localStorage.setItem('channel_id',data.channel);
    //     this.finishservice.shortLink(data.channel,data.result).subscribe((result) => {
    //       console.log(result);
    //       console.log(result[0]);
    //       console.log(result[1]);
    //       localStorage.setItem('videocalltokenId',result[1]);
    //       // localStorage.setItem("shortUrl", result);
    //       this.se.sendMsgApi(result[0],localStorage.getItem('videocallNumber'),data.channel,data.result).subscribe((res)=>{
    //         console.log(res);
    //         // this.loadingDismiss();
    //         // this.audioPlayerRef.nativeElement.play();
    //         // this.opened = true;
    //         localStorage.setItem('videocallNumber',number);
    //         if(number == undefined)
    //         {
    //           alert("Required Patient Number for video call");
    //         }else{
    //         // this.audioPlayerRef.nativeElement.play();
    //         // this.loader.loadingPresent();
    //         console.log(data.result);
    //         console.log(data.channel);
    //         this.videoLoading(data.result,data.channel);
    // //         this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    // // this.assignClientHandlers();
    // // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    // // this.assignLocalStreamHandlers();
    // // // Join and publish methods added in this step
    // // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    //         // this.opened = isOpened;
    //         // this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    //         // this.assignClientHandlers();
    //         // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    //         // this.assignLocalStreamHandlers();
    //         // // Join and publish methods added in this step
    //         // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    //       }
    //       })
    //     });
    // });
      // this.finishservice.shortLink().subscribe((result) => {
      //   console.log(result);
      //   localStorage.setItem("shortUrl", result);
      // });
      // this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
      // this.assignClientHandlers();
      // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      // this.assignLocalStreamHandlers();
      // // Join and publish methods added in this step
      // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
      // var doctor_id = JSON.parse(localStorage.getItem('data'))['result'].doctor_details.doctor_id;
      // console.log(doctor_id);
      // var doctor_name= JSON.parse(localStorage.getItem('data'))['result'].doctor_details.first_name;
      // console.log(doctor_name);
      // var room_id='123456';
      // if(this.headerObj.rmp_status != 1){
      //   this.se.getAgoraToken().subscribe((data)=>{
      //     console.log(data);
      //     console.log(data.result);
      //     console.log(data.channel);
      //     localStorage.setItem('token',data.result);
      //     localStorage.setItem('channel',data.channel_id);
      //   this.finishservice.pushNotification(data.result,data.channel,doctor_id,doctor_name,number,room_id).subscribe((result) => {
      //     console.log(result)
      //   })
        
      // });
      // }
      // else{
      //   this.finishservice.ruralvideoapi(number).subscribe((result) => {
      //     console.log(result)
          
      //   })
      // }

        // this.se.getAgoraToken().subscribe((data)=>{
        // console.log(data);
        // console.log(data.result);
        // console.log(data.channel);
        // localStorage.setItem('token',data.result);
        // localStorage.setItem('channel_id',data.channel);
        // localStorage.getItem('videocallNumber');
        // let url = 'https://citizen.devumdaa.in/'+data.result+'/'+data.channel;
        // console.log(url);
        // console.log(url.length);
        // const len = url.length;
        // console.log(localStorage.getItem('shortUrl'));
        //   // window.btoa(url);
        //   // console.log(window.btoa(url));

 

        //   // if (len > 30) // only shorten if greater than 30
        //   // {
        //   //   // change value 21 and 9 as per requirement
        //   //   console.log(url.substr(0, 21) + '...' + url.substring(len - 9, len));   
        //   // }
        //   this.finishservice.shortLink(data.channel,data.result).subscribe((result) => {
        //     console.log(result);
        //     console.log(result[0]);
        //     console.log(result[1]);
        //     localStorage.setItem('videocalltokenId',result[1]);
        //     // localStorage.setItem("shortUrl", result);
        //     this.se.sendMsgApi(result[0],localStorage.getItem('videocallNumber'),data.channel_id,data.result).subscribe((data)=>{
        //       console.log(data);
        //       // this.loadingDismiss();
        //       // this.audioPlayerRef.nativeElement.play();
        //       // this.opened = true;
        //     })
        //   });
    

      // var token = data.result;
      // var channel_id = data.channel;
      // console.log(isOpened);
      // QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret);
      console.log(number);
      // localStorage.setItem('videocallNumber',number);
      console.log("please wait!!");
      console.log(number);
      if(number == undefined)
      {
        alert("Required Patient Number for video call");
      }else{
      // this.audioPlayerRef.nativeElement.play();
      // this.loader.loadingPresent();
      // this.videoLoading();
      // this.opened = isOpened;
      // this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
      // this.assignClientHandlers();
      // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      // this.assignLocalStreamHandlers();
      // // Join and publish methods added in this step
      // this.initLocalStream(() => this.join(data.result,data.channel,uid => this.publish(), error => console.error(error)));
    }
  // });
  }

  async videoLoading(number) {
    // console.log(token,channel);
    // this.isLoading=true;
     this.se.getAgoraToken().subscribe((data)=>{
        console.log(data);
        console.log(data.result);
        console.log(data.channel);
        localStorage.setItem('token',data.result);
        localStorage.setItem('channel',data.channel);
        var channel_id = data.channel;
        var token = data.result;
        this.finishservice.shortLink(channel_id,token).subscribe((result) => {
          console.log(result);
          console.log(result[0]);
          console.log(result[1]);
          localStorage.setItem('videocalltokenId',result[1]);
          var doctor_name= 'Dr.'+JSON.parse(localStorage.getItem('data'))['result'].doctor_details.first_name;
          console.log(doctor_name);
          var patient_name = localStorage.getItem('patient_name');
          // localStorage.setItem("shortUrl", result);
          this.se.sendMsgApi(doctor_name,patient_name,'https://devumdaa.in/agora/',localStorage.getItem('videocallNumber'),channel_id,token).subscribe((data)=>{
            console.log(data);
            // this.loadingDismiss();
            // this.audioPlayerRef.nativeElement.play();
            // this.opened = true;
          })

   
        });
  
     });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait Redirecting to patient..',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // this.opened = true;
    console.log('Loading dismissed!');
    this.audioPlayerRef.nativeElement.play();
    // this.opened = true;
    this.startCall(true,number);
    // this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    // this.assignClientHandlers();
    // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    // this.assignLocalStreamHandlers();
    // // Join and publish methods added in this step
    // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }



    // startCall(isOpened,number)
    // {
    //   var doctor_id = JSON.parse(localStorage.getItem('data'))['result'].doctor_details.doctor_id;
    //   console.log(doctor_id);
    //   var doctor_name= JSON.parse(localStorage.getItem('data'))['result'].doctor_details.first_name;
    //   console.log(doctor_name);
    //   var room_id='123456';
    //   if(this.headerObj.rmp_status != 1){
    //     this.finishservice.pushNotification(doctor_id,doctor_name,number,room_id).subscribe((result) => {
    //       console.log(result)
          
    //     })
    //   }else{
    //     this.finishservice.ruralvideoapi(number).subscribe((result) => {
    //       console.log(result)
          
    //     })
    //   }
    //   localStorage.setItem('videoCallUniqueId','123456');
    //   window.location.href="https://umdaa.co/doctorvideoTest?id=123465";
    //   // window.location.href="https://umdaa.co/doctorvideo/";
      
    // }



    setLocalStream(a)
    {
      this.videoPlayer.nativeElement.srcObject = a;
      this.videoPlayer.nativeElement.muted=true;
      this.videoPlayer.nativeElement.play();
      this.opened = true;

    }


    setRemoteStream(b)
    {
      this.openedd = true;
      this.audioPlayerRef.nativeElement.pause();
      localStorage.setItem('stopTimer','10')
      this.receivingPlayer.nativeElement.srcObject = b;
      this.receivingPlayer.nativeElement.play();
  
    }
  

    back()
    {
      this.dialog.open(ReviewComponent,{
        data: this.headerObj,
        
      })
    
      this.finishservice.Finishappountment( this.headerObj ).subscribe((res)=>{
        console.log(res)
        if(res['code'] == '200'){  
          // this.presentAlertt2()
          // this.dialog.open(ReviewComponent,{
          //   data: this.headerObj
          // })
        }
      })
      
    }
    nurseclose(){
      this.finishservice.Finishappountmentnurse( this.headerObj ).subscribe((res)=>{
        console.log(res)
        if(res['code'] == '200'){  
          this.presentAlertt3()
        }
      })
    }
   
    backtohome(e){
      console.log(e)
      this.presentAlertt()
    }

    getPatientInfo(id){
     console.log(id)
     this.patientservice.GetDetails_P(id).subscribe(data =>{
     console.log(data.result);
     console.log(data.result.mobile);
     this.patientMobile = data.result.mobile;
     this.patientDetails = data.result
     console.log(this.patientDetails.photo);
     console.log(this.patientDetails.photo.first_name);
     const input =  this.patientDetails.photo;
 
     const [name, street, unit, city, state, zip,image] = input.split('/');
     this.image_link = image;
     console.log(this.image_link);
 
    })
    }
    voicecall(details){
      console.log(details)
      if(details.rmp_id == 0 || details.rmp_id == null){
        var p_mobile =details.mobile 
      }else{
        var p_mobile = details.rmp_number
      }

      this.patientservice.voiceivrs(details.doctor_number,p_mobile).subscribe((data)=>{
        console.log(data)
        if(data['code'] == 200){
          this.presentLoadingg();
        }
        else{
          alert(data.message)
        }
      })

    }
    async presentLoadingg() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Connecting...',
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }

 Expert(){
  const dialog_ref =
  this.dialog.open(ExpertComponent,
   {
     panelClass: ['myapp-no-padding-dialog'],


     data: this.headerObj

   }
   );

   dialog_ref.afterClosed().subscribe(result => {
       this.getPatientInfo(this.id);
   });
 }
 async presentAlertt() {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Do you want to  Exit ",
    buttons: [
      {
        text: 'YES',
        handler: () => {
          this.zone.run(()=>{
            this.router.navigateByUrl('/appointment').then(() => {
              window.location.reload()
            });
          })
        }
      },
      {
        text: 'NO',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, 
    ],
    
  });
  (await alert).present();
  }
  async presentAlertt2() {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      header: ``,
      message: "<img src='https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_960_720.png' width=`50px` height=`50px`> Do you want to Ask Patient for <b class='text-primary'>Google Review</b> ",
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.zone.run(()=>{
              this.finishservice.GoogleReview(this.headerObj).subscribe((data)=>{
                console.log(data)
                if(data['code']=='200'){
                  this.notification.success("Google review request will be sent")
                  this.router.navigateByUrl('/appointment').then(() => {
                    window.location.reload()
                  });
                }
              })
              
            })
          }
        },
        {
          text: 'NO',
          cssClass: 'secondary',
          handler: () => {
          console.log('hello back');
          this.zone.run(()=>{
    
          this.router.navigateByUrl('/appointment').then(() => {
              window.location.reload()
            });
          })
          }
        }, 
      ],
      
    });
    (await alert).present();
    }
    async presentAlertt3() {
      let alert = this.alrtctl.create({
        cssClass:['alertLogCss'],
        header: ``,
        message: " Close this appointment",
        buttons: [
          {
            text: 'YES',
            handler: () => {
              this.zone.run(()=>{
                this.router.navigateByUrl('/appointment').then(() => {
                  window.location.reload()
                });
               
              })
            }
          },
          {
            text: 'NO',
            cssClass: 'secondary',
            handler: () => {
            console.log('hello back');
            this.zone.run(()=>{
    
            this.router.navigateByUrl('/appointment').then(() => {
                window.location.reload()
              });
            })
            }
          }, 
        ],
        
      });
      (await alert).present();
      }
    openDialog(){
      const dialog_ref =
         this.dialog.open(DialogBodyComponentComponent,
          {
            panelClass: ['myapp-no-padding-dialog-patient'],
            data: this.headerObj
          }
          );
  
          dialog_ref.afterClosed().subscribe(result => {
      
              this.getPatientInfo(this.id);
          });
     
    }

    connect() {
      QB.chat.connect({ userId: this.userId, password: "quickblox" }, (err, roster) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connected", roster);
          this.registerListner();
        }
      });

    }
  
    createNewSession() {
      

      var id = localStorage.getItem('calleId');
      console.log(id);
      var calleesIds = [id]; // User's ids vendor5
      var sessionType = QB.webrtc.CallType.VIDEO; // AUDIO is also possible
      var callerID = 106229296; // Your user ID (optional, will be defined from chat connection)
      var additionalOptions = { "bandwith": "" }; // The video bandwith (number, optional, 0 = unlimited)
      
      
      this.currentSession = QB.webrtc.createNewSession(calleesIds, sessionType, callerID, additionalOptions);


      console.log(this.currentSession);
      if (this.createNewSession !== undefined) {
        console.log('session created', this.createNewSession);
    
        this.getMediaParams();
      }
    }
  
  
    getMediaParams() {

      var mediaParams = {
        audio: true,
        video: true,
        options: {
          muted: true,
          mirror: true
        },
        elemId: 'localVideo'
      };

  
      this.currentSession.getUserMedia(mediaParams, (err, stream) => {
        if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {

          
        } else {

          var extension = {};
          this.currentSession.call(extension, function (error) {
					
          });
   
          this.loader.loadingDismiss();
          this.audioPlayerRef.nativeElement.play();

        }
      });

    }

    mute()
    {
      // this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      // this.client.on(ClientEvent.LocalStreamPublished, evt => {
      //   console.log(evt);
      //   console.log('Publish local stream successfully');
      //   evt.muteAudio();
      // });
    
      console.log(this.localStream.muteAudio);
      this.localStream.muteAudio();
      this.volume=false;
      this.volumee = true;
     
    }

    unmute()
    {
      // this.videoPlayer.nativeElement.muted=false;
      this.localStream.unmuteAudio();
      this.volume=true;
      this.volumee = false;
      
      // session.unmute('audio');
    }

  
    hideCam()
    {
      this.localStream.muteVideo();
      this.showcam = false;
      this.showcame = true;
      // session.unmute('audio');
    }
  
    hideCame()
    {
      this.localStream.unmuteVideo();
      this.showcam = true;
      this.showcame = false;
      // session.unmute('audio');
    }

  
    stopCall() {
      this.audioPlayerRef.nativeElement.pause();
      this.opened = false;
      // this.openedd = false;
      // this.localStream.close();    
      // location.reload();
      this.finishservice.stopPushNotification(localStorage.getItem('videocallNumber')).subscribe((result) => {
        console.log(result)
      })
      this.finishservice.expiryVideoToken(localStorage.getItem('videocalltokenId')).subscribe((result) => {
        console.log(result)
      })
      localStorage.setItem('stopTimer','0');
      // console.log(number);
      // this.finishservice.stopPushNotification(number).subscribe((result) => {
      //   console.log(result)
      // });
  
      // localStorage.setItem('stopTimer','0');
      location.reload();
      // this.audioPlayerRef.nativeElement.pause();
      // this.opened = false;
      // this.localStream.close();    
      
    }

    switch()
    {
      QB.webrtc.getMediaDevices("videoinput").then(function(devices) {
        if (devices.length) {
          // here is a list of all available cameras
          for (var i = 0; i < devices.length; i++) {
            var deviceInfo = devices[i];
            var deviceId = deviceInfo.deviceId;
            var deviceLabel = deviceInfo.label;
          }
        }
      });

      var constraints = {
        video: { exact: 108196309 }
      };
      this.currentSession.switchMediaTracks(constraints, function(error, stream) {
      
      });
    }
  
    registerListner() {
      
      QB.webrtc.onUserNotAnswerListener = function (session, userId) {
        console.log(session);
        console.log(userId);
        this.audioPlayerRef.nativeElement.pause();
      }
      QB.webrtc.onSessionConnectionStateChangedListener = function(session, userId, connectionState) { 
        console.log(connectionState);
        console.log(userId);
        console.log(session);
      }
      QB.webrtc.onCallListener = (session, extension) => {

        console.log(session);
        this.currentSession = session;
       
      }
  
      QB.webrtc.onAcceptCallListener = (session, userId, extension) => {
        console.log(session);
        this.currentSession.update({ 'filter': "accepted" });
        this.initiateStart = false;
        this.defaultHide = true;

      };
  
      QB.webrtc.onRemoteStreamListener = (session, userID, remoteStream) => {
        console.log(session);
        console.log(userID);
        console.log(remoteStream)
        this.audioPlayerRef.nativeElement.pause();
        var id = localStorage.getItem('calleId');
        // console.log(id);
        this.currentSession.peerConnections[userID].stream = remoteStream;
        console.log("remotStream", remoteStream);
        console.log("remotStream", this.userId);
        this.currentSession.attachMediaStream('remote_video_' +  106229296 , remoteStream);

      };

  
      QB.webrtc.onSessionCloseListener = (session) => {
        console.log(session);
        this.audioPlayerRef.nativeElement.pause();
        // this.hide=true;
        this.opened=false;
      };
  
      QB.webrtc.onUpdateCallListener = function (session, userId, extension) {
        console.log(session);
      };

      
    QB.webrtc.onSessionConnectionStateChangedListener = function (session, userId, extension) {
      console.log(session);
      console.log(extension);
      this.audioPlayerRef.nativeElement.pause();
      if(extension == 2)
      {
        this.audioPlayerRef.nativeElement.pause();
      }
    };
  
    }
  
  
    public acceptCall() {
  
      console.log('acceptsession', this.currentSession);
      var mediaParams = {
        audio: true,
        video: true,
        options: {
          muted: true,
          mirror: true
        },
        elemId: 'localVideo'
      };
  
      this.currentSession.getUserMedia(mediaParams, (err, stream) => {
        if (err || !stream.getAudioTracks().length || !stream.getVideoTracks().length) {
          this.currentSession.stop({});
          console.log("err in get media", err);
        } else {
          console.log(stream);
          console.log("media strem", stream)
          var extension = {};
          this.currentSession.accept({});
          this.calling = false;
          
        }
      });
    }
  
    // stop()
    // {
    //  location.reload();
    // }
  
    private assignClientHandlers(): void {
      console.log('Entered3');
      this.client.on(ClientEvent.LocalStreamPublished, evt => {
        // this.opened = true;
        console.log(evt);
        // this.localStream.play(this.localCallId);
        // this.localStream.isVideoOn();
        // this.localStream.getVideoTrack();
        console.log('Publish local stream successfully');
      });
  
      this.client.on(ClientEvent.Error, error => {
        console.log('Got error msg:', error.reason);
        if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
          this.client.renewChannelKey(
            '',
            () => console.log('Renewed the channel key successfully.'),
            renewError => console.error('Renew channel key failed: ', renewError)
          );
        }
      });
  
      this.client.on(ClientEvent.RemoteStreamAdded, evt => {
        // localStorage.getItem('stopTimer') == '10';
        localStorage.setItem('stopTimer','10');
        console.log(evt);
        const stream = evt.stream as Stream;
        this.client.subscribe(stream, { audio: true, video: true }, err => {
          console.log('Subscribe stream failed', err);
        });
      });
  
      this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
        console.log(evt);
        const stream = evt.stream as Stream;
        const id = this.getRemoteId(stream);
        console.log(id);
        console.log(this.remoteCalls);
        if (!this.remoteCalls.length) {
          // this.videoLoading();
          this.openedd = true;
          this.nowshow = true;
          this.audioPlayerRef.nativeElement.pause();
          this.showOnly=true;
          this.remoteCalls.push(id);
          setTimeout(() => stream.play(id), 1000);
        }
      });
  
      this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
        console.log(evt);
        const stream = evt.stream as Stream;
        if (stream) {
          stream.stop();
          this.remoteCalls = [];
          console.log(`Remote stream is removed ${stream.getId()}`);
        }
      });
  
      this.client.on(ClientEvent.PeerLeave, evt => {
        console.log(evt);
        const stream = evt.stream as Stream;
        if (stream) {
          stream.stop();
          this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
          this.localStream.close();
          console.log(`${evt.uid} left from this channel`);
        }
      });
    }
  
    private getRemoteId(stream: Stream): string {
      return `agora_remote-${stream.getId()}`;
    }
  
    private assignLocalStreamHandlers(): void {
      this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
        console.log('accessAllowed');
      });
  
      // The user has denied access to the camera and mic.
      this.localStream.on(StreamEvent.MediaAccessDenied, () => {
        console.log('accessDenied');
      });
    }
  
    private initLocalStream(onSuccess?: () => any): void {
      console.log("Entered")
      this.localStream.init(
        () => {
          // The user has granted access to the camera and mic.
          // this.audioPlayerRef.nativeElement.pause();
          // if(localStorage.getItem('stopTimer') == '10')
          // {
          //   var starttime = 61;
          // }else if(localStorage.getItem('stopTimer') == '0')
          // {
          //   var starttime = 61;
          // }else{
            var starttime = 60;
          // }
          var seconds=starttime;
        var timer;
     
        function myFunction()  {
    
          if(seconds < starttime) { // I want it to say 1:00, not 60
              console.log(seconds);
          }
          if (seconds >0 ) { // so it doesn't go to -
            seconds--;
          } else {
            clearInterval(timer);
            if(localStorage.getItem('stopTimer') == '10')
            {
              
            }else if(localStorage.getItem('stopTimer') == '0')
            {
             
            }else{
                location.reload();

            }

          }
    
        }

          if(!timer) {
            timer = window.setInterval(()=> { 
              myFunction();
            }, 1000); // every second
          }
       
          this.localStream.play(this.localCallId);
          if (onSuccess) {
            onSuccess();
          }
        },
        err => console.error('getUserMedia failed', err)
      );
    }
    async loadingDismiss() {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.loadingDismiss();
    this.opened = true;
    console.log(this.headerObj.rmp_status);
    if(this.headerObj.rmp_status != 1){
        var token = localStorage.getItem('token');
        var channel_id = localStorage.getItem('channel');
        console.log(token);
        console.log(channel_id);
        localStorage.getItem('videocallNumber');
        let url = 'https://citizen.devumdaa.in/'+token+'/'+channel_id;
        console.log(url);
        console.log(url.length);
        const len = url.length;
        console.log(localStorage.getItem('shortUrl'));

      console.log(localStorage.getItem(token));
      console.log(localStorage.getItem(channel_id));

      var room_id='123456';
      var doctor_id = JSON.parse(localStorage.getItem('data'))['result'].doctor_details.doctor_id;
      console.log(doctor_id);
      var doctor_name= JSON.parse(localStorage.getItem('data'))['result'].doctor_details.first_name;
      console.log(doctor_name);
      localStorage.getItem('shortUrl');
      // if(this.headerObj.rmp_status != 1)
      // {
        this.client.join(token,channel_id,this.uid, onSuccess, onFailure);
        this.finishservice.pushNotification(token,channel_id,doctor_id,doctor_name,localStorage.getItem('videocallNumber'),room_id).subscribe((result) => {
          console.log(result)
        })
      // }
    }
    else{
        var room_id='123456';
        var doctor_id = JSON.parse(localStorage.getItem('data'))['result'].doctor_details.doctor_id;
        console.log(doctor_id);
        var doctor_name= JSON.parse(localStorage.getItem('data'))['result'].doctor_details.first_name;
        console.log(doctor_name);
        var token = localStorage.getItem('token');
        var channel_id = localStorage.getItem('channel');
        this.client.join(token,channel_id, this.uid, onSuccess, onFailure);
        this.finishservice.ruralvideoapi(token,channel_id,doctor_id,doctor_name,
        localStorage.getItem('videocallNumber'),room_id).subscribe((result) => {
          console.log(result)
          console.log(result+"Success");
        });
     }

  }

  
    /**
     * Attempts to upload the created local A/V stream to a joined chat room.
     */
    publish(): void {
      this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
    }
    

  }
