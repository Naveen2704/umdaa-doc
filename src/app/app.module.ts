import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
// import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { LoginPageModule } from './auth/login/login.module';
import { RegisterPageModule } from './auth/register/register.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { Storage } from 'src/app/storage';
import {NgxPopperModule} from 'ngx-popper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import{library} from '@fortawesome/fontawesome-svg-core';
import{fas} from '@fortawesome/free-solid-svg-icons';
import{far} from '@fortawesome/free-regular-svg-icons'
import{fab} from '@fortawesome/free-brands-svg-icons';

import { SearchPipe } from './search.pipe'
import { MaterialModule } from './material/material.module';
import { UploadComponent } from './pages/he/upload/upload.component';

import { GalleryModule } from  '@ngx-gallery/core';

import { LightboxModule } from  '@ngx-gallery/lightbox';
import { ArticlesComponent } from './pages/he/articles/articles.component';
import { DialogBodyComponentComponent } from './pages/webpage/dialog-body-component/dialog-body-component.component';
import { DailogComponent } from './pages/bookapp/dailog/dailog.component';
import { ExpertComponent } from './pages/webpage/expert/expert.component';
import { AddmoneyComponent } from './pages/webpage/addmoney/addmoney.component';
import { ChatComponent } from './pages/expert/chat/chat.component';
import { MychatComponent } from './pages/expert/mychat/mychat.component';
import { MainComponent } from './pages/fi/main/main.component';
import { RegistrationPageModule } from './auth/registration/registration.module';
import { TeleslottimingsComponent } from './auth/teleslottimings/teleslottimings.component';
import { SlottimingsComponent } from './auth/slottimings/slottimings.component';
// import { SafeUrlPipe } from './safe-url.pipe';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { RequestagainComponent } from './pages/expert/requestagain/requestagain.component';
import { HelpComponent } from './pages/expert/help/help.component';
import { EditTimeComponent } from './pages/settings/edit-time/edit-time.component';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
// import { environment } from '../environments/environment';
// import { NgxAgoraModule } from 'ngx-agora';
// library.add(fas,far,fab)
import { FCM } from '@ionic-native/fcm/ngx';
import { firebase } from '@firebase/app';
import { SigninPage } from './auth/signin/signin.page';
import { SignupPage } from './auth/signup/signup.page';
import {RatingModule} from 'ng-starrating';
import { SharedModule } from './shared/shared.module';
import { UrlsafePipe } from './urlsafe.pipe';
import { CounterDirective } from './counter.directive';
import { StatusComponent } from './pages/dashboard/status/status.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectFilterModule } from 'mat-select-filter';
// import { SortbyPipe } from './sortby.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareComponent } from './pages/he/share/share.component';

import { NgxSocialShareModule } from 'ngx-social-share';
import { AccesspopupComponent } from './pages/accesspopup/accesspopup.component';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './service/loader.interceptor';
import { ChartsModule ,ThemeService} from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { NgxAgoraModule } from 'ngx-agora';
import { ShortUrlPipe } from './short-url.pipe';
import { PatientprofilePage } from './pages/patientprofile/patientprofile.page';
import { ReviewComponent } from './pages/webpage/review/review.component';

// import { WebShareModule } from 'ng-web-share';
// import { WebShareServices } from 'ng-web-share';
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent,SignupPage,SigninPage,DailogComponent,ShareComponent, ShortUrlPipe],
  
  imports: [BrowserModule,
     IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md',
      
    }),
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    PagesModule,
    LoginPageModule,
    RegisterPageModule,
    NgxPopperModule,
    FontAwesomeModule,
    MaterialModule,
    GalleryModule,
    LightboxModule,
    RegistrationPageModule,
    ButtonsModule,
    DialogsModule,
    RatingModule,
    SharedModule,
    IonicSelectableModule,
    NgxMatSelectSearchModule,
    MatSelectFilterModule,
    ChartsModule,
    NgxSocialShareModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId })
  ],
  providers: [
    { provide: LocationStrategy , useClass: HashLocationStrategy },
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen,
    DatePicker,
    DatePipe,
    FCM,
    FlexLayoutModule,
    IonicStorageModule,
    ThemeService,
    // WebShareModule,
 LoaderService ,
//  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    
  ],
  entryComponents: [ShareComponent,StatusComponent,SignupPage,SigninPage,HelpComponent,RequestagainComponent,EditTimeComponent,TeleslottimingsComponent,SlottimingsComponent,UploadComponent,DialogBodyComponentComponent,DailogComponent,ExpertComponent,AddmoneyComponent,ChatComponent,MychatComponent,MainComponent,AccesspopupComponent,ReviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
