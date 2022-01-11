import { Component, OnInit ,NgZone} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password-validator';
import { PassswordupdateService } from 'src/app/service/passswordupdate.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'; 
@Component({
  selector: 'app-edit-docs-profile',
  templateUrl: './edit-docs-profile.page.html',
  styleUrls: ['./edit-docs-profile.page.scss'],
})
export class EditDocsProfilePage implements OnInit {

  repassword_Form:FormGroup
  pasword_matching_group : FormGroup;
  match_password: FormGroup;
  matching_passwords_group: FormGroup;
  validations_form: FormGroup;
  updatedpassword: any;
  closes:boolean=false;
  closess:boolean =false;
  
  constructor(private storedData:Storage,private zone:NgZone,private root:Router, private fb:FormBuilder,private passwordUpdate:PassswordupdateService ,private alertctrl:AlertController,private navCtl:NavController) { }

  ngOnInit() {
    
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required
       // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        
      ]))
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    })

    this.validations_form = this.fb.group({
     
      matching_passwords:  this.matching_passwords_group
        
      });
    
}

 validation_messages = {
    
  'password': [
    { type: 'required', message: 'Password is required.' },
  ],
  'confirm_password': [
    { type: 'required', message: 'Confirm password is required.' }
  ],
  'matching_passwords': [
    { type: 'areEqual', message: 'Password mismatch.' }
  ]
   
}
passwordType: string = 'password';
passwordIcon: string = 'eye-off';

hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

  async repassword(data){


  // console.log(data.matching_passwords.password)
  // if (data.matching_passwords.password == '') {
  //   this.presentAlert_1('Please Enter Password..')
  // }
  if(!this.validations_form.valid){
    this.presentAlert_1('Password is Required')
    // this.presentAlert_1('Should Contain one small,capital and number with 8 Characters')
  
  }
  else{
    (await this.passwordUpdate.p_update(data)).subscribe((data)=>{
      this.updatedpassword = data;
      console.log(this.updatedpassword)
      if(this.updatedpassword["code"]=="200"){
      
        this.presentAlert(this.updatedpassword["message"])
      }
  
    })
  }

}

async presentAlert_1(msg) {
  const alert = this.alertctrl.create({
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
        handler: (data) => {
          this.zone.run(()=>{
           // this.root.navigateByUrl('/login')
           this.matching_passwords_group.reset()
          })
          // this.navCtl.navigateRoot('/login');
         
        }
      }
    ],
    
  });
  (await alert).present();
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
          //console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: (data) => {
          this.zone.run(()=>{
            this.root.navigateByUrl('/doctorprofile')
          })
          // this.navCtl.navigateRoot('/login');
         
        }
      }
    ],
    
  });
  (await alert).present();
}

check(e)
{
  this.closes = true;
  this.closess = true;
  var format =/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // console.log(format.test(e.target.value));

    if(format.test(e.target.value) == true)
    {
      this.closes =false;
    }

    if(e.target.value.length >= 8)
    {
      this.closess =false;
    }
}
}
