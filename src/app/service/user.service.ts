import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private user = new BehaviorSubject<string>("zero");
  castUser = this.user.asObservable();

  editUser(a){
    this.user.next(a); 
  }
  public baseurl = environment.baseUrl;

  GetDetails_P(id):Observable<any>{

    return this.http.post(this.baseurl,
      {
        "requesterid": 11,
        "requestname": "getProfileDetails",
        "requestparameters": {
            "appointment_id": id,
        }
    });
}

GetDetails_PE(result):Observable<any>{
  console.log(result);
  return this.http.post(this.baseurl,
    {
      "requesterid": 11,
      "requestname": "getProfileDetails",
      "requestparameters": {
          "appointment_id": result.appointment_id,
      }
  });
}
  updateDetails(data,fileHolder,result):Observable<any> {
  let fd = new FormData();
console.log(fileHolder)
  let value = JSON.stringify({
        "age": data.age,
        "appointment_id": result.appointment_id,
        "clinic_id": result.clinic_id,
        "email_id": data.email,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "gender": data.gender,
        "location": data.location,
        "mobile": data.mobile,
        "occupation": "bussiness",
        "patient_id":result.patient_id,
        "requesterid": 11,
        "requestname": "patient_profile_edit",
        "status": "1",
        "title": data.title,
        // "file_i":data.file_i
  });
  fd.append("requestpara",value);
  fd.append("file_i",fileHolder)
  return this.http.post(this.baseurl,fd)
}

 GetPatient(id):Observable<any>{
  return this.http.post(this.baseurl,
   
    {"requesterid":11,"requestname":"getInfo","requestparameters":{"appointment_id":id}}
  )
}

voiceivrs(from,to):Observable<any>{

  let fd = new FormData();
  fd.append("from_number",from);
  fd.append("to_number",to)
  return this.http.post(environment.Url +'pay/IVS',fd)
}
}
