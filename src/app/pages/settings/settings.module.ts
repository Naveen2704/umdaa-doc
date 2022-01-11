import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { MaterialModule } from 'src/app/material/material.module';
import { EditTimeComponent } from './edit-time/edit-time.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MatSelectFilterModule } from 'mat-select-filter';
const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    SignaturePadModule,
    MatSelectFilterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsPage,EditTimeComponent]
})
export class SettingsPageModule {}
