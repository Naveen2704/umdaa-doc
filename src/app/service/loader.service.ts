import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = false;
  modelOpen = false;
  constructor( public loadingController:LoadingController,public model:ModalController
    ) { }
    
    async loadingPresent() {
      this.isLoading = true;
      return await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent', 
        // duration: 10000
        // cssClass: 'custom-loading'
      }).then(a => {
        a.present().then((e) => {
          // console.log(e)
          //console.log('loading presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort laoding'));
          }
        });
      });
    }
  
    async loadingDismiss() {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    //   setTimeout(async() => {
    //     console.log("timeout")
       
    //  }, 2000);
    }


}
