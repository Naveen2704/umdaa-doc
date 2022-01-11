import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
// import{ environment } from '../../environments/environment';
import{Storage} from '@ionic/storage'
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';


  var t="1b2f5260b91209b71be5a53b78b0af81";
 var headers_object = new HttpHeaders();
       headers_object.append('Content-Type', 'application/json');
        headers_object.append('Access-Control-Request-Headers',"true");
       // headers_object.set("Authorization","1b2f5260b91209b71be5a53b78b0af81");


    


       // console.log(JSON.stringify(headers_object))
    
 const httpOptions = {
           headers: headers_object
         };

//         const httpHeadersInfo = {
// "Content-Type":"application/json",
// "Access-Control-Request-Headers":"true",
// "Authorization":t
//         }

        

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  invokeAuthGuardFunction = new EventEmitter();
  userDetails:Subscription;
  
  apiUrl = environment.baseUrl;
  isloggedIn:boolean; 
  private id = new BehaviorSubject(false);
  roleIdd = this.id.asObservable();

  // authState = new BehaviorSubject(false);
  // private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  constructor(private storedData:Storage,private http:HttpClient,private platform: Platform) {    
    // this.platform.ready().then(async () => {
    //   // const accesstoken = YOUR_STORAGE_GET_ITEM('accesstoken');
    //   return await this.authenticated.next(false);
    // });
  }

  // public getAuthentication(): Observable<boolean> {
  //   return this.authenticated.asObservable();
  // }


  authenticated(a)
  {
    this.id.next(a); 
  }

 onAppComponentCheck()
 {
    this.invokeAuthGuardFunction.emit();
 }

  
  postData(data):Observable<any>
  {
    console.log(data)
    return this.http.post(this.apiUrl,
      {
      requestname:"doctor_registration",
      requestparameters:{
        "first_name":data.firstname,
        "last_name":data.lastname,
        "qualification":data.qualification,
        // "google_review_link":a,
        "clinic_id":data.clinic_id,
        "department_id":data.department_id,
        "email":data.email,
        "registration_code":data.reg,
        "mobile":data.mobile,
        "password":data.matching_passwords.password,
        "clinic_name":data.clinic_info.clinic_name,
        "location":data.clinic_info.clinic_location,
        "other_department": data.department_name,
        // "FO": (data.fo == true)?'1':'0' ,
        // "LAB":  (data.la== true)?'1':'0' ,
        // "NU":  (data.nu == true)?'1':'0' ,
        // "PH":  (data.ph == true)?'1':'0' ,
      }
    }
    );
  }

  postDataa(data,a):Observable<any>
  {
    console.log(data)
    return this.http.post(this.apiUrl,
      {
      requestname:"doctor_registration_web",
      requestparameters:{
        "first_name":data.first_name,
        "last_name":data.last_name,
        "qualification":data.qualification,
        "google_review_link":a,
        "clinic_id":data.clinic_id,
        "department_id":data.department_id,
        "email":data.email,
        "registration_code":data.registration_code,
        "mobile":data.mobile,
        "password":data.matching_passwords.password,
        "clinic_name":data.clinic_name,
        "location":data.clinic_location,
        "other_department": data.department_name,
      }
    }
    );
  }

  postwalkinSlots(data,morning,afternoon,evening,scheduling,consultationscheduling,cfees,cId,dId):Observable<any>
  {
    console.log(data,morning,afternoon,evening,scheduling,consultationscheduling,cfees,cId,dId);
    let wikiUrl = environment.Url + 'Registration/walkinDoctorSlots';

    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('morning',JSON.stringify(morning));
    fd.append('afternoon',JSON.stringify(afternoon));
    fd.append('evening',JSON.stringify(evening));
    fd.append('consultationfees',cfees);
    fd.append('scheduling',scheduling);
    fd.append('consultationscheduling',consultationscheduling);
    fd.append('clinicId',cId);
    fd.append('doctorId',dId);
    return this.http.post(wikiUrl,fd)
  }
  checkingMobile(mobile):Observable<any>{
    let wikiUrl = environment.Url + 'Registration/checkmobile';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/checkmobile';
    let fd = new FormData();
    fd.append('mobile',mobile);
    return this.http.post(wikiUrl,fd)
  }
  checkingEmail(email):Observable<any>{
     let wikiUrl = environment.Url +'Registration/checkemail';
    let fd = new FormData();
    fd.append('email',email);
    return this.http.post(wikiUrl,fd)
  }
  postteleSlots(data,morning,afternoon,evening,scheduling,consultationscheduling,cfees,cId,dId):Observable<any>
  {
    console.log(data,morning,afternoon,evening,scheduling,consultationscheduling,cfees,cId,dId);
    let wikiUrl = environment.Url + 'Registration/teleDoctorSlots';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/teleDoctorSlots';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('morning',JSON.stringify(morning));
    fd.append('afternoon',JSON.stringify(afternoon));
    fd.append('evening',JSON.stringify(evening));
    fd.append('teleconsultationfees',cfees);
    fd.append('telescheduling',scheduling);
    fd.append('teleconsultationscheduling',consultationscheduling);
    fd.append('clinicId',cId);
    fd.append('doctorId',dId);
    return this.http.post(wikiUrl,fd)
  }

  getData(data)
  {
    let fcmid = JSON.parse(localStorage.getItem("fcmId"));
    return this.http.post(this.apiUrl,{
      requestname:"login_details",
      requestparameters:{
        "email":data.email,
        "password":data.password,
        "fcmId":fcmid,
      }
    });
  }
  Logout(){
    let fcmid = JSON.parse(localStorage.getItem("fcmId"));
    let userData = JSON.parse(localStorage.getItem("data"))
    console.log(userData.result.user_id,)
    return this.http.post(this.apiUrl,
      {
        "requesterid": 8,
        "requestname": "logout",
        "requestparameters": {
          "user_id": userData.result.user_id,
          "fcm_id": fcmid 
        }
      }
    );
  }

  getInfo(dId,cId)
  {
    let wikiUrl = environment.Url + 'Registration/getGeneralInfo/';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/getGeneralInfo/';
    let _URL = wikiUrl+'/'+dId+'/'+cId;
    return this.http.get(_URL)
  }

  getWalkinData(dId,cId,e)
  {
    console.log(dId,cId,e)
    if(e == 'WalkinSlots Timings')
    {
      let wikiUrl = environment.Url + 'Registration/getDoctorSlots';
      // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/getDoctorSlots';
      let _URL = wikiUrl+'/'+dId+'/'+cId;
      return this.http.get(_URL)
    }
    else if(e == 'TeleSlots Timings'){
      let wikiUrl = environment.Url +'Registration/getVideoSlotsData';
      // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/getVideoSlotsData';
      let _URL = wikiUrl+'/'+dId+'/'+cId;
      return this.http.get(_URL)
    }
    else{

    }
   
  }

  getTeleData(dId,cId)
  {
    let wikiUrl = environment.Url + 'Registration/getVideoSlotsData';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/getVideoSlotsData';
    let _URL = wikiUrl+'/'+dId+'/'+cId;
    return this.http.get(_URL)
  }

  getWalkinDataa(dId,cId)
  {
    let wikiUrl = environment.Url +'Registration/getDoctorSlots';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/getDoctorSlots';
    let _URL = wikiUrl+'/'+dId+'/'+cId;
    return this.http.get(_URL)
  }

  postModifiedTime(day,from,to)
  {
    let wikiUrl = environment.Url + 'Registration/editModifiedTime';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/editModifiedTime';
    let fd = new FormData();
    fd.append('day',day);
    fd.append('from',from);
    fd.append('to',to);
    return this.http.post(wikiUrl,fd)
  }

  deleteData(day)
  {
    let wikiUrl = environment.Url + 'Registration/deleteData';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/deleteData';
    let fd = new FormData();
    fd.append('day',day);
    // fd.append('from',from);
    // fd.append('to',to);
    return this.http.post(wikiUrl,fd)
  }

  postwalkinSlotss(data,morning,cId,dId):Observable<any>
  {
    console.log(data,morning,cId,dId);
    let wikiUrl = environment.Url + 'Registration/walkinDoctorSlotsMorEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/walkinDoctorSlotsMorEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('morning',JSON.stringify(morning));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

  postwalkinSlotsss(data,afternoon,cId,dId):Observable<any>
  {
    console.log(data,afternoon,cId,dId);
    let wikiUrl = environment.Url + 'Registration/walkinDoctorSlotsAftEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/walkinDoctorSlotsAftEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('afternoon',JSON.stringify(afternoon));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

  postwalkinSlotssss(data,evening,cId,dId):Observable<any>
  {
    console.log(data,evening,cId,dId);
    let wikiUrl = environment.Url + 'Registration/walkinDoctorSlotsEvnEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/walkinDoctorSlotsEvnEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('evening',JSON.stringify(evening));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

  postteleSlotss(data,morning,cId,dId):Observable<any>
  {
    console.log(data,morning,cId,dId);
     let wikiUrl = environment.Url +'Registration/teleDoctorSlotsMorEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/teleDoctorSlotsMorEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('morning',JSON.stringify(morning));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

    
  generalData(wf,wt,tf,tt,rf,dId,cId)
  {
    console.log(wf,wt,tf,tt,rf,dId,cId);
     let wikiUrl = environment.Url +'Registration/generalSettingsData';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/generalSettingsData';
    let fd = new FormData();
    fd.append('wf',wf);
    fd.append('wt',wt);
    fd.append('tf',tf);
    fd.append('tt',tt);
    fd.append('rf',rf);
    fd.append('dId',dId);
    fd.append('cId',cId);
    return this.http.post(wikiUrl,fd)
  }

  postteleSlotsss(data,afternoon,cId,dId):Observable<any>
  {
    console.log(data,afternoon,cId,dId);
     let wikiUrl = environment.Url +'Registration/teleDoctorSlotsAftEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/teleDoctorSlotsAftEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('afternoon',JSON.stringify(afternoon));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

  postteleSlotssss(data,evening,cId,dId):Observable<any>
  {
    console.log(data,evening,cId,dId);
     let wikiUrl = environment.Url +'Registration/teleDoctorSlotsEvnEdit';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/teleDoctorSlotsEvnEdit';
    let fd = new FormData();
    fd.append('slots',JSON.stringify(data));
    fd.append('evening',JSON.stringify(evening));
    fd.append('clinic_id',cId);
    fd.append('doctor_id',dId);
    return this.http.post(wikiUrl,fd)
  }

  addSignature(result,sign):Observable<any>
  {
    console.log(sign);
     let wikiUrl = environment.Url +'Registration/digitalSign';
    // let wikiUrl = 'http://umdaa.co/clinic/WebApi/Registration/digitalSign';
    let fd = new FormData();
    fd.append('docid',result.doctor_id);
    fd.append('file_i',sign);
    return this.http.post(wikiUrl,fd)
  }
  addReviewLink(result,link):Observable<any>
  {
    
     let wikiUrl = environment.Url +'Registration/googleReviewLink';
    // let wikiUrl = 'http://umdaa.co/clinic/WebApi/Registration/digitalSign';
    let fd = new FormData();
    fd.append('docid',result.doctor_id);
    fd.append('google_review_link',link);
    return this.http.post(wikiUrl,fd)
  }

  languages(result,lan):Observable<any>
  {
     let wikiUrl = environment.Url +'Registration/docLanguages';
    // let wikiUrl = 'http://umdaa.co/clinic/WebApi/Registration/docLanguages';
    let fd = new FormData();
    fd.append('docid',result.doctor_id);
    fd.append('lan',lan);
    return this.http.post(wikiUrl,fd)
  }

  newClinics(result,data):Observable<any>
  {
     let wikiUrl = environment.Url +'Registration/newClinic';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/newClinic';
    let fd = new FormData();
    fd.append('doctor_id',(result.doctor_id));
    fd.append('clinic_name',(data.clinic_name));
    fd.append('clinic_address',(data.clinic_location));
    return this.http.post(wikiUrl,fd)
  }

  addSecondaryClinic(result,data):Observable<any>
  {
    // alert(clinic_id);
     let wikiUrl = environment.Url +'Registration/secondaryClinic';
    // let wikiUrl = 'https://umdaa.co/clinic/WebApi/Registration/secondaryClinic';
    let fd = new FormData();
    fd.append('clinic_id', (data.clinic_id));
    fd.append('doctor_id', (result.doctor_id));
    // fd.append('clinic_address',JSON.stringify(clinic_address));
    return this.http.post(wikiUrl,fd)
  }

  // addClinic():Observable<any>
  // {
  //    let wikiUrl = environment.Url +'Registration/teleDoctorSlotsEvnEdit';
  //   let fd = new FormData();
  //   fd.append('slots',JSON.stringify(data));
  //   fd.append('evening',JSON.stringify(evening));
  //   fd.append('clinic_id',cId);
  //   fd.append('doctor_id',dId);
  //   return this.http.post(wikiUrl,fd)
  // }

  addedlist(data):Observable<any>
  
  {
    
    return this.http.post(this.apiUrl,
      {
        "requesterid": data.doctor_id,
        "requestname": "getDoctorInfo"
     }
    );
  }
}