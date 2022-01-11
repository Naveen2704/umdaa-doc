import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TabPage } from './tab.page';


const routes:Routes=[
  {
    path:'tab',
    component:TabPage,
    children:[
      {
        path:'vitals',
        children:[
            {
              path:'',
              loadChildren:()=> import('../tab/vitals/vitals.module').then(m=>m.VitalsPageModule)
           }
        ]
      },
      {
        path:'profile',
        children:[
          {
            path:'',
            loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfilePageModule)
          }
        ]
      },
      {
        path:'',
        children:[
          { path: 'forms', loadChildren: './forms/forms.module#FormsPageModule' }
        ]
      },
      {
        path:'',
        children:[
          { path: 'reports', loadChildren: './reports/reports.module#ReportsPageModule' },
        ]
      },
      {
        path:'',
        children:[
          { path: 'symptoms', loadChildren: './symptoms/symptoms.module#SymptomsPageModule' }
        ]
      },
      {
        path:'',
        children:[
          { path: 'hopi', loadChildren: './hopi/hopi.module#HopiPageModule' },
        ]
      },
      {
        path:'',
        children:[
          { path: 'history', loadChildren: './history/history.module#HistoryPageModule' }
        ]
      }
       
    ]

},
  {
    path: '',
    redirectTo: '/tab/forms',
    pathMatch: 'full'
  },
  { path: 'checklist/:id/:title', loadChildren: './checklist/checklist.module#ChecklistPageModule' },
  { path: 'seinfo/:id/:title', loadChildren: './seinfo/seinfo.module#SeinfoPageModule' }
 


 
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabRoutingModule { }
