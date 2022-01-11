import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  apiUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  forgotpost(data):Observable<any>{

   return this.http.post(this.apiUrl,{
      
        "requesterid": 15,
        "requestname": "forgot_password_otp",
        "requestparameters": {
            "email_id": data.mobile
        }
    
    })
  }
}
