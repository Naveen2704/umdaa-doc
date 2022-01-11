import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileupdateService {
  public Patient_details:any=[];
  apiUrl = environment.baseUrl;
  userDetails: any;
  constructor(private http:HttpClient) { }


  postData(data):Observable<any>
  {
    console.log(data);
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.userDetails.result)
    console.log(this.Patient_details)
    let fd = new FormData();
    let value = JSON.stringify(
      {
      
        "age": data.age,
        "appointment_id": this.Patient_details.appointment_id,
        "clinic_id": this.userDetails.result.clinic_id,
        "email_id": data.email,
        "first_name": data.first_name,
        "gender": data.gender,
        "last_name": data.last_name,
        "location": data.location,
        "mobile": data.mobile,
        "occupation": data.occupation,
        "patient_id":this.Patient_details.patient_id,
        "requesterid": this.userDetails.result.doctor_id,
        "requestname": "patient_profile_edit",
        "status": "1",
        "title": data.title
    }
   )
    fd.append("requestpara",value);
    return this.http.post(this.apiUrl,fd,
   );
  }
}
