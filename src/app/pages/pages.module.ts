import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule,IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PagesRoutingModule } from './pages-routing.module';
import{  PagesComponent } from './pages.component';
import { AppointmentPageModule } from './appointment/appointment.module';
 import { BookappPageModule } from './bookapp/bookapp.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { ContactusComponent } from './contactus/contactus.component';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { TabPageModule } from './tab/tab.module';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import {PaymentmodalPageModule} from '../paymentmodal/paymentmodal.module'
import { IonicStorageModule } from '@ionic/storage';
import { MaterialModule } from '../material/material.module';
import { UploadComponent } from './he/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe';
import { DialogBodyComponentComponent } from './webpage/dialog-body-component/dialog-body-component.component';
import { ExpertComponent } from './webpage/expert/expert.component';
import { AddmoneyComponent } from './webpage/addmoney/addmoney.component';
import { ChatComponent } from './expert/chat/chat.component';
import { MychatComponent } from './expert/mychat/mychat.component';
import { FiPageModule } from './fi/fi.module';
import { RequestagainComponent } from './expert/requestagain/requestagain.component';
import { HelpComponent } from './expert/help/help.component';
import { SettingsPageModule } from './settings/settings.module';

import { StatusComponent } from './dashboard/status/status.component';
import { AccesspopupComponent } from './accesspopup/accesspopup.component';
import { ReviewComponent } from './webpage/review/review.component';

// import { SortbyPipe } from '../sortby.pipe';
// import { SharedModule } from '@progress/kendo-angular-dialog';




@NgModule({
  declarations: [ReviewComponent,PagesComponent,ContactusComponent,HowtouseComponent,UploadComponent,SafeUrlPipe,DialogBodyComponentComponent,ExpertComponent,AddmoneyComponent,ChatComponent,MychatComponent,RequestagainComponent,HelpComponent,StatusComponent,AccesspopupComponent ],
 
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    MaterialModule,
    AppointmentPageModule,
    BookappPageModule,
    DashboardPageModule,
    TabPageModule,
    ReactiveFormsModule,
    SettingsPageModule,
    FiPageModule,
    PaymentmodalPageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot()
    
  ],
  
  providers: [
    { provide: LocationStrategy , useClass: HashLocationStrategy },
    StatusBar,
    SplashScreen,
    EmailComposer,
    IonicRouteStrategy,
  
  ],
})
export class PagesModule { }
