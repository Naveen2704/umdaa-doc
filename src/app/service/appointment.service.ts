import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import{ environment } from '../../environments/environment'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AppointmentService {
  public Patient_info:any=[];

  apiUrl = environment.baseUrl;
  userInfo: any=[];
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor( private http:HttpClient) { 
    
  }
  changestatus(app_id):Observable<any>{
    return this.http.post(this.apiUrl,

    {"requesterid":147,"requestname":"appointment_status","requestparameters":{"appointment_id":app_id,"status_type":"in_consultation"}}
      
      
      );
  }
  getAppointment(date):Observable<any>{
    console.log(date)
    var month = new Date().getMonth() + 1;
    this.userInfo = JSON.parse(localStorage.getItem('data'))
    // console.log(this.userInfo.result)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "appointments",
        "requestparameters": {
            "clinic_id": this.userInfo.result.doctor_details.clinic_id ,
            "from_date": date,
            "role_id": this.userInfo.result.role_id,
            "to_date": date
        }
    }
      
      
      ).pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      );
  }
  getDashboardRevenue():Observable<any>
  {
    this.userInfo = JSON.parse(localStorage.getItem('data'))
    console.log(this.userInfo.result)
    var month = new Date().getMonth() + 1;
    return this.http.post(this.apiUrl,
      {
        "requesterid":this.userInfo.result.user_id,
        "requestname": "commonDashboard",
        "requestparameters": {
            "clinic_id":this.userInfo.result.doctor_details.clinic_id ,
            "dashboard_type":this.userInfo.result.user_type,
            "from_date": new Date().getFullYear()+"-"+month+"-"+new Date().getDate(),
            "profile_id":this.userInfo.result.profile_id,
            "role_id":this.userInfo.result.role_id,
            "to_date": new Date().getFullYear()+"-"+month+"-"+new Date().getDate()
        }
    }

    );
  }


  search(query: string):Observable<any>{
    this.userInfo = JSON.parse(localStorage.getItem('data'))
    console.log(this.userInfo)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "search_patient_appointment",
        "requestparameters": {
            "clinic_id": this.userInfo.result.clinic_id,
            "srchParam": query
        }
    })
  }
  avalibletele(aval,time):Observable<any>{
    console.log(aval,time)
    this.userInfo = JSON.parse(localStorage.getItem('data'));
    var month = new Date().getMonth() + 1;
    console.log(this.userInfo)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "docOnline",
        "requestparameters": {
            "doctor_id": this.userInfo.result.user_id,
            "available": aval,
            "feature": "Tele",
            "date": new Date().getFullYear()+"-"+month+"-"+new Date().getDate(),
            "time": time
        }
    }
      )
  }

  avalibleExpert(aval,time):Observable<any>{
    console.log(aval,time)
    this.userInfo = JSON.parse(localStorage.getItem('data'));
    var month = new Date().getMonth() + 1;
    console.log(this.userInfo)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "docOnline",
        "requestparameters": {
            "doctor_id": this.userInfo.result.user_id,
            "available": aval,
            "feature": "Tele",
            "date": new Date().getFullYear()+"-"+month+"-"+new Date().getDate(),
            "time": time
        }
    }
      )
  }
 
  offlinetele(f):Observable<any>{

    this.userInfo = JSON.parse(localStorage.getItem('data'));
    var month = new Date().getMonth() + 1;
    console.log(this.userInfo)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "docOffline",
        "requestparameters": {
            "doctor_id": this.userInfo.result.user_id,
            "feature": f
        }
    }
      )
  }

  offlineexpert(f):Observable<any>{

    this.userInfo = JSON.parse(localStorage.getItem('data'));
    var month = new Date().getMonth() + 1;
    console.log(this.userInfo)
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "docOffline",
        "requestparameters": {
            "doctor_id": this.userInfo.result.user_id,
            "feature": f
        }
    }
      )
  }

  docavalible():Observable<any>{
    this.userInfo = JSON.parse(localStorage.getItem('data'));
    return this.http.post(this.apiUrl,
      {
        "requesterid": this.userInfo.result.user_id,
        "requestname": "docAvalibilty",
        "requestparameters": {
            "doctor_id": this.userInfo.result.user_id,
            "feature": "Tele"
  
    }
  }
    )
  }



}


