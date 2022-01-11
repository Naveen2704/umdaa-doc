import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorprofilePage } from './doctorprofile.page';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: DoctorprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorprofilePage]
})
export class DoctorprofilePageModule {}
