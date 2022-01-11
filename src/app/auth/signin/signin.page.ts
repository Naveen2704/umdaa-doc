import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AppRoutingPreloaderService } from 'src/app/service/app-routing-preloader.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  login_form: FormGroup;
  responceData: any;
  hide:boolean;
 
  constructor(public modalCtrl: ModalController,private loader:LoaderService,private ngZone:NgZone,private sharedData:SharedDataService,  public formBuilder: FormBuilder,private navCtrl:NavController, private auth:AuthService, private toastCtrl:ToastController,private router:Router,private alertCtrl:AlertController ,private LoadingCtrl:LoadingController,private routingService:AppRoutingPreloaderService) 
  { 
    
  }
  ngOnInit() {
    this.login_form = this.formBuilder.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
  
      });
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login(data,formDirective:FormGroupDirective){
    console.log(data)
          //  this.formSubmitAttempt = true;  
           if (!this.login_form.valid ) {
            return false;
          }
          else{
            if(data.email && data.password ){
              this.loader.loadingPresent();
              this.auth.getData(data).subscribe((data)=>{
              this.responceData = data;
              
                if(data["code"]=="200")
                {
                  this.loader.loadingDismiss();
                  // formDirective.resetForm();
                  this.login_form.reset();
                  this.login_form.get('email').clearValidators();
                  this.login_form.get('email').updateValueAndValidity(); 
                  this.login_form.get('password').clearValidators();
                  this.login_form.get('password').updateValueAndValidity(); 
                 
                  localStorage.setItem('data',JSON.stringify(this.responceData));
                  localStorage.setItem('roleId',(this.responceData['result'].profile_id));
                  localStorage.setItem('info',JSON.stringify(this.responceData['result']['doctor_details']))
                  // localStorage.setItem('data',JSON.stringify(this.responceData));
                 
                  this.ngZone.run(()=>{
                    this.dismiss();
                    this.navCtrl.navigateRoot('/dashboard');
                   // this.router.navigateByUrl('/dashboard');
                     
                  })
                 
                  console.log(this.responceData)
                }
                else{
                  this.loader.loadingDismiss();
                      // this.presentAlert(data["message"]); 
                      Swal.fire('',data["message"],'error')
                      this.dismiss()
                }
              });
            }
          }
           
  }
  forgot(){
    this.dismiss();
    this.router.navigateByUrl('/forgot');
  }
}
