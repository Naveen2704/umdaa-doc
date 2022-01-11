import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DoctorprofileService {

  public responce:any=[];
  apiUrl:string = environment.baseUrl;
  userDetails: any=[];

  constructor(private http:HttpClient) { }

  editdoctorprofiile(data,fileHolder):Observable<any>
  {
    console.log(fileHolder)
    let fd = new FormData();
    let value = JSON.stringify(
      { "clinic_id":this.responce.clinic_id,
      "clinic_name":data.clinic_name,
      "first_name":data.first_name,
      "last_name":data.last_name,
      "qualification":data.qualification,
      "department_id":this.responce.department_id,
      "email":data.email,
      "location":data.location,
      "mobile":data.mobile,
      "registration_code":data.registration,
      "requesterid":this.responce.doctor_id,
      "requestname":"doctor_profile_edit"})
      fd.append("requestpara",value);
      fd.append("file_i",fileHolder)
      return this.http.post(this.apiUrl,fd);
 }
 updateprofile(result):Observable<any>{
   console.log(result)
  return this.http.post(this.apiUrl,
    {
      "requesterid": result.doctor_id,
      "requestname": "getDocProfileInfo",
      "requestparameters": {
          "doctor_id": result.doctor_id,
      }
  });
 }
}
