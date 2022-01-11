import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientvitalsserviceService {
  public Patient_details:any;
  apiUrl = environment.baseUrl;
  userDetails: any;
  constructor(private http:HttpClient) { }


  PostVitals(data):Observable<any>{
      
  var vitals=[];
     console.log(data);
     var last_len = 11; 
     for(var v=0;v<data.uop.length;v++)
     {
        vitals[v]= {"vital_sign_recording_date_time": "2019-12-10","position": last_len,"value": data.uop[v].adduop2,"vital_sign_name": data.uop[v].adduop1};
        last_len++;
     }
    // console.log(vitals)
    //  console.log(data.vitalsign[0]);
    var extras = vitals;
    console.log(extras)
    let aa=[
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 0,
          "value": data.Pulse,
          "vital_sign_name": "PR"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 1,
          "value": data.bp1,
          "vital_sign_name": "DBP"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 1,
          "value": data.bp2,
          "vital_sign_name": "SBP"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 2,
          "value": data.Respiratory,
          "vital_sign_name": "RR"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 3,
          "value": data.Temperature,
          "vital_sign_name": "Temp"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 4,
          "value": data.sa,
          "vital_sign_name": "SaO2"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 5,
          "value": data.height,
          "vital_sign_name": "Height"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 6,
          "value": data.weight,
          "vital_sign_name": "Weight"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 7,
          "value": data.bmi,
          "vital_sign_name": "BMI"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 8,
          "value": data.bsa,
          "vital_sign_name": "BSA"
      },
      {
          "vital_sign_recording_date_time": "2019-12-10",
          "position": 9,
          "value": data.whr,
          "vital_sign_name": "WH Ratio"
      },
      {
        "vital_sign_recording_date_time": "2019-12-10",
        "position": 10,
        "value": data.uop1,
        "vital_sign_name": data.uop2
    }   
  ]
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    var final = aa.concat(extras)
    console.log(final)
    return this.http.post(this. apiUrl,
      {
        "requesterid": 34,
        "requestname": "patient_vitals_insert",
        "requestparameters": {
            "appointment_id": 74,
            "clinic_id": 3,
            "select_flag": 0,
            "drug_allergy": "welcome",
            "patient_id": 91,
            "umr_no": "P121991",
             "vitalsign":final
             
             
        }
    }
       )
  }
}
