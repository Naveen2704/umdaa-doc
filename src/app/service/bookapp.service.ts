import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Storage } from '@ionic/storage'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    
  })
}
@Injectable({
  providedIn: 'root'
})
export class BookappService {
  public PatientDetails: any=[];
  apiUrl = environment.baseUrl;
  userDetails: any=[];
  userID: any = [];
  clinicID: any;
  //userInfo: any=[];
  
  constructor(private storage:Storage,private http:HttpClient) { 
   
    console.log(this.PatientDetails)
  }
   ngOnInit(){
    
   }


  
 postData(data):Observable<any>
  {
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.userDetails.result)
    let fd = new FormData();
    let value = JSON.stringify(
      {
        
        "age": data.age,
        "clinic_id": this.userDetails.result.clinic_id,
        "email_id": data.email,
        "first_name": data.firstname,
        "gender": data.gender,
        "last_name": data.lastname,
        "location": data.location,
        "mobile": data.mobile,
        "occupation": data.occupation,
        "requesterid": this.userDetails.result.user_id,
        "requestname": "patient_registration",
        "title": data.title
    })
    fd.append("requestpara",value);
    return this.http.post(this.apiUrl,fd,
   );
  }

  getBill(res):Observable<any>{
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.userDetails.result)
    return this.http.post(this.apiUrl,{
        "requesterid": 15,
        "requestname": "save_billing",
        "requestparameters": {
            "appointment_id": 248,
            "billing_line_items": [
                {
                    "amount": res.rePrice,
                    "discount": res.discount,
                    "discount_unit": res.discount_unit,
                    "item_information": "Registration"
                },
                {
                    "amount": res.conPrice,
                    "discount": res.discount,
                    "discount_unit": res.discount_unit,
                    "item_information": "Consultation"
                }
            ],
            "billing_type": "Registration & Consultation",
            "clinic_id": "102",
            "con_payment_status": 1,
            "discount_status": "0",
            "doctor_id": 15,
            "payment_mode": "Cash",
            "patient_id": 206,
            "reg_payment_status": 1,
            "umr_no": "P111911"
        }


    }
      )
  }
}
