import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SelectService {

  apiUrl = environment.baseUrl;
 params={
   "requestname":"clinic_master"
 }
  userDetails: any;

  constructor(private http:HttpClient) { 
  
  }
  
  checkSign(): Observable<any>{
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    return this.http.post(this.apiUrl, {
      "requesterid": this.userDetails.result.user_id,
      "requestname": "checkDocDigiSign",
      "requestparameters": {
        "doctor_id": this.userDetails.result.doctor_details.doctor_id 
      }
    })
  }

  dropDown():Observable<any>{
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userDetails.result.user_id,
        "requestname": "clinicsList" 
    }
      );
 
  }

  public getJSON(): Observable<any> {
    return this.http.post(this.apiUrl,{
      "requesterid": 15,
      "requestname": "state_master"
  });
}
}