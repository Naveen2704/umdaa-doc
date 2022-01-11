import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

 import { PatientProfileEditPage } from './patient-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component:PatientProfileEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PatientProfileEditPage]
})
export class PatientProfileEditPageModule {}
