import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { SelectService } from 'src/app/service/select.service';
import { PasswordValidator } from 'src/app/validators/password-validator';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group : FormGroup;
  responceData:any = [];
  optionsList:any=[];
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

  variables2 = [{ id: 0, clinic_name: "Enter clinic Name" }];
  variables3 = [{ id: 0, department_name: "Enter Department Name" }];
  // filteredList5: any[];
  // public variables2 = [{ id: 0, name: "One" }, { id: 1, name: "Two" }];

  public filteredList5 = this.variables2.slice();
  public filteredList6 = this.variables3.slice();
  hide:boolean;
  clinic_group: FormGroup;
  constructor(public modalCtrl: ModalController,private formBuilder:FormBuilder,private auth:AuthService,public loader:LoaderService,public select:SelectService,)
   { 
    this.dropDown();
   }

  ngOnInit() {

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
  declare(e){
    console.log(e.checked)
    if(e.checked == true){
      this.declaration = false;
    }else{
      this.declaration = true;
    }
   
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
            Swal.fire('','Registered successfully Login with Email or Mobile', 'success')
            // this.presentAlert("Registered successfully Login with Email or Mobile");
            
          }else{
            this.loader.loadingDismiss();
            // return  this.presentAlert(data["message"]);  
            Swal.fire('',data["message"], 'error')
          }
        });
 
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
   return this.addnewdeprtment = true;
  }else{
    this.addnewdeprtment = false;
  }
}

dropDown() {
  this.select.dropDown().subscribe((data: any) => {
    this.optionsList = data["result"]["clinics"];
    this.variables2 = data["result"]["clinics"];
   //  this.filteredList5 = this.variables2.slice();
   console.log(this.optionsList);
    //console.log(this.slectedvalue);
    this.optionsDepart = data["result"]["departments"];
    this.variables3 = data["result"]["departments"];
 
  });
}
async dismiss() {
  return await this.modalCtrl.dismiss();
}
  }


