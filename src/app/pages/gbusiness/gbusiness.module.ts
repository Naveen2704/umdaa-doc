import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GbusinessPage } from './gbusiness.page';
import { MaterialModule } from 'src/app/material/material.module';
import {RatingModule} from 'ng-starrating';
const routes: Routes = [
  {
    path: '',
    component: GbusinessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GbusinessPage]
})
export class GbusinessPageModule {}
