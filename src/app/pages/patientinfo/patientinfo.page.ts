import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { AccesspopupComponent } from '../accesspopup/accesspopup.component';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.page.html',
  styleUrls: ['./patientinfo.page.scss'],
})
export class PatientinfoPage implements OnInit {
   fullData: any=[];
  appPages: any=[];


  constructor( private dialog: MatDialog,private auth:AuthService,private zone: NgZone,private route: ActivatedRoute,public router:Router,private navCtrl: NavController,private alrtctl:AlertController,private loader:LoaderService) 

  { }

  ngOnInit() {
     this.fullData = JSON.parse(localStorage.getItem('data'));
     console.log(this.fullData)
     this.appPages = this.fullData.result.Ionic;
     
  }

  
  logout() {
    this.presentAlert();
}
openPopup(title){
  this.dialog.open(AccesspopupComponent,{
    width: '800px',
    data: title
  })
}
signout(){
  this.auth.Logout().subscribe((res)=>{
    console.log(res)
    if(res['code']== 200){
      localStorage.removeItem('data');
    }
  })
}
async presentAlert() {
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
            this.signout()
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
      }
    ],
    
  });
  (await alert).present();
}


}
