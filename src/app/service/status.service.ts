import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{ environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StatusService {
  apiUrl = environment.baseUrl;
  
  constructor( private http:HttpClient) { }

  getStatus(id,status):Observable<any>
  {
    return this.http.post(this.apiUrl,{
      "requesterid":15,"requestname":"appointment_status","requestparameters":
      {"appointment_id":id,"status_type":status}
    });
  }
}
