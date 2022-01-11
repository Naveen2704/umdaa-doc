import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private _http:HttpClient) { }
  apiUrl:string = environment.baseUrl;
  // getData(result):Observable<any>
  // {
  //   console.log(result);
  //  return this._http.post(this.apiUrl,
  //   {
  //     "requesterid": 102,
  //     "requestname": "patient_summary_list",
  //     "requestparameters": {
  //         "clinic_id": result.clinic_id,
  //         "patient_id": result.patient_id,
  //         "doctor_id": result.doctor_id
  //     }
  // }
    
  //   );
  //   }
  getData(result):Observable<any>
  {
    let wikiUrl = environment.Url+"ExpertOpinion/summaryList"
    let fd = new FormData();
    fd.append("doctor_id",result.doctor_id)
    fd.append("patient_id",result.patient_id)
    return this._http.post(wikiUrl,fd)
  }
    
   
    getfullsummary(id):Observable<any>
    {
     return this._http.post(this.apiUrl,
      {
        "requesterid": 1,
        "requestname": "fullSummary",
        "requestparameters": {
            "appointment_id": id
        }
    }
      
      );
      }
      getshortsummary(id):Observable<any>
      {
       return this._http.post(this.apiUrl,
        {"requesterid":1,"requestname":"shortSummary","requestparameters":{"appointment_id":id}}
        );
        }
}
