import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload.service';
import { FormGroup, FormControl } from '@angular/forms';

import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition, GalleryConfig } from '@ngx-gallery/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/service/loader.service';

import Swal from 'sweetalert2'
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatFabMenu} from '@angular-material-extensions/fab-menu';

@Component({
  selector: 'app-he',
  templateUrl: './he.page.html',
  styleUrls: ['./he.page.scss'],
})
export class HEPage implements OnInit {
  @ViewChild('matFabMenu', { static: false }) matFabMenu: MatFabMenu;
  parentSubject:Subject<string> = new Subject();

  safeUrl :SafeResourceUrl;
  obj: any;
  articles: any[];
  showTextbox: boolean;
  id: any;
  Commentform: FormGroup;
  hearticles: any;
  showimage=[];
  imageList: GalleryItem[];
  showimages=[];
  imageLists: GalleryItem[];
  isSubmitted: boolean;
  videodiv: boolean = false;
  public buttonName:any = 'View Video';
  show = false;
  constructor(public router:Router,push:SwPush,private _dialog:MatDialog,private service:UploadService,public gallery: Gallery,private sanitizer: DomSanitizer,private zone: NgZone,private navCtrl: NavController,private alrtctl:AlertController,private loader:LoaderService) 
  { 
    push.messages.subscribe(msg => {
      console.log(msg)
      console.log('push message',( msg['notification'].success))
     if(msg['notification'].click_action == "front-office" ){
      this.gethealtheducation()
     }
   });
   push.notificationClicks.subscribe(
    ({ action, notification }) => {
      if (notification && notification !== null){
        this.zone.run(() => {
          console.log('onclick');
          this.router.navigateByUrl('/appointment');
      });
      }
      
    });
  }
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'create'
    },
    {
      id: 2,
      icon: 'mail'
    },
    {
      id: 3,
      icon: 'file_copy'
    },
    {
      id: 4,
      icon: 'phone'
    },
  ];
  ngOnInit() {

    this.Commentform = new FormGroup({
      comment:new FormControl('')
    })


    this.service.getyourart().subscribe(res =>{
      console.log(res)
      this.articles = res.result.articles;
     
    });
  

    this.basicLightboxExample();
    this.basicLightboxExamples();
    this.gethealtheducation()
  }

 
  basicLightboxExample() {
    //  console.log(this.imageList)
    const galleryRef = this.gallery.ref();
      galleryRef.setConfig({ loadingStrategy: 'lazy'});
      galleryRef.load(this.imageList);
     // this.gallery.ref().load(this.imageList);
      
    }
    basicLightboxExamples() {
      //  console.log(this.imageList)
      const galleryRef = this.gallery.ref();
        galleryRef.setConfig({ loadingStrategy: 'lazy'});
        galleryRef.load(this.imageLists);
       // this.gallery.ref().load(this.imageList);
        
      }
      getUrl(key){
        console.log(key);
        return this.sanitizer.bypassSecurityTrustResourceUrl(key.posted_url)
      }
      getUrlH(video){
        console.log(video);
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video.video)
      }
  upload(){
    Swal.fire('','Please Upload Photo/Video/PDF Less Than 20Mb', 'warning')
    const dialog_ref = this._dialog.open(UploadComponent,{
      panelClass: ['HealthEducation'],
    })
    dialog_ref.afterClosed().subscribe(result => {
      // this.service.getyourart().subscribe(res =>{
      //   console.log(res)
      //   this.articles = res.result.articles;
       
      // });
      // this.gethealtheducation();
    });
  }
  videoview(){
    this.videodiv = !this.videodiv;
    if(this.videodiv)  {
      this.buttonName = "Close Video";
    }
    
    else{
      this.buttonName = "View Video";
  }
  }
  comment(id){
    this.id  = id
   }
  submitC(data,id){
    console.log(data);
    this.isSubmitted = true;
    if (!this.Commentform.valid ) {
      return false;
    } else{
      this.service.reject(data,id).subscribe((data)=>{
        console.log(data)
        if(data['code']=='200'){
          this.id  = '';
          this.service.getyourart().subscribe(res =>{
            console.log(res)
            this.articles = res.result.articles;
           
          });
        }
      })
    }
  }
  approve(id){
    this.service.approvestatus(id).subscribe(res =>{
      console.log(res)
      if(res['code'] == '200'){
        this.service.getyourart().subscribe(res =>{
          console.log(res)
          this.articles = res.result.articles
        });
    
      }
    });
  }
  gethealtheducation(){
    this.loader.loadingPresent()
    this.service.gethealthart()
    .pipe(
      finalize(async () => {
          // Hide the loading spinner on success or error
          await this.loader.loadingDismiss()
      })
    )
    .subscribe(res =>{
      console.log(res)
      this.hearticles = res.result.articles
    });
  }
  imageviewyour(id){
    this.service.getyourart().subscribe(res =>{
      console.log(res)
      this.articles = res.result.articles;
      var filterSubHeading =res['result']['articles'].filter((x)=>x.article_id === id);
      console.log(filterSubHeading[0]['article_image']);
      this.showimage = filterSubHeading[0]['article_image'];
      this.imageList = 
      this.showimage.map((item) =>{
             console.log(item)
      return {
        type: 'image',
        data: {
          src: item,
          thumb:item
        }
      }

      },
      );
      this.basicLightboxExample();
    });

  }
  imageview(id){
    this.service.gethealthart().subscribe(res =>{
      console.log(res)
      console.log(res['result']['articles'])
      this.hearticles = res.result.articles
      var filterSubHeading =res['result']['articles'].filter((x)=>x.article_id === id);
      console.log(filterSubHeading[0]['article_image']);
      console.log(id)
      this.showimages = filterSubHeading[0]['article_image'];
      this.imageLists = 
      this.showimages.map((item) =>{
             console.log(item)
      return {
        type: 'image',
        data: {
          src: item,
          thumb:item
        }
      }

      },
      );
      this.basicLightboxExamples();
      
    })

    
  }


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

back()
{
  // alert("kasak");
  this.router.navigate(['/dashboard'])
}

}
