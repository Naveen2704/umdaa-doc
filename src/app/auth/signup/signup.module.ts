import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSelectFilterModule } from 'mat-select-filter';
const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class SignupPageModule {}
