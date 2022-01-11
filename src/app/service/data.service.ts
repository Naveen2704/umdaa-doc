import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  headers = {
    'Access-Control-Allow-Origin' : '*' ,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Accept':'application/json',
    'content-type':'application/json'
    // "accessHeaderToken": "3cea4e6fdf4648459850396cdd36897e"
   }

  server = environment.baseUrl;
  constructor(private http: HttpClient) {
    this.items = [
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" }
    ];
   }

   private  data = new BehaviorSubject<string>("Zero");
   dataObj = this.data.asObservable();

    newObject(a)
    {
      this.data.next(a);
    }

  // postData={
  //   requestname:"getConsentforms",
  //   requestparameters:{
  //     "department_id":"1"
  //   }
  // }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getId(id)
  {
    console.log(id);
  }

  getBeforeDescription(data):Observable<any>
  {
    console.log(data);
    return this.http.post(this.server,JSON.stringify(
      {
      "requesterid":51,
      "requestname": "get_patient_consent_check_list",
      requestparameters:{
        "patient_consent_form_id":21,
        "patient_consent_form_category":"before",
        "patient_consent_form_min":0,
        "patient_consent_form_max":0,
      }
      }
      ));
  }

  getAfterDescription(res):Observable<any>
  {
    console.log(res);
    return this.http.post(this.server,JSON.stringify({
      "requesterid":15,
      "requestname": "get_patient_consent_check_list",
      requestparameters:{
        "patient_consent_form_id":21,
        "patient_consent_form_category":"after",
        "patient_consent_form_min":0,
        "patient_consent_form_max":0,
      }
      }));
  }

  getDuringDescription(res):Observable<any>
  {
    return this.http.post(this.server,JSON.stringify({
      "requesterid":51,
      "requestname": "get_patient_consent_check_list",
      requestparameters:{
        "patient_consent_form_id":21,
        "patient_consent_form_category":"during",
        "patient_consent_form_min":0,
        "patient_consent_form_max":0,
      }
      }));
  }

  getForm(data):Observable<any>
  {
    return this.http.post(this.server,JSON.stringify({
      "requesterid":51,
      "requestname": "downloadConsentform",
      requestparameters:{
        "appointment_id":32,
        "clinic_id":1,
        "consent_form_id":data,
        "doctor_id":15,
        "patient_id":10,
        "umr_no":"P091910"
      }
      }));
  }

  getAllDetails(data):Observable<any>
  {
    return this.http.post(this.server,JSON.stringify(
      {
      "requesterid":51,
      "requestname": "patient_consent_form_add",
      requestparameters:{
        "appointment_id":32,
        "department_id":2,
        "clinic_id":1,
        "consent_form_id":data,
        "doctor_id":15,
        "patient_id":10
      }
      }
      ));
  }

  getList():Observable<any>
  {
    return this.http.post(this.server,JSON.stringify({
      "requesterid":51,
      "requestname": "patient_consent_form_list",
      requestparameters:{
        "appointment_id":32
      }
      }));
  }

  checklist(data):Observable<any>
  {
    console.log(data);
    console.log(data.anesthetist);
     console.log(data.consent_check_list);
    return this.http.post(this.server,JSON.stringify({
      "requesterid":51,
      "requestname": "patient_checklist_update",
      requestparameters:{
        "anesthetist":data.anesthetist,
        "appointment_id":32,
        "assisted_by":data.assisted_by,
        "checked_by":data.checked_by,
        "done_by":data.done_by,
        "doctor_id":15,
        "nurse":data.nurse,
        "patient_consent_form_id":data.patient_consent_form_id,
        "consent_check_list":data.consent_check_list
      }
      }));
  }

  getConsentForm(data)
  {
    return this.http.post(this.server,JSON.stringify({
      "requesterid":51,
      "requestname": "consentFormDownload",
      requestparameters:{
        "appointment_id":768,
        "clinic_id":1,
        "consent_form_id":data.consent_form_id,
        "patient_consent_form_id":data.patient_consent_form_id,
        "doctor_id":15,
        "patient_id":"468",
        "umr_no":"P091910"
      }
      }));
  }

  getData():Observable<any>
  {
    // const headers = new HttpHeaders();
    // var t="c78e40a366fa24ece49553df5bbd88e4";

    
    // var headers_object = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //    'Authorization': "Bearer "+t)
    // });

    // const headers = new HttpHeaders({     
    //   'Content-Type': 'application/json',
    //   "Access-Control-Allow-Headers":"X-Custom-Header",
    //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    //   'Access-Control-Allow-Origin' : '*' 
    //   // "accessHeaderToken" :"d5cbd08673fef9042c0d3f5e0d13ed8a"
    // });
    // //   'Access-Control-Allow-Origin' : '*' ,
    // // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    // // 'Accept':'application/json',
    // // 'content-type':'application/json'
    // });
    // const httpOptions = {
    //   headers: headers_object
    // }
      //  const options = {headers:headers};

      // let headers = new HttpHeaders();
      // headers = headers.append('accessHeaderToken', 'd5cbd08673fef9042c0d3f5e0d13ed8a');
      // const options = {headers:headers};

      let loginHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accessHeaderToken': 'b38b5c679163352d323d944bd2379b8c'
        })
    }

    // var t=`4c7c7773911675a7b8a8a680328c4aca`;

    // var headers_object = new HttpHeaders();
    //     headers_object.append('Content-Type', 'application/json');
    //     headers_object.append("accessHeaderToken", t);

    //     const httpOptions = {
    //       headers: headers_object
    //     };

    return this.http.post(this.server,JSON.stringify({
      "requestname": "getMaster",
      "requesterid": 51,
      requestparameters:{
        "department_id":"1",

      }
      }),loginHeaders);
//     return this.http.post( this.server,{params:{requesterid:'0',requestname:"getConsentforms"
//     ,department_id:'2'}},{
//       headers : {
      
//         // OPTIONS / HTTP/1.1
//       //   'Host': "http://3.19.54.31/dev/Api/",
//       //   'Origin': 'http://localhost:8100',
//       //   'Access-Control-Request-Method': 'POST',
//       // '  Access-Control-Request-Headers': 'Content-Type'

// //         'Access-Control-Allow-Origin':'http://localhost:8100',
// // 'Access-Control-Allow-Methods':' GET, POST, OPTIONS',
// // 'Access-Control-Allow-Headers': 'Content-Type'

//           'Content-Type' : 'application/json',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
//           'Access-Control-Allow-Headers': 'Content-Type, X-PINGOTHER,Access-Control-Allow-Headers, X-Requested-With'
//       }
//   });

    };
  }

