import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { DashboardPage } from './dashboard.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material'  
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    FontAwesomeModule,
    MaterialModule,
    SharedModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild( [
      {
        path: '',
        component: DashboardPage
      }
    ])
  ],
  declarations: [DashboardPage ],
  providers:[IonicStorageModule]
})
export class DashboardPageModule {}
