import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabPage } from './tab.page';
import { TabRoutingModule } from './tab-routing.module';



const routes: Routes = [
  {
    path: '',
    component: TabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
