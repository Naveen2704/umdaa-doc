import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import{NavController,ToastController, AlertController, LoadingController, ModalController, Platform} from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup , Validators , FormControl, FormGroupDirective } from '@angular/forms';
import { Router,  } from '@angular/router';
import { AppRoutingPreloaderService } from 'src/app/service/app-routing-preloader.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Storage } from '@ionic/storage';
import { LoaderService } from 'src/app/service/loader.service';
import { SigninPage } from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';
import { NotificationsService } from 'src/app/notifications.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {
  authState = new BehaviorSubject(false);
  login_form: FormGroup;
  submitted = false;
  responceData:any;
  loginResponse: any=[];
  hide:boolean;
  @ViewChild('myLogin',{static: true})  formDirective: FormGroupDirective;
  constructor(private platform: Platform,public modalCtrl: ModalController,private loader:LoaderService,private ngZone:NgZone,private storedData:Storage,private sharedData:SharedDataService,  public formBuilder: FormBuilder,private navCtrl:NavController, private auth:AuthService, private toastCtrl:ToastController,private router:Router,private alertCtrl:AlertController ,private LoadingCtrl:LoadingController,private routingService:AppRoutingPreloaderService,private notification:NotificationsService) 
  { 
    
    
  }

  ionViewDidLoad() {
    this.storedData.get('login').then((val)=>{
      console.log('logout after',val)
    })
  }

  
  public formSubmitAttempt: boolean;
  
  ngOnInit() {
    this.checkUserInfo();
    this.storedData.get('login').then((val)=>{
      // console.log('logout after',val)
      if(val != null)
      {
        this.router.navigateByUrl('/dashboard');
      }
    })
    // this.storedData.get('login').then((val)=>{
    //   // console.log('logout after',val)
    //   if(val != null)
    //   {
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // })
    this.login_form = this.formBuilder.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
  
      });
  }
  // ionViewDidLoad(){
  //   window.location.reload()
  // }
  validation_messages = {
      'email': [
      { type: 'required', message: 'Email is required.' }
    ],
    
    
    'password': [
      { type: 'required', message: 'Password is required.' },
      //{ type: 'minlength', message: 'Password must be at least 5 characters long.' },
     // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    
  }
  get f() { return this.login_form.controls; }
 
  login(data,formDirective:FormGroupDirective){
    console.log(data)
           this.formSubmitAttempt = true;  
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
                  this.storedData.set('login',this.responceData);
                  console.log(this.storedData.get('login'));
                  localStorage.setItem('roleId',(this.responceData['result'].role_id));
                  localStorage.setItem('info',JSON.stringify(this.responceData['result']['doctor_details']))
                  // localStorage.setItem('data',JSON.stringify(this.responceData));
                 
                  this.ngZone.run(()=>{
                    // this.router.navigate['/dashboard'];
                    this.auth.authenticated(true);
                    // this.router.navigateByUrl(this.responceData['result']['Ionic'][0].url)
                   this.router.navigateByUrl('/home');
                   this.authState.next(true);
                     
                  })
                 
                  console.log(this.responceData)
                }
                else{
                  this.loader.loadingDismiss();
                      this.presentAlert(data["message"]); 
                }
              });
            }
          }
           
  }
  checkUserInfo()
{
  this.storedData.get('login').then((val) => {
    console.log('Your age is', val);
    if(val != null){
      this.auth.authenticated(true);
    }else{
      this.auth.authenticated(false);
    }
  })
}

  async presentAlert(msg) {
    let alert = this.alertCtrl.create({
      cssClass:['alertLogCss'],
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // this.formDirective.resetForm();
          }
        } 
      ]
      
    });
    (await alert).present();
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  register(){
    this.router.navigateByUrl('/register')
  }

  async signIn()

   {
    const modal = await this.modalCtrl.create({
      component: SigninPage,
      animated: true,
      mode: 'md',
      backdropDismiss: false,
      cssClass: 'login-modal',
    })

    return await modal.present();
  }
  async signUp() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      animated: true,
      mode: 'md',
      backdropDismiss: false,
      cssClass: 'register-modal',
    })

    return await modal.present();
  }
}
