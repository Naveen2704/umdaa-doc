import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FiPage } from './fi.page';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SummaryComponent } from './summary/summary.component';
import { FiComponent } from './fi/fi.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: FiPage,
    children: [

      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'fic',
        component: FiComponent
      },
    ]
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
  declarations: [FiPage,SidenavComponent,SummaryComponent,FiComponent,MainComponent]
})
export class FiPageModule {}
