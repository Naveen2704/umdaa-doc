import { NgModule } from '@angular/core';
import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
   
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module')
      .then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module')
      .then(m => m.RegisterPageModule)   
  },
 
 
 
  {
    path: 'pages',
    loadChildren: () => import(/*webpackChunkname:"pages"*/'./pages/pages.module')
      .then(m => m.PagesModule),
      canActivate:[AuthGuard]
  },
  // {
  //   path: 'pages', loadChildren:'./pages/pages.module#PagesModule'
  // },
  { path: 'forgot', loadChildren: './auth/forgot/forgot.module#ForgotPageModule'},
  { path: 're-password', loadChildren: './auth/re-password/re-password.module#RePasswordPageModule' },
  { path: 'registration', loadChildren: './auth/registration/registration.module#RegistrationPageModule' },
  { path: 'signin', loadChildren: './auth/signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' },


 // { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  // { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  // { path: 'paymentmodal', loadChildren: './paymentmodal/paymentmodal.module#PaymentmodalPageModule' },
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation:'reload' })
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
