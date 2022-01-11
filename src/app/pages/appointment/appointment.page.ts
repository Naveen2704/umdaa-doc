import { Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { StatusService } from 'src/app/service/status.service';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import{Storage} from'@ionic/storage';
import { LoaderService } from 'src/app/service/loader.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { LoadingController, AlertController, NavController, Platform } from '@ionic/angular';
import moment from 'moment-timezone';
import { interval } from 'rxjs';
import { Location } from '@angular/common';
declare var QB: any;
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2'
import { SwPush } from '@angular/service-worker';
import * as introJs from 'intro.js/intro.js';
import { SlotbookingService } from 'src/app/service/slotbooking.service';
import { NotificationService } from 'src/app/service/notification.service';




@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})

export class AppointmentPage implements OnInit {
  momentjs: any = moment;
  public terms: string = "";
  introJs = introJs()
  appointmentsList:any=[];
  status: any=[];
  appointment_status: any;
  refreshStatus: any;
  hide:boolean =true;
  show:boolean =true;
  showFirst:boolean = true;
  showSecond:boolean = false;
  refreshId: any;
  isOutline: boolean;
  Patient_info: any=[];
  buttonColor: string ='#28a745';
 
  dataRefresher: any;
  roleId: any;
  Res: any;
  options: any;
  waitingTime: any=[];
  updateSubscription: any;
  appWaitingTime: any=[];
  calle: any = 	108196309;
  
  CREDENTIALS = {
    appId: 81237,
    authKey: 'CT3YksQRwhkwfMN',
    authSecret: 'gyq2HehvUxrwmeG'
  };
  date: any;
  startDate = new Date(2021, 1, 1)
  interval: NodeJS.Timer;
  checking_time: any;
  
