import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

 import { PatientvitalsPage } from './patientvitals.page';

const routes: Routes = [
  {
    path: '',
    component: PatientvitalsPage
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
  declarations: [PatientvitalsPage]
})
export class PatientvitalsPageModule {}
