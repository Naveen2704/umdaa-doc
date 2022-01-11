import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment-timezone';
// import { SlotbookingService } from 'src/app/service/slotbooking.service';
// import { Router } from '@angular/router';
// import { DOCUMENT } from '@angular/common'; 
// import { Inject }  from '@angular/core';
// import { AlertController, LoadingController } from '@ionic/angular';
// import { DatePicker } from '@ionic-native/date-picker/ngx';
// import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-appointmentslots',
  templateUrl: './appointmentslots.page.html',
  styleUrls: ['./appointmentslots.page.scss'],
})
 export class AppointmentslotsPage implements OnInit {

 constructor(){}
 ngOnInit(){}
 }

//   momentjs: any = moment; 
//   slots: any=[];
//   addslots: boolean;
//   today= new Date();
//   jstoday = '';
//   day: number;
//   slottimings: any;
//   length: any;
//   doctorTimings: any;
//   timeValue: any;
//   slotsTime: number;
//   timeStops: any=[];
//   length1: any=[];
//   MtimeStops: any=[];
//   AtimeStops: any=[];
//   hide:boolean=false;
//   session1: any=[];
//   afternoonAr: any=[];
//   morningAr: any=[];
//   eveningAr: any=[];
//   disableButton; 
//   time: string;
//   timeResp: any;
//   priority: string;
//   bookingMode: string;
//   bookingDate: string;
//   data: any;
//   sms: string;
//   public form = [
//     { val: '1', isChecked: true },
  
//   ];
//   bookedSlots: any;
//   clickedDate: string;
//   convertedDate: Date;
//   bs: any;
//   bslength: number;
//   isenabled:boolean=false;
//   session: string;
//   constructor(private datePicker: DatePicker,@Inject(DOCUMENT) document,public alrtctl:AlertController,private slotbooking: SlotbookingService, private router: Router,private loader:LoaderService) {
// }
// minDate: string = new Date().toISOString();
// selectedDate: string = new Date().toISOString();

//   ngOnInit () {
//    console.log(this.minDate)
//  this.createSlots();
      
// }
// date(event)
// {
// this.slots = event.detail.value;
// if (this.slots == null) {
//   return this.addslots = false;
// } else {
//   this.addslots = true;
// }

// }

// myDate: String = new Date().toISOString();
// selctedDate(event){
//   console.log(event.detail.value)
// }
//   async trueclick(timingss1,timingss2,timingss3){
//   // this.session = (<HTMLInputElement>document.getElementsByClassName('button_bg')).value
//   this.priority = (<HTMLInputElement>document.getElementById('priority')).value;
//   // this.sms = document.getElementById('sms').value;
//   this.bookingMode = (<HTMLInputElement>document.getElementById('bookingMode')).value;
//   this.bookingDate = (<HTMLInputElement>document.getElementById('bookingDate')).value;
//   this.time= timingss1+":00",timingss2+":00",timingss3+":00";
//   this.bookingDate = this.bookingDate.substr(0,10);
//   if((<HTMLInputElement>document.getElementById('sms')).checked){
//     this.sms = "1";
//   }
//   else{
//     this.sms = "0";
//   }
//   // console.log(this.priority+ " - "+ this.bookingMode+" - "+ this.bookingDate+" - "+this.time)
//   this.data = new Array();
//   this.data['sms'] = this.sms
//   this.data['priority'] = this.priority;
//   this.data['bookingMode'] = this.bookingMode;
//   this.data['bookingDate'] = this.bookingDate;
//   this.data['time'] = this.time;
//   //console.log(this.data)
//   (await this.slotbooking.slotTime(this.data)).subscribe((res)=>{
//     this.timeResp = res;
//     console.log(this.timeResp);
//     return this.presentAlert(this.timeResp["message"]);
//   })
//   }
  
//   async createSlots(){
//     this.clickedDate = (<HTMLInputElement>document.getElementById('bookingDate')).value;
//     if(this.clickedDate == null)
//     {
//       var month = new Date().getMonth() + 1;
//       this.clickedDate = new Date().getFullYear()+"-"+month+"-"+new Date().getDate();
//       this.convertedDate = new Date(this.clickedDate);
//     }
//     else
//     {
//       this.clickedDate = this.clickedDate.substr(0,10);
//       this.convertedDate = new Date(this.clickedDate);
//     }
  
//     //console.log(this.clickedDate);
  