  constructor(private platform: Platform,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>,push:SwPush,public _router: Router, public _location: Location,private  alrtctl:AlertController,
    private notification:NotificationService,private finishservice:SlotbookingService,private userService: UserService,private storedData:Storage,private zone:NgZone, public navCtrl:NavController,
    @Inject(DOCUMENT) document,public router:Router,private appointmentService:AppointmentService , private statusService:StatusService,private loader:LoaderService) 
    { 
      // QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret);
      push.messages.subscribe(msg => {
        console.log(msg)
        console.log('push message',( msg['notification'].success))
       if(msg['notification'].click_action == "front-office" ){
         console.log()
        this.getAppointmentsData(true);
        this.initializeApp()
        // window.open('https://web.whatsapp.com/')

       }
     })
     push.notificationClicks.subscribe(
      ({ action, notification }) => {
        if (notification && notification !== null){
          this.zone.run(() => {
            console.log('onclick');
            this.router.navigateByUrl('/appointment');
        });
        }
        
      });

   
      // router.events.subscribe((data: any) => {
      //   console.log(data)
      //   if(data.url == '/appointment'){
      //     console.log('hello',data.url)
      //     this.getAppointmentsData(true)
      //   }
      // }
      // )

      this.dateAdapter.setLocale('en-GB');
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
          this.getAppointmentsData(true);
        }
      });
     
  }
  
  // doRefresh(event) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }
 
  public myImgUrl : string ="assets/icon/my.png";

  public myText :string = "FINISH";
  

  public opened = true;
  public dataSaved = false;

  public close() {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  public submit() {
      this.dataSaved = true;
      this.close();
  }

  ngOnInit() {
    localStorage.removeItem('slotType');
    this.roleId = localStorage.getItem('roleId');
    console.log( this.roleId);
    // this.userService.castUser.subscribe(user =>{
    //   console.log(user);
    //   console.log(user['result'].profile_id);
    //  });
    // this.appointmentService.refreshNeeded$.subscribe(()=>{
    //   this.getAppointmentsData(true)
    // })
    // this.updateSubscription = interval(60000).refreshArray();
   
    //  this. refresh();
      this.refreshData();
     this.date = new Date()
     this.getAppointmentsData(true)
  }
  initializeApp() {
    this.platform.ready().then(() => {
      
    });
  
  
  }
  change(a,b)
  {
    localStorage.setItem('calleId',this.calle);
    this.router.navigate(['/webpage/' + a + '/'+b]);
 
  }

  statuscheck(id,app_id,app_type,mobile){
    // alert(mobile);
    // localStorage.setItem('calleId',this.calle);

      // var params = { login: mobile, password: 'quickblox' };  
      // QB.createSession(params, function(err, result) {
      //   // callback function
      //   console.log(result);
      //   if(result == null)
      //   {
      //     var checkPatientData = 'Patient Not Registered';
      //   }else{
      //     var checkPatientData = 'Connecting';
      //     console.log(result.user_id);  
      //     localStorage.setItem('calleId',result.user_id);
      //     // this.createNewSession(); 
      //   }
      // });

    console.log(id,app_id,app_type);
    
    if(app_type =="waiting"){
      this.appointmentService.changestatus(app_id).subscribe((res)=>{
        console.log(res)
        if(res['code'] =="200"){
          this.router.navigate(['/webpage/' + app_id + '/'+id]);
          // let l = res.result.appointment.status 
          // this.changeStatuss(id,l)
          this.getAppointmentsData(true);
        }
      })
    }else if(app_type =="booked"){
        alert('Patient not yet checked in')
    }else{
      this.router.navigate(['/webpage/' + app_id + '/'+id]);
    }
    
    // if(id == '4' && app_type == 'waiting'){
    //   // this.present(app_id,id);
    // }
    // if(app_type != 'waiting'){
    //   this.router.navigate(['/webpage/' + app_id + '/'+id]);
    // }
  }
  help(){
    introJs(document.querySelector("app-appointment")).start();
    
  }
  searchResult (terms: string) {
     console.log(terms);
     console.log(terms.length);
     if(terms.length >= 3)
     {
      this.appointmentService.search(terms).subscribe(data =>{
        console.log(data);
        // if(data['code'] =="201"){
        //   Swal.fire('',data.message, 'error')
        // }
       console.log(data.result.appointment_list.length);
        for(var j=0;j<data.result.appointment_list.length;j++)
        {
          console.log(data.result.appointment_list[j])
          if(data.result.appointment_list[j] != '' || data.result.appointment_list[j] != 'null')
          {
          //  this.appointmentsList = (data['result']['appointment_list']);
          //  console.log(this.appointmentsList);
           this.appointmentsList= data['result']['appointment_list'].filter(function (el) {
            return el != null;
          });
          
          console.log( this.appointmentsList);
          }
        }
    
     });
     }
     if(terms.length == 0){
      this.getAppointmentsData(true);
     }
     else{
      // this.getAppointmentsData(true);
     }
    
   
    //  if(query.length>=3){

    //    this.options = this.appointmentService.search(query);
    //   console.log(this.options)
      
    //  }
    //   if(query.length ==0 ){
    //   this.options = this.appointmentService.search(query);
    //  }else{

    //  }
     
   }
   bookapp(){
     this.router.navigateByUrl('/bookapp')
   }
  changeStatus(id,status,mobile,user_id)
  {
    this.buttonColor = 'red';
    console.log(id,status)
    if(status == 'in_consultation')
    {
      this.presentAlert2(id,user_id)
      let a = 'closed';
      this.changeStatuss(id,a); 
    }else if(status=='checked_in'){
      let b='vital_signs';
      this.changeStatuss(id,b);
    }else if(status=='waiting'){
      // this.statuscheck(this.roleId,id,status,mobile)
      let c = 'in_consultation';
      this.changeStatuss(id,c);
    }else if(status=='drop'){
      let d = 'drop'
      this.changeStatuss(id,d);
    }else{
      
    }

  }

  changeStatusss(id,status)
  {
    this.buttonColor = 'red';
    console.log(id,status)
    if(status == 'in_consultation')
    {
      let a = 'closed';
      this.changeStatuss(id,a); 
    }else if(status=='checked_in'){
      let b='vital_signs';
      this.changeStatuss(id,b);
    }else if(status=='waiting'){
      let c = 'waiting';
      this.changeStatuss(id,c);
    }else if(status=='drop'){
      let d = 'drop'
      this.changeStatuss(id,d);
    }else if(status=="vital_signs"){
      let d = 'waiting'
      this.changeStatuss(id,d);
    }else{
      
    }

  }
  addEvent(event){
   
    console.log(new Date(event.value))
    var today = event.value
  //  console.log(this.fileToUpload)
  var dd = today.getDate(); 
  var mm = today.getMonth() + 1; 

  var yyyy = today.getFullYear(); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
  this.date = event.value
  console.log(this.date )
  this.getAppointmentsData(true)
  }
  changeStatuss(id,status)
  {
    console.log(id,status)
    this.loader.loadingPresent();
    this.statusService.getStatus(id,status).pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          await this.loader.loadingDismiss();
      })
  )
    .subscribe((res)=>{
 
      console.log(res);
      this.refreshStatus = res['result']['appointment']['status'];
      document.getElementById(id).innerHTML = this.refreshStatus;
      document.getElementById(id).style.background= '#d00';
      console.log(this.refreshStatus);
      this.ngOnInit();
    });
    
  }
 
   getAppointmentsData(setflag)
  {
    //  this.loader.loadingPresent();
    this.appointmentService.getAppointment(this.date).pipe(
      finalize(async () => {
      })).subscribe((data)=>{
      console.log(data);
      this.appointmentsList= data['result']['appointment_list'];
      this.showFirst = false;
      this.showSecond = true;
      this.Patient_info = data
      console.log(this.appointmentsList);
      var arTime =[]
      console.log(this.appointmentsList)
      console.log(this.appointmentsList.length);
      for(var i = 0;i<this.appointmentsList.length;i++)
      {
        this.checking_time = this.appointmentsList[i]['check_in_time'];
        console.log(this.appointmentsList[i]['status']);
        console.log(this.appointmentsList[i]['check_in_time']);
        if(this.appointmentsList[i]['status'] == 'waiting')
        {
            arTime[i] = [{appointment_id:this.appointmentsList[i]['appointment_id'],waiting_time:this.appointmentsList[i]['check_in_time']}]
            console.log(arTime[i]);
            console.log(arTime[i]);
            console.log(arTime[i][0].waiting_time);
            console.log(new Date());
            console.log( new Date(arTime[i][0].waiting_time))
          var startTime = moment(new Date().getTime()),
          endTime = moment(new Date(arTime[i][0].waiting_time));
          console.log(startTime);
          console.log(endTime)
          var totalMinutes = startTime.diff(endTime, 'minutes');
          console.log(totalMinutes)
            this.appointmentsList[i]['waiting_time'] = totalMinutes;
            console.log(this.appointmentsList);
        }
       
      }
   
      this.appointmentService.Patient_info =  this.appointmentsList;
      localStorage.setItem('appointments',JSON.stringify(this.appointmentsList))
     

    }
    )
    this.refreshArray()
  }

  refreshArray(){
   console.log(this.appWaitingTime);
    //   for(var i = 0;i < this.appWaitingTime.length;i++){
    //     // this.appWaitingTime[i].waiting_time = parseInt(this.appWaitingTime[i].waiting_time)+1
    //     console.log(this.appWaitingTime[i].waiting_time)
    //     console.log(parseInt(this.appWaitingTime[i].waiting_time))
    //     console.log(parseInt(this.appWaitingTime[i].waiting_time)+1)
    //   }
    // console.log(this.appWaitingTime[0].waiting_time );
    // console.log( parseInt(this.appWaitingTime[0].waiting_time));
    // console.log( parseInt(this.appWaitingTime[0].waiting_time)+1);
    this.interval = setTimeout(()=>{
      for(var i = 0;i <= this.appWaitingTime.length;i++){
       console.log(this.appWaitingTime[i].waiting_time)
          this.appWaitingTime[0].waiting_time = parseInt(this.appWaitingTime[i].waiting_time)+1;
          console.log(this.appWaitingTime[i].waiting_time);

      
      }
    }, 60000);
    
  }

  refreshData(){
    
    this.dataRefresher =
      setInterval(() => {
        this.getAppointmentsData(true);
        // this.doRefresh(true)
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 60000);  
  }
  cancelPageRefresh(){
    if(this.dataRefresher){
        clearInterval(this.dataRefresher);
    }    
}

ngOnDestroy(){
  console.log("Destroyed");
  this.cancelPageRefresh();
}
ionViewDidLeave() {
  // Do actions here
  this.cancelPageRefresh();
}
logout() {
  this.presentAlert();
}

async presentAlert() {
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
async present(app_id,id) {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Are you sure want to START ?",
    buttons: [
    {
        text: 'YES',
        handler: () => {
          this.zone.run(()=>{
            this.appointmentService.changestatus(app_id).subscribe((res)=>{
              console.log(res)
              if(res['code'] =="200"){
                this.router.navigate(['/webpage/' + app_id + '/'+id]);
                this.getAppointmentsData(true)
              }
            })
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
      },
    ],
    
  });
  (await alert).present();
  }
  async presentAlert2(id,user_id) {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      header: ``,
      message: "<img src='https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_960_720.png' width=`50px` height=`50px`> Do you want to Ask Patient for <b class='text-primary'>Google Review</b> ",
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.zone.run(()=>{
              this.finishservice.GoogleReview2(id,user_id).subscribe((data)=>{
                console.log(data)
                if(data['code']=='200'){
                  this.notification.success("Google review request will be sent")
                  // this.router.navigateByUrl('/appointment');
                   this.router.navigateByUrl['/appointment'];
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
         
          }
        }, 
      ],
      
    });
    (await alert).present();
    }
  // refresh(): void {
  //   this._router.navigateByUrl("/appointment", { skipLocationChange: true }).then(() => {
  //     console.log(decodeURI(this._location.path()));
  //     this._router.navigate([decodeURI(this._location.path())]);
  //   });
  // }
}
