import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl, FormGroupName } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-validator';
import { AuthService } from '../../service/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular'
import { SelectService } from '../../service/select.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group : FormGroup;
  responceData:any = [];
  public optionsList:any=[];
  selectedAreas: string[] = this.optionsList;
  optionsDepart:any=[];
  submitted: boolean;
  showSpinner :any  = false;
  loaderToShow: any;
  loading: any;
  timeoutTime: number;

  slectedvalue: any;
  addnew: boolean;
  addnewdeprtment: boolean;
  slecteddepvalue: any;
  declaration: boolean = true;
  filter: string;
  variables2 = [{ id: '', clinic_name: "" }];
  variables3 = [{ id: '', department_name: "" }];
  // filteredList5: any[];
  // public variables2 = [{ id: 0, name: "One" }, { id: 1, name: "Two" }];

  public filteredList5 = this.variables2.slice();
  public filteredList6 = this.variables3.slice();
  hide:boolean;
  clinic_group: FormGroup;
  constructor(public formBuilder: FormBuilder,private auth:AuthService,public navCtl:NavController,public select:SelectService, private alertctrl:AlertController, private router:Router,private loadingctrl:LoadingController , public loader:LoaderService,public zone:NgZone) {
    this.dropDown();
    
  }

 
  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46 ) {
      
      return true 
    }
    else {
        return false
    }
}

  ngOnInit() {
    this.dropDown();
    // this.dropDown();
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
      //  Validators.minLength(5),
       // Validators.maxLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$')
        
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.clinic_group = new FormGroup({
      clinic_name: new FormControl('', Validators.required),
      clinic_location:new FormControl('', Validators.required),
    })

    this.validations_form = this.formBuilder.group({
      
      firstname: ['', Validators.required],
      lastname: [''],
      reg:['',Validators.required],
      email: ['', Validators.compose([

          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
      matching_passwords: this.matching_passwords_group,
       mobile: ['', Validators.compose([
          Validators.pattern('[6-9]{1}[0-9]{9}'),
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.required
        ])],
        qualification: [''],
        clinic_id: ['',Validators.required],
        department_id: ['',Validators.required],
        department_name:[''],
        clinic_info:this.clinic_group,
        // fo:[''],
        // ph:[''],
        // la:[''],
        // nu:['']
        
      });
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  passwordType_c: string = 'password';
  passwordIcon_c: string = 'eye-off';
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideShowPassword_c() {
    this.passwordType_c = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon_c = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
  get f() { return this.validations_form.controls; }

  validation_messages = {
    
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Should Contain one small one special char,capital and number with 8 Characters' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
     
  };
  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    // if (!pattern.test(event.target.value)) {
    //   event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    //   // invalid character, prevent input

    // }
  }
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  

  signUp(data){
    console.log(data)
    
    if (!this.validations_form.valid ) {
          return false;
       }
       else{
              this.loader.loadingPresent();
      this.auth.postData(data).subscribe((data)=>

        {
          
          if(data["code"]=="200")
          {
            this.responceData = data;
            console.log(this.responceData)
            this.loader.loadingDismiss();
            // Swal.fire('','Registered successfully Login with Email or Mobile', 'success')
            this.presentAlert("Registered successfully Login with Email or Mobile");
            
          }else{
            this.loader.loadingDismiss();
            return  this.presentAlert2(data["message"]);  
            // Swal.fire('',data["message"], 'error')
          }
        });
 
       }
  }
  
// signUp(data)

// {
//   console.log(data);
//   this.submitted = true;
//   if (!this.validations_form.valid ) {
//     return false;
//   }else{
//     if(data.first_name && data.registration_code && data.email && data.mobile ){

//       this.loader.loadingPresent();
//       this.auth.postData(data).subscribe((data)=>

//         {
          
//           if(data["code"]=="200")
//           {
//             this.responceData = data;
//             console.log(this.responceData)
//             this.loader.loadingDismiss();
//             this.presentAlert("Registered successfully Login with Email or Mobile");
            
//           }else{
//             this.loader.loadingDismiss();
//             return  this.presentAlert(data["message"]);  
            
//           }
//         });
 
    
// }else{

// }
//   }


// }




// async signUp(data) {

//   if(this.submitted = true){
//     return;
//   }
//   const loader = await this.loadingctrl.create({
//     message: 'Loading...',
//   });
//   loader.present().then(() => {               // show loader
//     this.auth.postData(data).subscribe(res => {
//        if(res["code"]=="200"){
//         this.responceData = res;
//         loader.dismiss();  
//         this.presentAlert("Thank You for succesful Registration with Us"); 
//       } else{
//         return  this.presentAlert(res["message"]); 
//       }
//     },
// );

//                           // dismiss loader
//   });
// }

dropDown() {
  this.select.dropDown().subscribe((data: any) => {
    // console.log(data["result"]["clinics"]);
     this.optionsList = data["result"]["clinics"];
     this.variables2 = data["result"]["clinics"];
    //  this.filteredList5 = this.variables2.slice();
    console.log(this.optionsList);
     //console.log(this.slectedvalue);
     this.optionsDepart = data["result"]["departments"];
     this.variables3 = data["result"]["departments"];
 
  });
}

search(query: string){
  console.log('query', query)
  let result = this.selected(query)
  this.optionsList = result
}

selected(query: string):string[]{
  let result: string[] = [];
  for(let a of this.optionsList){
    if(a.clinic_name.toLowerCase().indexOf(query) > -1){
      result.push(a)
    }
  }
  return result
}

async presentAlert(msg) {
  let alert = this.alertctrl.create({
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
        handler: () => {
          this.zone.run(()=>{
            this.navCtl.navigateRoot('/login');
          })
         
          // this.navCtl.navigateRoot(LoginPage, {}, {animate: true, direction: 'forward'});
        }
      }
    ],
    
  });
  (await alert).present();
}
async presentAlert2(msg) {
  let alert = this.alertctrl.create({
    cssClass:['alertLogCss'],
    message: msg,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.zone.run(()=>{
         
          })
         
          // this.navCtl.navigateRoot(LoginPage, {}, {animate: true, direction: 'forward'});
        }
      }
    ],
    
  });
  (await alert).present();
}
declare(e){
  console.log(e.checked)
  if(e.checked == true){
    this.declaration = false;
  }else{
    this.declaration = true;
  }
 
}

checkClincValue(event)

{ 
  console.log(event.value)
  this.slectedvalue = event.value;
  //console.log(this.slectedvalue);
  if(this.slectedvalue == 0)
  {
    this.addnew = true;
    this.validations_form.controls['clinic_info'].get('clinic_name').setValidators(Validators.required);
    this.validations_form.controls['clinic_info'].get('clinic_location').setValidators(Validators.required);
    this.validations_form.controls['clinic_info'].get('clinic_name').updateValueAndValidity();
    this.validations_form.controls['clinic_info'].get('clinic_location').updateValueAndValidity();
  }else{
    this.addnew = false;
    this.validations_form.controls['clinic_info'].get('clinic_name').clearValidators();
    this.validations_form.controls['clinic_info'].get('clinic_location').clearValidators();
    this.validations_form.controls['clinic_info'].get('clinic_name').updateValueAndValidity();
    this.validations_form.controls['clinic_info'].get('clinic_location').updateValueAndValidity();
  }
}

checkDeprtValue(event){
  this.slecteddepvalue = event.value;
 // console.log(event.detail.value);
  if(this.slecteddepvalue == 0)
  {
    this.addnewdeprtment = true;
  }else{
    this.addnewdeprtment = false;
    return this.validations_form.valid
  }
}

}


