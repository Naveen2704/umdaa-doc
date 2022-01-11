import { Component, OnInit, Input, Inject, forwardRef, Injector } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
// import { WebShareServices } from 'ng-web-share';

import { Subject } from 'rxjs';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShareComponent } from '../share/share.component';
import { WebShareService } from 'ng-web-share';

export interface User {
  article_id: string
  article_title: string
  department_name: string
  description: string
  fullname: string
  pdf: string
  posted_by: string
  profile_image: string
  type: string
  work_place_location: string
  }

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

  animations: [
    trigger('cardAnimator', [
      transition('* => swipeup', animate(500, keyframes(kf.swipeup))),
      transition('* => swipedown', animate(500, keyframes(kf.swipedown)))
    ])
  ],
  

})
export class CardComponent {

  animationState: string;
  hearticles:any=[];
  public User=[];
  i:any=0;
  @Input()
  parentSubject: Subject<any>;
  tempService: any;
  articles:any;
  totalArticles: any=[];

  constructor(private injector: Injector,private service:UploadService,public router:Router,public modalCtrl: ModalController, ) {
    // console.log(this.User)
     this.tempService = this.injector.get(WebShareService);
   }

  ngOnInit() {
    this.gethealtheducation()
    this.parentSubject.subscribe(event => {
      this.startAnimation(event)
    });
  }

  gethealtheducation(){
    // this.loader.loadingPresent()
    this.service.gethealthart()
    // .pipe(
    //   finalize(async () => {
    //       // Hide the loading spinner on success or error
    //       await this.loader.loadingDismiss()
    //   })
    // )
    .subscribe(res =>{
      console.log(res);
      this.totalArticles = res.result.articles;
      localStorage.setItem('heArticles', JSON.stringify(res.result.articles));
      this.hearticles = JSON.parse(localStorage.getItem('heArticles'));
      var arr = this.hearticles;
      arr = arr.map(function(val:any){return ++val;});
      console.log(arr);
      this.articles = this.hearticles.length-1;
      console.log(this.articles);
      // this.User = res.result.articles;
      // console.log(this.User);
    });
  }
  
  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state) {
    console.log(state);
    this.animationState = '';
    // console.log(this.i)
    // console.log(this.hearticles.length);
    // console.log(state.fromState);
    if(state.fromState == 'swipeup')
    {
      //  this.i+1;
      this.i++;
      // console.log(this.i);
      // console.log(this.i+1);
      //  console.log(this.i++);
      //  if(this.i++ == 11){
      //  alert("wait")
      //  }
    }else if(state.fromState == 'swipedown')
    {
      // console.log(this.i);
      // console.log(this.i-1);
      // console.log(this.i--);
      this.i--;
    
    }



    
  }
 
  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

  back()
  {
    // alert("kasak");
    this.router.navigate(['/home'])
  }

//   async share(){
    
//       const modal = await this.modalCtrl.create({
//         component: ShareComponent,
//         animated: true,
//         mode: 'md',
//         backdropDismiss: true,
//         cssClass: 'login-modal',
//       })
  
//       return await modal.present();
  
//   }


share(a,b,image,id) {

    var str = a
    var res = str.replace(/ /g,'-');

  if (!this.tempService.canShare()) {
    alert(`This service/api is not supported in your Browser`);
    return;
  }

  this.tempService.share({
    title: a,
    text: b,
    url: 'https://umdaa.co/blogs/'+id+"/"+res
  }).then( (response) => {
    console.log(response);
  })
  .catch( (error) => {
    console.log(error);
  });
}

cardAnimation(value) {
  this.parentSubject.next(value);
}
}