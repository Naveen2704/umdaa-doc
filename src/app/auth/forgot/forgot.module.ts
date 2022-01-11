import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPage } from './forgot.page';
import { NgOtpInputModule } from  'ng-otp-input';
import { CounterDirective } from 'src/app/counter.directive';
const routes: Routes = [
  {
    path: '',
    component: ForgotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPage,CounterDirective]
})
export class ForgotPageModule {}
