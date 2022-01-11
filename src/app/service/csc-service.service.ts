import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CscServiceService {

  apiBaseUrl = 'http://13.235.13.88/dev/Api';

  constructor(private http:HttpClient) { }

  getState():Observable<any>{
    return this.http.post(this.apiBaseUrl,{
      "requesterid": 0,
      "requestname": "state_master"
  });

 
  }
}
