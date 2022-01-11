import { Component, HostListener, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment.service';
import { MatDialog } from '@angular/material';
import { ExpertComponent } from '../webpage/expert/expert.component';
import { ExpertService } from '../webpage/expert/expert.service';
import { ChatComponent } from './chat/chat.component';
import { MychatComponent } from './mychat/mychat.component';
import { AddmoneyComponent } from '../webpage/addmoney/addmoney.component';
import { AlertController, NavController } from '@ionic/angular';
import { SwUpdate ,SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.page.html',
  styleUrls: ['./expert.page.scss'],
  
})

export class ExpertPage implements OnInit {
  introJS = introJs();
  results: any=[];
  userDetails: any;
  doctorid: any;
  ReferredList: any;
  Amount: any;
  myOpinionList: any;
  tranhistory: any=[];
  terms:any;
  msgData: any;
  localdata: any;
  constructor( push: SwPush,private router:Router,private zone:NgZone, public navCtrl:NavController,private appointmentService:AppointmentService,public dialog: MatDialog,private service:ExpertService,private  alrtctl:AlertController)
   { 
    push.messages.subscribe(msg => {
      console.log(msg) 
      console.log('push message',( msg['notification'].click_action))
    var count
    var str = "gcm.notification.lang"
    var type =  msg['notification'].click_action
    console.log(type)
      if(localStorage.getItem(type) == null){
         count = 1;
       
        localStorage.setItem(type, count) 
      }
      else{
        this.localdata = localStorage.getItem(type)
        // var res = this.localdata.type.split('*nvn*')
        count = parseInt(this.localdata)+1;
        localStorage.setItem(type, count) 
      }

     if(msg['notification'].click_action == "Expert Opinion"){
      this.getReferedList()
       this.getRequestedList()
     }else if(msg['notification'].click_action == "Expert Opinion Wallet Updated"){
      this.getWallet();
     }else if(msg['notification'].click_action == "Expert Opinion Requested Received"){
      this.getReferedList()
      this.getRequestedList()
     }
     else if(msg['notification'].click_action == "Expert Opinion Accepted"){
      this.getReferedList()
      this.getRequestedList()
     }
     else if(msg['notification'].click_action == "Expert Opinion Closed"){
      this.getReferedList()
      this.getRequestedList()
     }
     else if(msg['notification'].click_action == "Expert Opinion Rejected"){
      this.getReferedList()
      this.getRequestedList()
     }
     else if(msg['notification'].click_action == "Expert Opinion FI"){
      this.getReferedList()
      this.getRequestedList()
     }
     else if(msg['notification'].click_action == "Expert Opinion Cancelled"){
      this.getReferedList()
      this.getRequestedList()
     }
   })
   push.notificationClicks.subscribe(
    ({ action, notification }) => {
      if (notification && notification !== null){
        this.zone.run(() => {
          console.log('onclick');
          this.router.navigate(['/expert']);
      });
      }
      
    });
    push.notificationClicks.subscribe(
      ({ action, notification }) => {
        if (notification && notification !== null){
          this.zone.run(() => {
            console.log('onclick');
            this.router.navigateByUrl('/expert');
        });
        }
        
      });
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('info'))
    // console.log(this.userDetails)
    this.doctorid = this.userDetails.doctor_id;

    this.getReferedList()
    this.getRequestedList()
    this.getWallet();
    this.getTranhistory()
  }


  help(){
    introJs(document.querySelector("app-expert")).start();
    
  }
  getWallet(){
    this.service.WalletAmount(this.doctorid).subscribe((res)=>{
      console.log(res)
      this.Amount = res.result.walletAmount
      // alert(this.Amount)
    })
  }
  getTranhistory(){
    this.service.WalletHistory(this.doctorid).subscribe((res)=>{
      console.log(res)
      this.tranhistory = res.result.walletHistory
    })
  }
  drugsearch(e){
    console.log(e)
    this.appointmentService.search(e).subscribe(res =>{
      console.log(res)
      this.resetArray()
      this.results = res.result.appointment_list
    })
  }
  resetArray(){
    this.results = ''
  }
  druginfo(item){
    console.log(item)
    if(this.Amount == '0.00'){
      alert('Please Add Wallet Amount');
      
    }else{
      const dialog_ref =
      this.dialog.open(ExpertComponent,
       {
         panelClass: ['expert'],
    
    
         data:item
    
       }
       );
    
       dialog_ref.afterClosed().subscribe(result => {
         ///console.log('The dialog was closed');
          //  this.getPatientInfo(this.id);
          this.getRequestedList()
       });
    }
    
  }

  getReferedList(){
    this.service.getReferedpatients(this.doctorid).subscribe((res)=>{
      console.log(res)

      if(res['code'] == "200"){
        this.ReferredList  = res.result.referred_patient_list;
      }
      else{
        // alert("Error")
      }
    })
  }
  getRequestedList(){
    this.service.getRequestedpatients(this.doctorid).subscribe((res)=>{
      console.log(res)

      if(res['code'] == "200"){
        this.myOpinionList  = res.result.requested_patient_list;
      }
      else{
        // alert("Error")
      }
    })
  }


  view(patientname){
    const dialog_ref =
    this.dialog.open(ChatComponent,
     {
       panelClass: ['myapp-no-padding-dialog-patient'],


       data:patientname

     }
     );

     dialog_ref.afterClosed().subscribe(result => {
      
     });
}
  mychat(patientname){
  const dialog_ref =
    this.dialog.open(MychatComponent,
     {
       panelClass: ['myapp-no-padding-dialog-patient'],


       data:patientname

     }
     );

     dialog_ref.afterClosed().subscribe(result => {
      
     });
  }
  addmoney(){

  //   let url = "http://devumdaa.in/dev/OnlinePayment/eo_payment_webview"
  //  window.open(url ,'_blank')
    const dialog_ref =
         this.dialog.open(AddmoneyComponent,
          {
            panelClass: ['myapp-no-padding-dialog'],
    
            data:{
              docid:this.doctorid,
              amount:this.Amount
            }
            
  
          }
          );
  
          dialog_ref.afterClosed().subscribe(result => {
            // this.getWallet()
           
          });
  }

  accept(expert_id){
    console.log(expert_id);
    this.service.accepted(expert_id).subscribe(result => {
      console.log(result)
      if(result['code']=='200'){
        this.getReferedList()
      }
    })
  }
  reject(expert_id){
    console.log(expert_id);
    this.service.rejected(expert_id).subscribe(result => {
      console.log(result)
      if(result['code']=='200'){
        this.getReferedList()
      }
    })
  }
  cancel(expert_id){
    console.log(expert_id);
    this.service.canceled(expert_id).subscribe(result => {
      console.log(result)
      if(result['code']=='200'){
        this.getRequestedList()
      }
    })
  }
  close(expert_id){
    console.log(expert_id);
    this.service.closed(expert_id).subscribe(result => {
      console.log(result)
      if(result['code']=='200'){
        this.getRequestedList()
      }
    })
  }
  info(){
    this.presentAlertt2()
  }
  async presentAlertt2() {
    let alert = this.alrtctl.create({
      cssClass:['alertLogCss'],
      message: "Amount Will Be Credited after 7 Working Days From Umdaa health Care",
      buttons: [
        
        {
          text: 'Close',
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
  }
 

