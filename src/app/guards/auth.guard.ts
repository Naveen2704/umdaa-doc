import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  storedUserData: any;

  constructor(private storedData:Storage,public router:Router,public auth:AuthService)
  {
    this.auth.roleIdd.subscribe(user =>{
      console.log(user);
      // this.roleIdd=user;
      // console.log(this.roleIdd);
    });
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.auth.roleIdd.subscribe(user =>{
        console.log(user);
        // alert(user);
        this.storedUserData = user
      });

      // this.storedData.get('login').then((val)=>{
      //   console.log('logout after',val)
      //   this.storedUserData = val;
      // })
      if(this.storedUserData == true)
      {
        return true;
      }else
      {
        this.router.navigate(['/login']);
        return false;
      }
    // return true;
    // let userAuthenticated = false; // Get the current authentication state from a Service!
 
    // if (userAuthenticated) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
 }