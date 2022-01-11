import { Component, OnInit,HostListener, NgZone, ViewChild, ElementRef   } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import  { faProcedures } from '@fortawesome/free-solid-svg-icons';
import  { faHandshake } from '@fortawesome/free-solid-svg-icons';
import  { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import  { faPrescriptionBottleAlt} from '@fortawesome/free-solid-svg-icons';
import{faPercent} from '@fortawesome/free-solid-svg-icons';
import  { faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/service/loader.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { StatusService } from 'src/app/service/status.service';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import  { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { SwPush } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { StatusComponent } from './status/status.component';

import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  introJS = introJs();
  faProcedures = faProcedures;
  faHandshake = faHandshake;
  faRupeeSign = faRupeeSign;
  faMoneyBillAlt= faMoneyBillAlt;
  faPercent =faPercent;
  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faCalendarCheck =faCalendarCheck;
  appointmentsList: any=[];
  public myImgUrl : string ="assets/icon/default.jpg";
  userDetails: any=[];
  myItem: any=[];
  info: any=[];
  appStatus: any;
  DasshboardRevenue: any=[];
  DahboardHeader: any = [];
  Crevenues: any=[];
  Prrevenues: any=[];
  Phrevenues: any=[];
  roleId: string;
  buttonColor: string;
  refreshStatus: any;
  updateSubscription: any;
  online: boolean = false;
  offline: boolean = false;
  onlineE: boolean = false;
  offlineE: boolean = false;
  tele: any;
  expert: any;
  AvalTeletime: any;
  Experttime: any;
  status:boolean;
  tour
  checked: boolean = false;
  docAvalible: any;
  constructor( public dialog: MatDialog,push:SwPush,private statusService:StatusService,private userService: UserService,private zone:NgZone, private storedData:Storage, private location:PlatformLocation,private  alrtctl:AlertController, public navCtrl:NavController,
    private router:Router,private appointmentService:AppointmentService,public loadingController:LoadingController,private loader:LoaderService,private auth:AuthService) { 
    // const userData = JSON.parse(localStorage.getItem('data'));
    // this.userDetails = (userData["result"]["doctor_details"]);
    push.messages.subscribe(msg => {
      console.log(msg)
      console.log('push message',( msg['notification'].click_action))
     if(msg['notification'].click_action == "front-office"  ){
      this.getRevenueData()
     }
   })

   push.notificationClicks.subscribe(
    ({ action, notification }) => {
      if (notification && notification !== null){
        this.zone.run(() => {
          console.log('onclick');
          this.router.navigateByUrl('/dashboard');
      });
      }
      
    });
    var onl = localStorage.getItem('online')
    console.log(onl)
    if(onl == '1'){
      
    }
    var onlE = localStorage.getItem('onlineE')
    if(onlE == '1'){
      this.onlineE = true;
     
    }
 
//    push.notificationClicks.subscribe({ action, notification })=> {
//     this.zone.run(() => {
//         console.log('onclick');
//         this.router.navigate(['/heroes']);
//     });
// };
  }
  @ViewChild("toggleElement",{static:false}) ref: ElementRef;

  ngOnInit() {

    this.roleId = localStorage.getItem('roleId');
    console.log( this.roleId);
    // this.userService.castUser.subscribe(user =>{
    //   console.log(user);
    //   console.log(user['result'].profile_id);
    //  });

    //  this.getAppointmentsData()

    //  this.updateSubscription = interval(60000).subscribe(
    //   (val) => { this.getRevenueData()
    // });
     this.getRevenueData();
     this.appointmentService.docavalible().subscribe((res)=>{
       console.log(res)
       this.docAvalible = res.result.available
       if( this.docAvalible == 1){
        this.online = true;
        this.checked = true;
       }
       else if(this.docAvalible == 0){
        this.offline = true;
        this.checked = false;
       }
     })
  }
  route(app_id){
    this.router.navigate(['/webpage/' + app_id + '/'+this.roleId]);
  }
  changeStatus(id,status)
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
      let c = 'in_consultation';
      this.changeStatuss(id,c);
    }else if(status=='drop'){
      let d = 'drop'
      this.changeStatuss(id,d);
    }else{
      
    }

  }
  notifytele(event){
    console.log(event.checked)
    this.tele = event.checked
    if(event.checked == true){
      
      this.openStatusdailog()
    }
    else{
      var feature = "tele"
      this.present(feature)
     
    }
  }
  notifyexpert(event){
    console.log(event.checked)
    this.expert = event.checked
    if(event.checked == true){
     
      this.openStatusdailogE()
    }
    else{
      var feature = "expert"
      this.present(feature)
     
    }
  }

  async present(feature) {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: "Are you sure want to Offline ?",
      buttons: [
      {
          text: 'YES',
          handler: () => {
            this.zone.run(()=>{
                if(feature =="tele"){
                  var tele = "tele"
                  this.appointmentService.offlinetele(tele).subscribe((data)=>{
                    console.log(data)
                    if(data['code'] =="200"){
                      localStorage.removeItem('online');
                      localStorage.removeItem('onlineTime');
                      this.online = false;
                      this.offline = true;
                      this.checked = false;
                    }
                  })
                }else if(feature =="expert"){
                  var expert = "expert"
                  this.appointmentService.offlineexpert(expert).subscribe((data)=>{
                    console.log(data)
                    if(data['code'] =="200"){
                      localStorage.removeItem('onlineE');
                      this.onlineE = false;
                    this.offlineE = true;
                    }
                   
                  })
                }
                
              
            })
          }
        },
        // {
        //   text: 'NO',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: (blah) => {
        //     this.tele = true
        //   }
        // },
      ],
      
    });
    (await alert).present();
    }
  
  openStatusdailog(){
    const dialog_ref =
    this.dialog.open(StatusComponent,
     {
       panelClass: ['myapp-no-padding-dialog'],
  
  
       data: {
         tele:this.tele,
         
       }
  
     }
     );
  
     dialog_ref.afterClosed().subscribe(result => {
       ///console.log('The dialog was closed');
        console.log(result)
        if(result.event == "tele"){
          this.online = true;          
          this.offline = false;
          this.AvalTeletime = result.value
        }
     });
  }
  openStatusdailogE(){
    const dialog_ref =
    this.dialog.open(StatusComponent,
     {
       panelClass: ['myapp-no-padding-dialog'],
  
  
       data: {
         expert:this.expert,
         
       }
  
     }
     );
  
     dialog_ref.afterClosed().subscribe(result => {
       ///console.log('The dialog was closed');
        console.log(result)
        if(result.event == "expert"){
          this.Experttime = result.value;
          this.onlineE = true;
          this.offlineE = false
        }
     });
  }
  changeStatuss(id,status)
  {
    // this.loader.loadingPresent();
    this.statusService.getStatus(id,status).pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          // await this.loader.loadingDismiss();
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
 
  help(){
   
    introJs(document.querySelector("app-dashboard")).start();
    
  }
  bookapp(){
    this.router.navigateByUrl('/settings')
  }
  // async getAppointmentsData()
  // {
  //   this.myItem = JSON.parse(await this.storedData.get("data"));
  //   console.log(this.myItem);
  //   this.info = this.myItem.result;
  //   console.log(this.info)
  //   this.appointmentService.getAppointment(this.info).subscribe((data)=>{
  //     console.log(data);
  //     this.appointmentsList= data.result['appointment_list']
  //     this.appStatus = this.appointmentsList.status
  //    // console.log(this.appStatus)
  //     if(this.appointmentsList == null){
  //       this.presentAlert()
  //     }
  //   })
    
  // }
 getRevenueData(){
    this.myItem = JSON.parse(localStorage.getItem('data'));

    this.info = this.myItem.result;
    // this.loader.loadingPresent();
    this.appointmentService.getDashboardRevenue().pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          // await this.loader.loadingDismiss()
      })
  ).subscribe((data)=>{
      console.log(data)
      this.appointmentsList = data['result']['leftPane']['PatientsList'];

      // var list = data['result']['leftPane'].header;
      // var PatientsList =data['result']['leftPane'].PatientsList;
      // console.log(list);
      // console.log(PatientsList);
      console.log(this.appointmentsList)
      // console.log(this.appointmentsList[0].appointment_date)
      // this.DasshboardRevenue = data['result']['rightPane']['analyticalList'][0]['split'];
      this.DasshboardRevenue = data.result.rightPane.analyticalList[0]['split'];
      this.DahboardHeader = data['result']['rightPane'];
      this.Crevenues = data.result.rightPane.analyticalList[1]
      this.Prrevenues = data.result.rightPane.analyticalList[2]
      this.Phrevenues = data.result.rightPane.analyticalList[3]
      console.log(this.Crevenues)

      // this.loader.loadingDismiss();
    })
  }


  logout() {
    this.presentAlert();
}
signout(){
  this.auth.Logout().subscribe((res)=>{
    console.log(res)
    if(res['code']== 200){
      localStorage.removeItem('data');
      this.storedData.remove('login');
      this.router.navigateByUrl('/login').then(()=>{
        // window.location.reload()
        this.auth.authenticated(false);
      })
    }
  })
}
async presentAlert() {
  let alert = this.alrtctl.create({
    cssClass:['alertLogCss'],
    message: "Do you really want to logout ?",
    buttons: [
       {
        text: 'YES',
        handler: () => {
          this.zone.run(()=>{
            // localStorage.removeItem('data');
            localStorage.removeItem('roleId');
            localStorage.removeItem('info');
            
            console.log(this.storedData.get('login'));
            // this.storedData.remove('login')
            // console.log(this.storedData.remove('login'));
            // this.router.navigateByUrl('/login').then(()=>{
            //   window.location.reload()
            // })
            // this.navCtrl.navigateRoot('/login');
            this.signout();
            
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

  // async presentLoading() {
  //   const loading = await this.loadingController.create({
  //     message: 'Hellooo',
  //     duration: 2000
  //   });
  //   await loading.present();

  // }

}
