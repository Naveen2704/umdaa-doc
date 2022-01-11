import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentmodalPage } from './paymentmodal.page';
import { AppointmentPageModule } from '../pages/appointment/appointment.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentmodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentmodalPage]
})
export class PaymentmodalPageModule {}
