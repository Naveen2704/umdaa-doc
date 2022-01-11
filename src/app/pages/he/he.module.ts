import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { IonicModule } from '@ionic/angular';

import { HEPage } from './he.page';
import { ArticlesComponent } from './articles/articles.component';

import { LightboxModule } from  '@ngx-gallery/lightbox';
import { UrlsafePipe } from 'src/app/urlsafe.pipe';
import { CardComponent } from './card/card.component';

import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';


const routes: Routes = [
  {
    path: '',
    component: HEPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    LightboxModule,
    MatFabMenuModule,
    RouterModule.forChild(routes)
  ],
  providers:[],
  declarations: [HEPage,ArticlesComponent,UrlsafePipe,CardComponent]
})
export class HEPageModule {}
