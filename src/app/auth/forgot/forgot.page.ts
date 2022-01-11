import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ForgotService } from 'src/app/service/forgot.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DashboardPage } from 'src/app/pages/dashboard/dashboard.page';
import { AppRoutingPreloaderService } from 'src/app/service/app-routing-preloader.service';
import { Storage } from '@ionic/storage';  
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  resultdata: any;
  forgot_form: FormGroup;
  otp: any=[];
  forgot_form_otp: FormGroup;
  submitted: boolean = false;
 
  remaining:any =120
  m: string | number;
  s: string | number;

  timeLeft: number = 120;
value:any;
  counter;
  interval = 1000;
  resend: boolean = false;
  timer:boolean = false;
  constructor(private storedData :Storage,private zone:NgZone,private forgot:ForgotService,private fb:FormBuilder , private router:Router, private alertctrl:AlertController,private navctrl:NavController,private routingService:AppRoutingPreloaderService) { }
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  ngOnInit() {
    // location.reload();
    this.forgot_form = new FormGroup({
      mobile:new FormControl('',Validators.compose([Validators.maxLength(10),
        Validators.minLength(10)])),
      //otp:new FormControl('')
    })
    this.forgot_form_otp = new FormGroup({
      otp:new FormControl('')
    })
    
    
  }
  onOtpChange(otp) {
    console.log(otp);
    if(otp.length == 6){
   if(otp ==  this.otp)
    
     {
      
          this.zone.run(()=>{
            // formDirective.resetForm();
            this.router.navigateByUrl('/re-password')
          })
      
     
     }
     else{
           this.presentAlert('Otp Invalid Please Try Again..');
         
     }
    }
  }
  get f() { return this.forgot_form.controls; }


  ionViewDidLoad(){
    var msg =  this.resultdata.message
    this.presentAlert(msg)
  }
  



  Doforgot(data,formDirective:FormGroupDirective){
  
    
      if(data.mobile == ''){
       
        // this.submitted = true
        // console.log(data.mobile)
        this.presentAlert('Please Enter Mobile Number')
      }
    if (data.mobile != '') {
      // this.startTimer()
      this.forgot.forgotpost(data).subscribe((data)=>{
        this.resultdata = data;
        if(data['code']=="200"){
          this.storedData.set('updatePass',JSON.stringify(this.resultdata));
          console.log(data);
          this.counter = 120;
          this.timer = true;

        }
        
        if (data['code'] == "404") {
          this.presentAlert("User Doesn’t Exists")
        }
         this.otp = this.resultdata['result'].otp;
        
          console.log(this.otp)
       
       })
    }
    
    
   
  }
  checkOtp(data,formDirective:FormGroupDirective){
    console.log(data.otp);
    if(data.otp == ''){
      this.presentAlert('Please Enter Valid Otp Number')
    }
    else if(data.otp ==  this.otp)
    
     {
      
          this.zone.run(()=>{
            formDirective.resetForm();
            this.router.navigateByUrl('/re-password')
          })
      
     
     }
     else{
           this.presentAlert('Otp Invalid Please Try Again..');
         
     }
  }
  async presentAlert(msg) {
    const alert = this.alertctrl.create({
      cssClass:['alertLogCss'],
      message: msg,
     
      buttons: [
        {
          
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          
          }
        }, {
          text: 'Ok',
          handler: (data) => {

         
          }
        }
      ],
      
    });
    (await alert).present();
  }

}
