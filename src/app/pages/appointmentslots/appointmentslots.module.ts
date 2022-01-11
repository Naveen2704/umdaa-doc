import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

 import { AppointmentslotsPage } from './appointmentslots.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentslotsPage
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppointmentslotsPage]
})
export class AppointmentslotsPageModule {}
