import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnalyticsPage } from './analytics.page';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {RatingModule} from 'ng-starrating';
// import { GbusinessPage } from '../gbusiness/gbusiness.page';
// import { GbusinessPageModule } from '../gbusiness/gbusiness.module';
const routes: Routes = [
  {
    path: '',
    component: AnalyticsPage,

  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    RatingModule,
    MaterialModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    // GbusinessPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalyticsPage]
})
export class AnalyticsPageModule {}
