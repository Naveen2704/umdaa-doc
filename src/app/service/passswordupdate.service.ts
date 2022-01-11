import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment'
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PassswordupdateService {
  apiUrl = environment.baseUrl;
  userDetails: Promise<any>;
  user_id: any=[];
  userDetailsw: any;

  constructor(private http:HttpClient,private storedData:Storage) { }
 // this.storedData.set('updatePass',JSON.stringify(this.resultdata));
  // this.userDetails = JSON.parse(localStorage.getItem('updatePass'))
// this.user_id = this.userDetails['result'].user_id
  async p_update(data){
this.userDetails = JSON.parse(localStorage.getItem('data'))
this.user_id = this.userDetails['result'].user_id
console.log(this.userDetails)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.user_id ,
        "requestname": "forgot_password_update",
        "requestparameters": {
          "user_id":this.user_id,
          "password":data.matching_passwords.password,
        }
    });
  }
  async pw_update(data){
    this.userDetailsw = JSON.parse(await this.storedData.get('updatePass'))
    console.log()
    this.user_id = this.userDetailsw['result'].user_id
    console.log(this.userDetailsw)
        return this.http.post(this.apiUrl,
          {
            "requesterid": this.user_id ,
            "requestname": "forgot_password_update",
            "requestparameters": {
              "user_id":this.user_id,
              "password":data.matching_passwords.password,
            }
        });
      }
}
