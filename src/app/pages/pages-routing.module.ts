import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { AdminGuard } from '../admin/admin.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    component: PagesComponent,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        // canActivate:[AuthGuard]
      },
      { path: 'home', 
      loadChildren: () => import('./patientinfo/patientinfo.module').then(m=>m.PatientinfoPageModule) },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentPageModule)
      } , 
      {
        path: 'bookapp',
        loadChildren: () => import('./bookapp/bookapp.module').then(m => m.BookappPageModule)
      } , 
    
      {
        path: 'he',
        loadChildren: () => import('./he/he.module')
          .then(m => m.HEPageModule),
      },
      {
        path: 'expert',
        loadChildren: () => import('./expert/expert.module')
          .then(m => m.ExpertPageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module')
          .then(m => m.SettingsPageModule),
      },
      { path: 'gbusiness', 
      loadChildren: () => import('./gbusiness/gbusiness.module')
      .then(m => m.GbusinessPageModule)},
      {
        path:'contactus',
        component:ContactusComponent
      },
      {
        path:'how',
        component:HowtouseComponent
      } ,
      // { path: 'analytics', loadChildren: './analytics-header/analytics-header.module#AnalyticsHeaderPageModule' },
      { path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsPageModule' },
      { path: 'appointmentslots', loadChildren: './appointmentslots/appointmentslots.module#AppointmentslotsPageModule' },

      // { path: 'tab', loadChildren: './tab/tab.module#TabPageModule' },
      { path: 'doctorprofile', loadChildren: './doctorprofile/doctorprofile.module#DoctorprofilePageModule' },
      { path: 'edit-docs-profile', loadChildren: './edit-docs-profile/edit-docs-profile.module#EditDocsProfilePageModule' },
      // { path: 'home', loadChildren: './patientinfo/patientinfo.module#PatientinfoPageModule' },
      { path: 'patientprofile/:id', loadChildren: './patientprofile/patientprofile.module#PatientprofilePageModule' },
      { path: 'patient-profile-edit/:id', loadChildren: './patient-profile-edit/patient-profile-edit.module#PatientProfileEditPageModule' },
      { path: 'patientvitals/:id', loadChildren: './patientvitals/patientvitals.module#PatientvitalsPageModule' },
      // { path: 'he', loadChildren: './he/he.module#HEPageModule' },
      // { path: 'expert', loadChildren: './expert/expert.module#ExpertPageModule' },
      // { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
    ]
  },
  { path: 'webpage/:id/:id1', loadChildren: './webpage/webpage.module#WebpagePageModule' },
 
 
 // { path: 'edit-docs-profile', loadChildren: './edit-docs-profile/edit-docs-profile.module#EditDocsProfilePageModule' },
 // { path: 'doctorprofile', loadChildren: './doctorprofile/doctorprofile.module#DoctorprofilePageModule' },
 { path: 'tab', loadChildren: './tab/tab.module#TabPageModule' },
  { path: 'expert', loadChildren: './expert/expert.module#ExpertPageModule' },
  { path: 'fi', loadChildren: './fi/fi.module#FiPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  // { path: 'gbusiness', loadChildren: './gbusiness/gbusiness.module#GbusinessPageModule' },
  // { path: 'edit-timings', loadChildren: '../edit-timings/edit-timings.module#EditTimingsPageModule' },
  // { path: 'fipage', loadChildren: './fipage/fipage.module#FIPageModule' },
  // { path: 'appointmentslots', loadChildren: './appointmentslots/appointmentslots.module#AppointmentslotsPageModule' },
  // { path: 'paymentmodal', loadChildren: './paymentmodal/paymentmodal.module#PaymentmodalPageModule' },
  
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'analytics-header', loadChildren: './analytics-header/analytics-header.module#AnalyticsHeaderPageModule' },
  { path: 'mywallet', loadChildren: './mywallet/mywallet.module#MywalletPageModule' },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
