import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
// import { AppointmentPageModule } from '../appointment/appointment.module';
import { WebpagePage } from './webpage.page';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogBodyComponentComponent } from './dialog-body-component/dialog-body-component.component';
import { ExpertComponent } from './expert/expert.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: WebpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ButtonsModule,
    DialogsModule,
    SharedModule,
    // AppointmentPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WebpagePage]
})
export class WebpagePageModule {}
