import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import { SlottimingsComponent } from '../slottimings/slottimings.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TeleslottimingsComponent } from '../teleslottimings/teleslottimings.component';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrationPage,SlottimingsComponent,TeleslottimingsComponent]
})
export class RegistrationPageModule {}
