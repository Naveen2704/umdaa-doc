import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { LoginPage } from '../auth/login/login.page';
import { LoginPageModule } from '../auth/login/login.module';
import { Storage } from '@ionic/storage'; 
import moment from 'moment-timezone';
import { AppointmentService } from '../service/appointment.service';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material';
import { AccesspopupComponent } from './accesspopup/accesspopup.component';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  
  
  roleId: string;
  Apppages=[];
  labels: any[];
  selectedLeave : string = '';
  default_clinic: any;
  docInfo: any[];
  clinicsInfo: any[];
  fullData: any;
  activepage: any;
  phaniHero=5;
  urls: any=[]

  selectedIndex:any;
  selecteddIndex:any;
  eoCount: any;
  constructor( private appointmentService:AppointmentService,private storageData:Storage,private router:Router,private alrtctl:AlertController, private navCtl:NavController,private Arout:ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog
    ) { 
    // this.router.events.subscribe((event:RouterEvent)=>{
    // });

    // const userData = JSON.parse(localStorage.getItem('data'));
    // this.userDetails = (userData["result"]["doctor_details"]);
    //console.log(this.userDetails )
  //this.userDetails();
    
  }

  ngOnInit() {
    // this.checkAccess()
    this.checkTimer()
    setInterval(() => {
      this.checkTimer(); 
    }, 60000 );
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    if(this.roleId == '4'){
      this.docInfo = JSON.parse(localStorage.getItem('info'))
      this.default_clinic = this.docInfo['clinic_name']
    }

    this.fullData = JSON.parse(localStorage.getItem('data'));
    // console.log(this.fullData.result.left_nav)
    this.clinicsInfo = this.fullData['result']['clinics'];
    // this.Apppages = this.fullData.result.navigations
    if(this.roleId == '4')
    {
      // var localObj = Object.entries(localStorage)
      // for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      //   var key = localStorage.key(i)

      //   if(key.search('Expert Opinion')){
      //     console.log( localStorage.getItem( localStorage.key( i ) ) );
      //     this.eoCount += parseInt(localStorage.getItem( localStorage.key( i ) ))
      //   }
        
      // }
      // console.log(this.eoCount)
      // this.eoCount = localStorage.getItem('Expert Opinion')
      console.log(this.fullData.result.Ionic)
      
        this.Apppages = this.fullData.result.Ionic
      // if(this.Apppages.length == 0){
      //   alert("You Dont Have Access")
      // }
      // else{}
      // this.Apppages = [
      //   {
      //     title: 'Home',
      //     url: '/home',
      //     icon: 'H',
      //     access: '1'
      //   },
      //   {
      //     title: 'Dashboard',
      //     url: '/dashboard',
      //     icon: 'D',
      //     access: '1'
      //   },
      //   {
      //     title: 'Appointments',
      //     url: '/appointment',
      //     icon: 'A',
      //     access: '0'
      //   },
      
      //   {
      //     title: 'Expert Opinion',
      //     url: '/expert',
      //     icon: 'E',
      //     access: '0'
      //   },
      //   {
      //     title: 'Health Education',
      //     url: '/he',
      //     icon: 'H',
      //     access: '1'
      //   },
      //   {
      //     title: 'Google Business',
      //     url: '/gbusiness',
      //     icon: 'G',
      //     access: '1'
      //   },
      //   {
      //     title: 'Settings',
      //     url: '/settings',
      //     icon: 'S',
      //     access: '1'
      //   },
      //   {
      //     title: "Doctor's Profile",
      //     url: '/doctorprofile',
      //     icon: 'P',
      //     access: '1'
      //   },
      //   {
      //     title: 'Contact Us',
      //     url: '/contactus',
      //     icon: 'C',
      //     access: '1'
      //   },
       
      //   // {
      //   //   title: 'Doctor Profile',
      //   //   url: '/doctorprofile',
      //   //   icon: 'md-contact'
      //   // },
      //   // {
      //   //   title: 'Settings',
      //   //   url: '/settings',
      //   //   icon: 'md-settings'
      //   // },
      //   // {
      //   //   title: 'Send your FeedBack',
      //   //   url: '/feedback',
      //   //   icon: 'md-paper'
      //   // },
      //   // {
      //   //   title: 'feedback',
      //   //   url: '/feedback',
      //   //   icon: 'N'
      //   // }
      // ];

      // this.labels = [
      //   {
      //     title: 'Settings',
      //     url: '/settings',
      //     icon: 'md-settings'
      //   },
      //   {
      //     title: 'How to use',
      //     url: '/how',
      //     icon: 'md-alert'
      //   },
      
      //   {
      //     title: 'Doctor Profile',
      //     url: '/doctorprofile',
      //     icon: 'md-contact'
      //   },
      // ]
    }
    else{
      this.Apppages = this.fullData.result.Ionic
      console.log(this.Apppages)
    //   this.Apppages = [
    //     {
    //       title: 'Dashboard',
    //       url: '/dashboard',
    //       icon: 'H'
    //     },
    //     {
    //       title: 'Appointments',
    //       url: '/appointment',
    //       icon: 'A'
    //     },
    //     {
    //       title: 'Book Appointment',
    //       url: '/bookapp',
    //       icon: 'B'
    //     },
    //     // {
    //     //   title: 'Contact Us',
    //     //   url: '/contactus',
    //     //   icon: 'md-contact'
    //     // },
    //     // {
    //     //   title: 'How To Use Umdaa?',
    //     //   url: '/how',
    //     //   icon: 'md-hammer'
    //     // },
    //     // {
    //     //   title: 'Doctor Profile',
    //     //   url: '/doctorprofile',
    //     //   icon: 'md-contact'
    //     // },
    //     // {
    //     //   title: 'Send your FeedBack',
    //     //   url: '/feedback',
    //     //   icon: 'md-paper'
    //     // },
    //     // {
    //     //   title: 'Notifications',
    //     //   url: '/notification',
    //     //   icon: 'md-notifications'
    //     // }
    //   ];
     }
  }

  // checkAccess(){
  //   let uInfo = JSON.parse(localStorage.getItem('data'))
  //   uInfo = uInfo.result.Ionic
  //   if(uInfo.length > 0){
  //     for(var i = 0;i < uInfo.length;i++){
  //       this.urls.push(uInfo[i].url)
  //     }
  //   }
  //   if(this.urls.indexOf(this.router.url) == -1){
  //     this.router.navigateByUrl(uInfo[0].url)
  //   }
  // }

  changeClinic(clinic){
    this.default_clinic = clinic.clinic_name;
    let docDetails = this.docInfo
    docDetails['clinic_id'] = clinic.clinic_id
    docDetails['clinic_name'] = clinic.clinic_name
    let total = this.fullData
    total['result']['clinic_id'] = clinic.clinic_id
    total['result']['doctor_details']['clinic_id'] = clinic.clinic_id
    total['result']['doctor_details']['clinic_name'] = clinic.clinic_name

    localStorage.setItem('data', JSON.stringify(total))
    console.log(total)
    localStorage.setItem('info', JSON.stringify(docDetails))
    window.location.reload()
  }

  openPopup(title){
    this.dialog.open(AccesspopupComponent,{
      panelClass: ['access'],

      width: '800px',
      data: title
    })
  }

  checkTimer(){
    let check = localStorage.getItem('online')
    console.log("Naveen"+check)
    if(check == "1"){
      let time = localStorage.getItem("onlineTime")
      console.log(time)
      let created_on = localStorage.getItem('onlineCreated');
      console.log(created_on)
      created_on = created_on.slice(1,-1)
      let presentTime = new Date()
      var exatPresent = presentTime.getHours()+":"+(presentTime.getMinutes()<10?'0':'')+presentTime.getMinutes();
      console.log(exatPresent)
      let convertedHrs = (parseInt(time)*60)-10;
      console.log(convertedHrs)
      let popupTime = new Date(new Date(created_on).getTime() + convertedHrs * 60000);
      console.log(popupTime.getHours(),popupTime.getMinutes())
      var exactpopTime = popupTime.getHours()+":"+(popupTime.getMinutes()<10?'0':'')+popupTime.getMinutes()
      let closetime = (parseInt(time)*60)
      console.log(closetime)
      let offline =  new Date(new Date(created_on).getTime() + closetime * 60000);
      console.log(offline.getHours()+":"+offline.getMinutes())
      var exactoffline = offline.getHours()+":"+(offline.getMinutes()<10?'0':'')+offline.getMinutes()

      console.log("present",exatPresent)
      console.log("pop",exactpopTime)
      console.log("offline",exactoffline)
      



      if(exatPresent === exactpopTime){
        alert("your online avalibilty for tele consultation will expire in 10 Minutes if you want to extend the time do it in home page  ");
      }
      if(exatPresent === exactoffline){
        alert("time out")
        var tele = "tele"
        this.appointmentService.offlinetele(tele).subscribe((data)=>{
          console.log(data)
          if(data['code'] =="200"){
            localStorage.removeItem('online');
            localStorage.removeItem('onlineTime');
            window.location.reload()
  
          }
        })
      }
      else{

      }
    }
  }


  ionViewWillEnter(){
    
  }

  // async userDetails(){
  //   let userData = JSON.parse(await this.storageData.get('data'))
  //   //this.userDetails = (userData["result"]["doctor_details"]);
  //   console.log(userData ['result'].email)
  //   this.userDetails = userData ['result']
  //  }
    
//   logout() {
//     this.presentAlert();
//     // remove user from local storage to log user out
//     // localStorage.removeItem('data');
//     // this.navCtl.navigateRoot('/login');
//     // this.login_form.reset();

//     // if(){
      
//     // }
// }

// async presentAlert() {
//   let alert = this.alrtctl.create({
//     cssClass:['alertLogCss'],
//     message: "Are You Sure To Logout?",
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: (blah) => {
//           console.log('Confirm Cancel: blah');
//         }
//       }, {
//         text: 'Okay',
//         handler: () => {
//           localStorage.removeItem('data');
//           //window.location.reload()
//            //this.navCtl.navigateRoot('/login');
//           // this.router.navigateByUrl('').then(() => {
//             //this.router.navigateByUrl('/login');
//             //console.log('naviate to any route which you want');
//       //});
//            //this.router.navigateByUrl()
//           // this.navCtl.setDirection('root');
//           // this.navCtl.navigateRoot('/login'); 
//            this.navCtl.navigateBack(['/login'],{state: {logout: true}});
//         }
//       }
//     ],
    
//   });
//   (await alert).present();
// }

canActive(page){

  return page = this.activepage
}
openPage(page){
  console.log(page)
  
  this.activepage = page.url
}

}
