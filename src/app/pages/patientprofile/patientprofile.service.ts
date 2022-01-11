import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientprofileService {
  public patient_id:any;
  apiUrl = environment.baseUrl;
  userDetails: any;
  constructor(private http:HttpClient) { }

  postComment(data):Observable<any>{
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.userDetails.result)
    return this.http.post(this.apiUrl,{
      "requesterid": this.userDetails.result.user_id,
      "requestname": "doctorPatientComments",
      "requestparameters": {
          "doctor_comments":data.myComment,
          "patient_id": this.patient_id,
      }
  })
  }
}