//     //console.log(this.convertedDate);
//     this.loader.loadingPresent();
//     (await this.slotbooking.getslots())
//       .subscribe((data) => {
//         this.slots = data;  
//         console.log(this.slots)
//          //console.log(this.slots['result']['doctor']['clinics']['working_days'].length-1);
//         this.bookedSlots = this.slots['result']['booked_slots'];
//          console.log(this.bookedSlots);
//         this.slottimings = this.slots['result']['doctor']['clinics']['working_days'];
//          console.log(this.slottimings);
//         // console.log(this.today.getDay());
//         this.day = this.convertedDate.getDay();
//         // console.log(this.day)
//         for(var i=0;i<=this.slottimings.length-1;i++)
//         {
//           // this.bs = this.bookedSlots[i]['time_slot'];
//           // console.log(this.bs);
//           // if(this.slottimings[i].dayNum == this.day)
//           // {
//              this.length1 = this.slottimings[i].timings;
//             //  console.log(this.length1); // working day timings and session
//               // console.log(this.length1.length);
//               for(var n=0;n<this.length1.length;n++)
//               {
//                 var ar1 = this.length1[n];
//                 var times = this.length1[n].schedule.split("-");
//                 var start = times[0];
//                 var end = times[1];
//                 this.timeStops[n] = this.getTimeStops(start, end);
               
//               }
              
//                console.log("Times"+this.timeStops);          
//           // }
//         }
//         // console.log(this.day)
//         this.morningAr = this.timeStops[0];
//         this.afternoonAr = this.timeStops[1];
//         this.eveningAr = this.timeStops[2];
        
//         this.loader.loadingDismiss();
//         console.log(this.bookedSlots.length)
//         this.bslength = this.bookedSlots.length-1;
//         if(this.bslength!=null)
//         {
//           console.log(this.bslength)
//           for(var cd=0;cd<this.bslength;cd++)
//           {
//             if(this.clickedDate == this.bookedSlots[cd]['date'])
//             {
//               this.bs = this.bookedSlots[cd]['time_slot'];
//               console.log(this.bs)

//               if(this.bs!=null)
//               {
//                 for(var c= 0;c<this.bs.length;c++)
//                 {
//                   var split = this.bs[c].split(" ");
//                   var mrindex = this.morningAr.indexOf(split[0]);
//                   if (mrindex > -1) {
//                     this.morningAr.splice(mrindex, 1);
//                     //this.isenabled=false; 
//                   }
//                   var afindex = this.afternoonAr.indexOf(split[0]);
//                   if (afindex > -1) {
//                     this.afternoonAr.splice(afindex, 1);
//                     //this.isenabled=true; 
//                   }
//                   var evindex = this.eveningAr.indexOf(split[0]);
//                   if (evindex > -1) {
//                     this.eveningAr.splice(evindex, 1);
//                     //this.isenabled=true; 
//                   }
//                 }
//               }
               
//             }
            
//           }
//         }
        
//         // var booked = this.morningAr.indexOf(this.bookedSlots[0]['time_slot']);
//       //  console.log(this.afternoonAr);
//       }); 
//   }
//   getTimeStops(start, end){
//     var startTime = moment(start, 'HH:mm');
//     var endTime = moment(end, 'HH:mm');                  
//     if( endTime.isBefore(startTime) ){
//       endTime.add(1, 'day');
//     }                 
//     var timeStops = [];                
//     while(startTime <= endTime){
//         timeStops.push(moment(startTime).format('HH:mm'));
//         startTime.add(5, 'minutes');
//        }
//     return timeStops;
//   }
//   async presentAlert(msg) {
//     let alert = this.alrtctl.create({
//       cssClass:['alertLogCss'],
//       message: msg,
//       buttons: [
//         {
//           text: 'Yes',
//           role: 'Yes',
//           cssClass: 'secondary',
//           handler: (blah) => {
//             console.log('Confirm Cancel: blah');
//           }
//         }, {
//           text: 'No',
//           role:'NO',
//           handler: () => {
//         //     localStorage.removeItem('data');
//         //     //window.location.reload()
//         //      //this.navCtl.navigateRoot('/login');
//         //     // this.router.navigateByUrl('').then(() => {
//         //       //this.router.navigateByUrl('/login');
//         //       //console.log('naviate to any route which you want');
//         // //});
//         //      //this.router.navigateByUrl()
//         //     // this.navCtl.setDirection('root');
//         //     // this.navCtl.navigateRoot('/login'); 
//         //      this.navCtl.navigateBack(['/login'],{state: {logout: true}});
//           }
//         }
//       ],
      
//     });
//     (await alert).present();
//   }
  
// }
