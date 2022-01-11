import { Component, Renderer2 } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationsService } from './notifications.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
// import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
declare var QB: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  isLoading = true;
  CREDENTIALS = {
    appId: 81237,
    authKey: 'CT3YksQRwhkwfMN',
    authSecret: 'gyq2HehvUxrwmeG'
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private nonotification:NotificationsService,
    private swUpdate: SwUpdate,
    private storage:Storage,
    private router:Router,
    public auth:AuthService,
    push:SwPush,
    private renderer: Renderer2,
    private loadingController: LoadingController
  ) {
    QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret);
    // this.present()
    push.messages.subscribe(msg => {
      console.log(msg)
      console.log('push message',( msg['notification'].click_action))
      if( msg['notification'].click_action == 'disconnect')
      {
        location.reload();
      }
   })
    push.messages.subscribe(msg => {
      if(msg['notification'].click_action == "front-office" ){
        this.initializeApp();
      }
    })
    this.initializeApp();
    this.swUpdate.available.subscribe(event => {
      console.log(event)
      if (confirm('Update Available. Refresh the page now to update the cache.')) {
        location.reload();
      } else {
        console.log('continue with the older version');
      }
    });
   
    setInterval(() =>  {
      this.swUpdate.checkForUpdate();
    }, 21600);

  }
  async ngOnInit() {
   
    // this.dismiss()
    // this.storage.remove('login')
    // this.checkUserInfo();
    // this.storage.get('login').then((val)=>{
    //   // console.log('logout after',val)
    //   if(val != null)
    //   {
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // })
    window.addEventListener('offline', () => {
      //Do task when no internet connection
      alert("You Are In OffLine Mode");
      });
      window.addEventListener('online', () => {
        //Do task when internet connection returns
        alert("You Are Back to Online ");
        });
    await this.nonotification.init();
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
      this.fcm.getToken().then(token => {
        console.log(token);
    });
  
    });
    this.platform.ready().then(() => {
      this.fcm.subscribeToTopic('all')
    });
   
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    alert("HI SRINU")
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  ngAfterViewInit() {
    this.platform.ready().then(async () => {
       await this.nonotification.requestPermission();
    });
    // let loader = this.renderer.selectRootElement('#loader');
    // this.renderer.setStyle(loader, 'display', 'none');
    // this.dismiss()
}


// checkUserInfo()
// {
//   this.storage.get('login').then((val) => {
//     console.log('Your age is', val);
//     if(val != null){
//       this.auth.authenticated(true);
//     }else{
//       this.auth.authenticated(false);
//     }
//   })
// }

}
