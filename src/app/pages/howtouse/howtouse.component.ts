import { Component, OnInit, NgZone } from '@angular/core';
import { VideoService } from 'src/app/howtouse/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoaderService } from 'src/app/service/loader.service';
import { NavController, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-howtouse',
  templateUrl: './howtouse.component.html',
  styleUrls: ['./howtouse.component.scss'],
})
export class HowtouseComponent implements OnInit {
  videoList: any=[];
  link: any=[];
  // safeUrl:SafeResourceUrl;
  public embedUrl = 'https://www.youtube.com/embed/';
  videoUrl: string;
  title: any;
  ;

  constructor( private service:VideoService, private sanitizer: DomSanitizer,private loader:LoaderService,private zone: NgZone,private navCtrl: NavController,private alrtctl:AlertController) 
  { 
    this.videoUrl =  this.embedUrl 
  }

  ngOnInit() {
   this.getVedio()
  }
  getVedio(){
    this.loader.loadingPresent();
    this.service.getData().subscribe((res) => {
      console.log(res);
      this.videoList = res['result'].tutorial;
      console.log(this.videoList);
      for(var i = 0; i < this.videoList.length;i++){
        
        console.log(this.videoList[i].tutorial_link);
        this.link.push(this.videoList[i].tutorial_link)
        console.log(this.link)
        // this.title.push (this.videoList[i].tutorial_name)
        this.loader.loadingDismiss();
       // this.safeUrl= 'https://www.youtube.com/embed/'
        //return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
      }
      
    })
   
  }
  // getUrl(link){
    
  //   console.log(this.safeUrl)
  // }
  logout() {
    this.presentAlert();
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
