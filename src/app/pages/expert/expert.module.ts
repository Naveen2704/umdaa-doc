import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpertPage } from './expert.page';
import { MaterialModule } from 'src/app/material/material.module';
import { SortbyPipe } from 'src/app/sortby.pipe';

const routes: Routes = [
  {
    path: '',
    component: ExpertPage
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
  declarations: [ExpertPage,SortbyPipe]
})
export class ExpertPageModule {}
