import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { BookappPage } from './bookapp.page';


import { MaterialModule } from '../../material/material.module';
import { from } from 'rxjs';
import { DailogComponent } from './dailog/dailog.component';
const routes: Routes = [
  {
    path: '',
    component: BookappPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookappPage]
})
export class BookappPageModule {}
