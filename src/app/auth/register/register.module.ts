import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSelectFilterModule } from 'mat-select-filter';
const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    MatSelectFilterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
