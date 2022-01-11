import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { AlertController, NavController } from '@ionic/angular';
import { DoctorprofileService } from './doctorprofile.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.page.html',
  styleUrls: ['./doctorprofile.page.scss'],
})
export class DoctorprofilePage implements OnInit {
  Doctor :any=[];
  detailsForm:FormGroup;
  response: any=[];
  upadatedData: any=[];
  response1: any=[];
  userDetails: Promise<any>;
  updatedEmail: any=[];
  updatedLocation: any=[];
  updatedRegister: any=[];
  data: any=[];
  updatemobile: any;
  changedvalues: any;
  new: any=[];
  fileToUpload: File = null;
  // imageUrl: any;
  public imageUrl : string='';
  profile: string;
  mainImage: string;
  

constructor(private  alrtctl:AlertController,private zone:NgZone, public navCtrl:NavController,private fb:FormBuilder, private loader:LoaderService,private dp:DoctorprofileService,private alrt:AlertController,private storedData:Storage) { }

  async ngOnInit() {
 this.detailsForm = new FormGroup({
 first_name: new FormControl(''),
 last_name: new FormControl(''),
 qualification:new FormControl(''),
 email: new FormControl(''),
 mobile: new FormControl(''),
 registration: new FormControl(''),
 location:new FormControl(''),
 department_name: new FormControl(''),
 clinic_name: new FormControl(''),
 file_i: new FormControl(''),


});
this.userDetails = JSON.parse(localStorage.getItem('info'))
this.response = this.userDetails;

this.dp.responce = this.response;
console.log(this.response)
if(this.response.profile_image == '')
{
  this.mainImage ='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRXp-arsd8amrwUNzkRHXfn5g4vtHVPxIpR8SVIo1engK96T_ER';
}
else
{
  this.mainImage =this.response.image;
}
}

logout() {
  this.presentAlertt();
}

onFileSelect(files: FileList) {
  this.fileToUpload = files.item(0);
  var reader = new FileReader();
  reader.onload = (event:any) =>{
    this.imageUrl = event.target.result;
    console.log(this.imageUrl);
  }
  reader.readAsDataURL(this.fileToUpload)
}

async presentAlertt() {
let alert = this.alrtctl.create({
  cssClass:['alertLogCss'],
  message: "Do you really want to logout ?",
  buttons: [
    {
      text: 'YES',
      handler: () => {
        this.zone.run(()=>{
          localStorage.removeItem('data')
          localStorage.removeItem('roleId')
          this.navCtrl.navigateRoot('/login');
        })
      }
    },
    {
      text: 'NO',
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

submit(data) {

  // console.log(this.response.email)
// this.updatedEmail = this.Doctor.email;
// console.log(this.updatedEmail);
// this.updatemobile = this.Doctor.mobile;
// this.updatedLocation = this.Doctor.location;
// this.updatedRegister = this.Doctor.registration;

// this.data = new Array();

// this.data['email'] = this.updatedEmail;
// this.data['mobile'] = this.updatemobile ;
// this.data['location'] = this.updatedLocation ;
// this.data['registration'] = this.updatedRegister;
console.log(data)
this.loader.loadingPresent();
this.dp.editdoctorprofiile(data, this.fileToUpload).subscribe((res)=>{
  //localStorage.setItem('data',JSON.stringify(this.upadatedData))
 console.log(res);
 this.profile = res.result.profile_image
 console.log(this.profile)
// var x = JSON.parse(localStorage.data)

// this.changedvalues = this.upadatedData.result.doctor_details
// console.log( this.changedvalues  )
// for (var i = 0; i < x.length; i++) {
//     if (res.first_name === this.changedvalues[i].first_name ) {
//       this.changedvalues[i].first_name = "love"
//       break;
      
//     }
//     this.new = localStorage.setItem('data',JSON.stringify(x))
//       console.log(this.new)
//   }

if(res['code']=="200"){
  this.loader.loadingDismiss();
  this.presentAlert();
  this.dp.updateprofile(this.response).subscribe(data =>{
    console.log(data)
    if(data['code']=='200'){
      localStorage.removeItem('info');
      localStorage.setItem('info',JSON.stringify(data.result))
      this.response = data.result
    }
    
  })
}

})
}

async presentAlert() {
const alert = await this.alrt.create({
header: 'Alert',
//subHeader: 'Subtitle',
message: 'Successfully updated Profile',
buttons: ['OK']
});

await alert.present();
}

}
