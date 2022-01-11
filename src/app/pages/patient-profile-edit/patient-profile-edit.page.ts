import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileupdateService } from './profileupdate.service';
@Component({
  selector: 'app-patient-profile-edit',
  templateUrl: './patient-profile-edit.page.html',
  styleUrls: ['./patient-profile-edit.page.scss'],
})
export class PatientProfileEditPage implements OnInit {
  registerForm: FormGroup;
  titles: string[];
  genders: string[];
  Patient_Edit: any;
  routeSub: any;
  id: any;
  Patient_new: any;
  appointmentsList: any;
  updatedProfile: any;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private profileupdate:ProfileupdateService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',Validators.compose([Validators.required,Validators.maxLength(10),
      Validators.minLength(10)])],
      occupation:[''],
      age:[''],
      gender:[''],
      title:[''],
      location:['',Validators.required],


      //password: ['', [Validators.required, Validators.minLength(6)]]

      
  });

  this.titles = [
    "Mr",
    "Mrs",
    "MISS",
    "MASTER",
    "BABY"
  ];
  this.genders =[
    "MALE",
    "FEMALE",
    "OTHERS",
    
  ];


  this.routeSub = this.route.params.subscribe(res => {
    this.id= res['id'];
    console.log(this.id);

    this.appointmentsList = JSON.parse(localStorage.getItem('appointments'));

    console.log(this.appointmentsList);
    console.log(this.id);

    this.get(this.id);
         
  });

  }

  get(id){
    var filtered = this.appointmentsList.find (function(item){
        return item.patient_id == id ;
    });
  
  
      this.Patient_Edit = filtered;
      console.log(this.Patient_Edit);

      this.profileupdate.Patient_details =  this.Patient_Edit
       
   }
  EditProfileUpdate(data){
    console.log(data)

    this.profileupdate.postData(data).subscribe((res)=>{
      this.updatedProfile = res;
      console.log(this.updatedProfile);
      localStorage.removeItem('appointments')
      let list = localStorage.setItem('appointments',JSON.stringify(this.updatedProfile))
      console.log(list);
    })
  }

}
