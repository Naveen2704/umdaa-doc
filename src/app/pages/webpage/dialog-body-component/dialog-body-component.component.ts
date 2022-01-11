import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/service/notification.service';
export interface Title {
  value: string;
  viewValue: string;
}
export interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-body-component',
  templateUrl: './dialog-body-component.component.html',
  styleUrls: ['./dialog-body-component.component.scss'],
})
export class DialogBodyComponentComponent implements OnInit {
  public myImgUrl : string ="assets/icons/default.jpg";
  patientDetails: any=[];

  imageUrls: any;
  fileToUpload: File;
  imageUrl: any;
  isSubmitted: boolean;
  app_id: any;
  constructor(  private patientservice:UserService,public dialogRef: MatDialogRef<DialogBodyComponentComponent>,@Inject(MAT_DIALOG_DATA) public data,private notification:NotificationService) 
  { 
    console.log(data)
    this.app_id = data.appoinment_id
  }

  ngOnInit() 
  {
     this.getPatientInfo( this.data)
  }
  form = new FormGroup({
    $key:new FormControl(null),
    title:new FormControl(''),
    first_name:new FormControl('',[Validators.required]),
    last_name:new FormControl(''),
    age:new FormControl(''),
    gender:new FormControl(''),
    mobile:new FormControl('', Validators.compose([Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[6-9]\\d{9}')],)),
    // email:new FormControl('',[Validators.required,Validators.email]),
    email:new FormControl(''),
    location:new FormControl(''),
    file_i:new FormControl('')
  });
  titles: Title[] = [
    {value: 'Mr', viewValue: 'Mr'},
    {value: 'Mrs', viewValue: 'Mrs'},
    {value: 'MISS', viewValue: 'MISS'},
    {value: 'MASTER', viewValue: 'MASTER'},
    {value: 'BABY', viewValue: 'BABY'},
   
  ];

  genders:Gender[] =[
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Others', viewValue: 'Others'},
  ]
  close() {
    this.dialogRef.close();
  }
  getPatientInfo(data){
    this.patientservice.GetDetails_PE(this.data).subscribe(data =>{
      console.log(data.result);
      this.patientDetails = data.result
      const input =  this.patientDetails.photo;
       const [name, street, unit, city, state, zip,image] = input.split('/');
       this.imageUrls = image;
        
    })
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}
  onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.imageUrl = event.target.result;
      console.log(this.imageUrl)
    }
    reader.readAsDataURL(this.fileToUpload)
}

submit(data){
  console.log(data)
  console.log(this.fileToUpload)

  this.isSubmitted = true;
  if (!this.form.valid ) {
    return false;
  }
else{
  this.patientservice.updateDetails(data,this.fileToUpload,this.data).subscribe(res =>{
    console.log(res)
    if(res['code']=='200'){
      this.notification.success('Profile Updated Successfully');
     // this.get()
      this.close();
     // this.service.patientInfo = res
    //  this.getPatientInfo();
    }else{
      this.notification.error('Profile Updated Failed')
    }
  })
  }

}
}
