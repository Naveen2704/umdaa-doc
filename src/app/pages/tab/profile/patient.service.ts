import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl:string = "http://13.234.116.111/dev/api";

  constructor(private http:HttpClient) { }
    postData():Observable<any>
   {
     console.log()
     let fd= new FormData();
     let value = JSON.stringify(
       {
        "address_line":"4-1-333 mathrusri nagar",
        "age":"25Y 4M 16D ",
        "alternate_mobile":"9618872866",
        "clinic_id":1,"country":"India",
        "date_of_birth":"1994-4-22",
        "district_id":531,
        "email_id":"vamsi@gmail.com",
        "first_name":"Vamsi",
        "gender":"Male",
        "last_name":"Varma",
        "location":"miyapur",
        "mobile":"7893515501",
        "occupation":"Business",
        "pincode":500001,
        "preferred_language":"Telugu",
        "referred_by":"Google",
        "referred_by_type":"online",
        "requesterid":86,
        "requestname":"patient_registration",
        "state_id":32,
        "status":"1",
        "title":"Mr"})
       fd.append("requestpara",value);
      return this.http.post(this.apiUrl,fd);
   }
 }
