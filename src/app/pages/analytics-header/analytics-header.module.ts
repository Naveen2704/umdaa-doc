import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';
import { AnalyticsHeaderPage } from './analytics-header.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsHeaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalyticsHeaderPage]
})
export class AnalyticsHeaderPageModule {}
