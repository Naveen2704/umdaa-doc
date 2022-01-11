import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  loginDetails:any={};

  setData(data,value) {
     this.loginDetails[data] = value;

     console.log(this.loginDetails)

  }

  clearData() {
     this.loginDetails={};
  }

  getData(data) {

      return this.loginDetails[data];
 
   
 

    // return this.loginDetails[data] = 
    console.log(this.loginDetails[data])
  }

}
