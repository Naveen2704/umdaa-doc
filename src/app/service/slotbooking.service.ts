import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SlotbookingService {
  public PatientDetails: any=[];
  public PatientSlotTime : any =[];
  apiUrl = environment.baseUrl;
  patient_details:any=[];
  patient: any;
  patientInfoget: any=[];
  patientBillInfo: any;
  userDetails: any;
  userInfo:any;
  slot: string;
  doctorid: any;

  constructor(private storageData:Storage,private http:HttpClient) { 
   
  }

  checkExists(data):Observable<any>{  
    let wikiUrl = environment.Url +"Appointments/checkExists/"
    let fd = new FormData();
    fd.append('mobile',data.mobile)
    return this.http.post(wikiUrl,fd);
  }
  getPatients(id):Observable<any>{
    let wikiUrl = environment.Url +"Appointments/getPatientInfo/"
    let web_url = wikiUrl + id
    return this.http.get(web_url);
  }
  postData(data):Observable<any>
  {
    var age = data.age;
    var agetype = data.agetype;
    var agevalue = age.concat(agetype);
    console.log( agevalue)
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.userDetails.result)
    let fd = new FormData();
    let value = JSON.stringify(
      {
        
        "age": agevalue,
        "clinic_id": this.userDetails.result.clinic_id,
        "email_id": data.email,
        "first_name": data.firstname,
        "gender": data.gender,
        "last_name": data.lastname,
        "location": data.location,
        "mobile": data.mobile,
        "occupation": data.occupation,
        "preferred_language":data.language,
        "requesterid": this.userDetails.result.user_id,
        "requestname": "patient_registration",
        "title": data.title
    })
    fd.append("requestpara",value);
    return this.http.post(this.apiUrl,fd,
   );
  }

  Finishappountment(result){
    this.patient  = this.PatientDetails
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    console.log(this.patient)
     
      return this.http.post(this.apiUrl,
        {"requesterid":result.doctor_id,"requestname":"appointment_status",
        "requestparameters":{"appointment_id":result.appointment_id,"status_type":"closed"}}
   )
    }
    Finishappountmentnurse(result){
      this.patient  = this.PatientDetails
      this.userDetails = JSON.parse(localStorage.getItem('data'))
      console.log(this.patient)
        return this.http.post(this.apiUrl,
          {"requesterid":result.doctor_id,"requestname":"appointment_status",
          "requestparameters":{"appointment_id":result.appointment_id,"status_type":"waiting"}}
     )
      }
    GoogleReview(result){
 
   
        return this.http.post(this.apiUrl,
          {"requesterid":result.doctor_id,"requestname":"askReview","requestparameters":{"appointment_id":result.appointment_id}}
     )
      }
      GoogleReview2(id,user_id){
 
   
        return this.http.post(this.apiUrl,
          {"requesterid":user_id,"requestname":"askReview","requestparameters":{"appointment_id":id}}
     )
      }
      getNurseList(roleid,clinicid):Observable<any>{
        return this.http.post(this.apiUrl,
          {
            "requesterid": roleid,
            "requestname": "getDoctors",
            "requestparameters": {
              "role_id": roleid,
              "profile_id":roleid,
              "clinic_id": clinicid,
              
            }
          }
          ) ;
      }
    
      pushNotification(token,channel,doctor_id,doctor_name,number,room_id):Observable<any>{
        return this.http.post(this.apiUrl,
          {
            "requesterid": 8,
            "requestname": "telecallPushNotifications",
            "requestparameters": {
              // "url":link,
              "token":token,
              "channel":channel,
              "mobile_number": number,
              "room_id":room_id,
              "doctor_id":doctor_id,
              "doctor_name":doctor_name
            }
          }
          ) ;
      }

      ruralvideoapi(token,channel,doctor_id,doctor_name,number,room_id):Observable<any>{
        console.log(number);
        return this.http.post(this.apiUrl,
          {
            "requesterid": 8,
            "requestname": "ruraltelecallPushNotifications",
            "requestparameters": {
              "m_number": number,
              "token":token,
              "channel":channel,
              // "mobile_number": number,
              "room_id":room_id,
              "doctor_id":doctor_id,
              "doctor_name":doctor_name
            }
          }
          ) ;
      }

      shortLink(channel,token):Observable<any>{

        let url = 'https://devumdaa.in/production/api/sort_url';
        // let url = 'https://umdaa.co/api/sort_url';

        let body = new FormData();
        body.append('channel', channel);
        body.append('token', token);      
        return this.http.post(url, body);

      }

      expiryVideoToken(id):Observable<any>{
        // let url = 'https://devumdaa.in/production/api/edit_sort_url';
        let url = 'https://umdaa.co/api/edit_sort_url';
        console.log(url);
        let body = new FormData();
        body.append('id',id);
        return this.http.post(url,body)
      }

      stopPushNotification(number):Observable<any>{
        return this.http.post(this.apiUrl,
          {
            "requesterid": 8,
            "requestname": "teleStopPushNotifications",
            "requestparameters": {
              "mobile_number": number,
            }
          }
          ) ;
      }
      // ruralvideoapi(number):Observable<any>{
      //   return this.http.post(this.apiUrl,
      //     {
      //       "requesterid": 8,
      //       "requestname": "ruraltelecallPushNotifications",
      //       "requestparameters": {
      //         "m_number": number,
              
      //       }
      //     }
      //     ) ;
      // }
    
      getslots(a):Observable<any>{
        console.log(a);
        console.log(localStorage.getItem('slotType'));
       //console.log(patienId)
       this.patient  = this.PatientDetails
       console.log(this.patient.patient_id)
        // this.userDetails = JSON.parse(await this.storageData.get('data'))
       //this.patientInfoget = JSON.parse(this.storageData.get('res'));
    
      //  if(this.userInfo.result.role_id == '4')
      //  {
        this.userInfo = JSON.parse(localStorage.getItem('data'));
         console.log(this.userInfo.result)
         console.log(this.userInfo.result.clinic_id)
         return this.http.post(this.apiUrl,
           {
             "requesterid":this.userInfo.result.user_id,
             "requestname": "getIndDoc",
             "requestparameters": {
                 "clinic_id":this.userInfo.result.clinic_id,
                 "profile_id": this.userInfo.result.profile_id,
                 "role_id": this.userInfo.result.role_id,
                 "doctor_id":this.userInfo.result.user_id,
                 "patient_id":this.patient.patient_id,
                 "slot": localStorage.getItem('slotType')=='Tele Consultation Slots'?"video call":'walkin'
             }
         }
           ) ;
       }
       
    
       getslotss(a,id):Observable<any>{
        console.log(a);
        console.log(localStorage.getItem('slotType'));
       //console.log(patienId)
       this.patient  = this.PatientDetails
       console.log(this.patient.patient_id)
        // this.userDetails = JSON.parse(await this.storageData.get('data'))
       //this.patientInfoget = JSON.parse(this.storageData.get('res'));
    
      //  if(this.userInfo.result.role_id == '4')
      //  {
        this.userInfo = JSON.parse(localStorage.getItem('data'));
         console.log(this.userInfo.result)
         return this.http.post(this.apiUrl,
           {
             "requesterid":this.userInfo.result.user_id,
             "requestname": "getIndDoc",
             "requestparameters": {
                 "clinic_id":this.userInfo.result.clinic_id,
                 "profile_id": this.userInfo.result.profile_id,
                 "role_id": this.userInfo.result.role_id,
                 "doctor_id":id,
                 "patient_id":this.patient.patient_id,
                 "slot": localStorage.getItem('slotType')=='Tele Consultation Slots'?"video call":'walkin'
             }
         }
           ) ;
       }
       
      
       slotTime(slot_type,data,appointment_type,roleid,docid){
        // var slot= localStorage.getItem('slotType')
        console.log(data)
        this.patient  = this.PatientDetails
        this.userDetails = JSON.parse(localStorage.getItem('data'))
        console.log(this.patient)
        console.log(  this.userDetails)
        if(slot_type == 'Walk-in Slots'){
          this.slot = 'walkin';
        }else{
          this.slot = 'video call';
        }
        if(roleid == '6'){
          this.doctorid = docid
        }
        else{
          this.doctorid = this.userDetails.result.user_id
        }
     
        return this.http.post(this.apiUrl,{
          "requesterid" : this.userDetails.result.user_id,
          "requestname":"book_appointment",
          "requestparameters":
          {"sms":data.sms,
          "appointment_date":data.bookingDate,
          "appointment_time_slot":data.time,
          "booking_type":data.bookingMode,
          "slot_type": this.slot,
          "appointment_type":appointment_type,
          "clinic_id":this.userDetails.result.clinic_id,
          "doctor_id":this.doctorid,
          "patient_id":this.patient.patient_id,
          "priority":data.priority,
          "umr_no": this.patient.umr_no
        }
        })
      }
     
        getBill(a,b,res,discount):Observable<any>{
        this.patientBillInfo = this.PatientSlotTime;
        console.log(this.patientBillInfo)
        console.log(res,discount)
     if(a=='false')
     {
      return this.http.post(this.apiUrl,{
        "requesterid": this.patientBillInfo.doctor_id,
        "requestname": "save_billing",
        "requestparameters": {
            "appointment_id": this.patientBillInfo.appointment_id,
            "billing_line_items": [
                // {
                //     "amount": res.rePrice,
                //     "discount": "0",
                //     "discount_unit": res.discount_unit,
                //     "item_information": "Registration"
                // },
                {
                    "amount": res.conPrice,
                    "discount": res.discount,
                    "discount_unit": res.discount_unit,
                    "item_information": "Consultation"
                }
            ],
            "billing_type": "Registration & Consultation",
            "clinic_id":this.patientBillInfo.clinic_id,
            "con_payment_status": this.patientBillInfo.con_payment_status,
            "discount_status": "0",
            "doctor_id": this.patientBillInfo.doctor_id,
            "payment_mode": res.modeofpayment,
            "patient_id": this.patientBillInfo.patient_id,
            "reg_payment_status": this.patientBillInfo.reg_payment_status,
            "umr_no": this.patientBillInfo.umr_no,
        }
    
    
    }
      )
     }
     else
     {
      return this.http.post(this.apiUrl,{
        "requesterid": this.patientBillInfo.doctor_id,
        "requestname": "save_billing",
        "requestparameters": {
            "appointment_id": this.patientBillInfo.appointment_id,
            "billing_line_items": [
                {
                    "amount": res.rePrice,
                    "discount": "0",
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
            "clinic_id":this.patientBillInfo.clinic_id,
            "con_payment_status": this.patientBillInfo.con_payment_status,
            "discount_status": "0",
            "doctor_id": this.patientBillInfo.doctor_id,
            "payment_mode": res.modeofpayment,
            "patient_id": this.patientBillInfo.patient_id,
            "reg_payment_status": this.patientBillInfo.reg_payment_status,
            "umr_no": this.patientBillInfo.umr_no,
        }
    
    
    })
     }
    
      }
}


