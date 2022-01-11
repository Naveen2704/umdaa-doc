import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SearchPipe } from '../../search.pipe'
import { AppointmentPage } from './appointment.page';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: AppointmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [AppointmentPage,SearchPipe]
})
export class AppointmentPageModule {}
