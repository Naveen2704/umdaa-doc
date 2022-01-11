import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import{ environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ExaminationService {

  public baseurl = environment.baseUrl;
  public url = environment.Url;
  private id = new BehaviorSubject<string>("zero");
  roleIdd = this.id.asObservable();
  
  private idd = new BehaviorSubject<string>("zero");
  count = this.idd.asObservable();

  

  roleId(a)
  {
    this.id.next(a); 
  }

  countData(a)
  {
    this.idd.next(a); 
  }

  constructor(private http: HttpClient) { }

  getSeMainData(data,form_type):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_main_data",
      requestparameters:{
        "appointment_id":data,
        "form_type":form_type
      }
      }));
  }

  getAgoraToken():Observable<any>
  {
    console.log(this.url+'Agora/buildTokenWithUserAccountAndPrivilege');
      return this.http.get(this.url+'Agora/buildTokenWithUserAccountAndPrivilege');
      // return this.http.get('https://devumdaa.in/dev/WebApi/Agora/buildTokenWithUserAccountAndPrivilege');
  }

  sendMsgApi(d_name,p_name,url,number,channel,token):Observable<any>
  {
    console.log(url,number,channel,token);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "send_video_call_msg",
      requestparameters:{
        doctor_name:d_name,
        patient_name:p_name,
        url:url,
        mobile_number:number,
        channel_id:channel,
        token:token
      }
      }));
  }

  getSeInnerHeading(data):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_heading",
      requestparameters:{
        "form_id":data,
      }
      }));
  }

  getInnerSubHeadings(form_id,section_id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_heading",
      requestparameters:{
        "form_id":form_id,
        "section_id":section_id,
      }
    }));
  }

  getSeDependencies(field_id,option_id,section_id):Observable<any>
  {
   console.log(option_id,field_id,section_id);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_dependencies",
      requestparameters:{
        "field_id":field_id,
        "option_id":option_id,
        "section_id":section_id,    
      }
    }));
  }

  dataMining(b,c):Observable<any>
  {
    console.log(b,c);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_heading",
      requestparameters:{
        "form_id":c,
        "section_id":b,    
      }
    }));
  }

  // dataDependencies(data):Observable<any>
  // {
  //   // console.log(data);
  //   return this.http.post(this.baseurl,JSON.stringify({
  //     "requesterid":11,
  //     "requestname": "get_systemic_examination_main_data",
  //     requestparameters:{
  //       "patient_id":data,
  //     }
  //     }));
  // }

  // dataDependencie(data):Observable<any>
  // {
  //   console.log(data);
  //   return this.http.post(this.baseurl,JSON.stringify({
  //     "requesterid":11,
  //     "requestname": "custom_form_recursive_systemicc",
  //     requestparameters:{
  //       "form_id":data,
  //       "form_type":"Systemic Examination"
  //     }
  //     }));
  // }

  dataDependencie(a,b):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "custom_form_recursive_system",
      requestparameters:{
        "form_id":a,
        "section_id":b,
        "form_type":"Systemic Examination"
      }
      }));
  }


  dataDependencies(data,form_type):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "completese",
      requestparameters:{
        "appointment_id":data,
        "form_type":form_type
      }
      }));
  }

  dataDependenciess(data):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_heading",
      requestparameters:{
        "form_id":data,
      }
      }));
  }

  dataDependenciesss(a,b):Observable<any>
  {
    // console.log(data);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_inner_sub_headingg",
      requestparameters:{
        "form_id":b,
        "section_id":a,
      }
      }));
  }

  dataDependenciessss(removeformId,f_type,r_number,pft,a,b,c):Observable<any>
  {
    console.log(removeformId,f_type,r_number,pft,a,b,c);
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "get_systemic_examination_dependencies",
      requestparameters:{
        "form_id":removeformId,
        "f_type":f_type,
        "r_number":r_number,
        "section_id":a,
        "field_id":b,
        "option_id":c,
        "type":pft
      }
      }));
  }
  
  saveData(removeformId,a,b):Observable<any>
  {
  let fd =new FormData();
    let value = JSON.stringify(
      {
        "appointment_id": 432,
        "doctor_id": 11,
        "form_id":removeformId,
        "form_type":"Systemic Examination",
        "requesterid": "11",
        "requestname": "save_custom_form",
        "labels":a,
        "main_section":b,
        "patient_id":324,
    }
    );
    fd.append("requestpara",value);
    return this.http.post(this.baseurl,fd)

//     let input = new FormData();
// // Add your values in here
//     input.append('labels', a);
//     input.append('main_section', b);
//     // return "welcome";
//    return  this.http.post(this.baseurl,JSON.stringify({
//     "appointment_id":11,
//     "doctor_id": 11,
//     "form_id":6,
//     "form_type":"Systemic Examination",
//     input
//     }));
  }

  getList(a):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getSavedRecursiveForm",
      requestparameters:{
        "app_id":0,
        "appointment_id":0,
        "department_id":3,
        "doctor_id":11,
        "form_type":'Systemic Examination',
        "patient_id":324
      }
      }));
  }

  getPdfData(f_id,pf_id,f_type,d_id,p_id):Observable<any>
  {
    return this.http.post(this.baseurl,JSON.stringify({
      "requesterid":11,
      "requestname": "getSavedRecursiveForm_pdf",
      requestparameters:{
        "app_id":0,
        "appointment_id":0,
        "doctor_id":d_id,
        "form_id":f_id,
        "form_type":f_type,
        "patient_form_id":pf_id,
        "patient_id":p_id
      }
      }));
  }


}

