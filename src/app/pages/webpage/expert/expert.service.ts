import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  apiUrl = environment.baseUrl;
  
  constructor(private http:HttpClient) { }
  WalletAmount(doctorId):Observable<any>{
    let url = environment.Url +"ExpertOpinion/mywallet/"
    // let url = "http://devumdaa.in/dev/WebApi/ExpertOpinion/mywallet/"
    let _url = url + doctorId
    return this.http.get(_url)
  }
  WalletHistory(doctorId):Observable<any>{
    let url = environment.Url +"ExpertOpinion/walletHistory/"
    // let url = environment.Url +"ExpertOpinion/walletHistory/"
    let _url = url + doctorId
    return this.http.get(_url)
  }
  GetDepartments(doctorId):Observable<any>{
    return this.http.post(this.apiUrl,

      {"requesterid":doctorId,"requestname":"clinic_master"}
      
      )
  }

  generateHash(doctor_id,number,amount):Observable<any>
  {
    console.log(number,amount);
    return this.http.post(this.apiUrl,JSON.stringify(
      {
      "requesterid":51,
      "requestname": "getHashToken",
      requestparameters:{
        "doctor_id":doctor_id,
        "number":number,
        "amount":amount,
      }
      }
      ));
  }

  getDoctors(doctorId,departmentId):Observable<any>{
    let url = environment.Url +"ExpertOpinion/doctorsList/"
    // let url = environment.Url +"ExpertOpinion/doctorsList/"
    let _url = url + departmentId + "/" + doctorId
    return this.http.get(_url)
  }

  Expertrequest(data,price,result):Observable<any>{
    let url = environment.Url +"ExpertOpinion/ExpertOpinionReq"
    // let url ="https://umdaa.co/clinic/WebApi/ExpertOpinion/ExpertOpinionReq"
    let fd = new FormData();
    fd.append("user_id",result.doctor_id)
    fd.append("case_type",data.Response)
    fd.append("appointment_id",result.appointment_id)
    fd.append("comments",data.comment)
    fd.append("referred_doctor_id",data.doctor)
    fd.append("department_id",data.department)
    fd.append("transaction_amount",price)

    return this.http.post(url,fd)
  }

  amountAdd(result,obj):Observable<any>{
    console.log(result);
    console.log(obj);
    // return obj;
    let url = environment.Url +"ExpertOpinion/SavePayment"
    // // let url ="https://devumdaa.in/dev/WebApi/ExpertOpinion/SavePayment"
    let fd = new FormData();
    fd.append("doctor_id",obj)
    fd.append("amount",result.amount)
    return this.http.post(url,fd)
  }

  getReferedpatients(doctor_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/referredPatientsList/"
    // let url = environment.Url +"ExpertOpinion/referredPatientsList/"
    let _url = url + doctor_id
    return this.http.get(_url)
  }
  getRequestedpatients(doctor_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/requestsPatientsList/"
    // let url = environment.Url +"ExpertOpinion/requestsPatientsList/"
    let _url = url + doctor_id
    return this.http.get(_url)
  }
  mesagesList(result):Observable<any>{
    console.log(result)
    let url = environment.Url +"ExpertOpinion/messages/"
    // let url = environment.Url +"ExpertOpinion/messages/"
    let _url = url + result.expert_opinion_id
    return this.http.get(_url)
  }
  sendMsg(data,result):Observable<any>{
    let url = environment.Url +"ExpertOpinion/sendMessage"
    // let url ="https://umdaa.co/clinic/WebApi/ExpertOpinion/sendMessage"
    let fd = new FormData();
    fd.append("expert_opinion_id",result.expert_opinion_id)
    fd.append("user_id",result.doctor_id)
    fd.append("comments",data)
    return this.http.post(url,fd)
  }
  thankyou(result):Observable<any>{
    let url = environment.Url +"ExpertOpinion/SendThanks/"
    // let url ="https://umdaa.co/clinic/WebApi/ExpertOpinion/SendThanks/"
    let _url = url + result.expert_opinion_id
    return this.http.get(_url)
  }
  requestAgain(msg,result):Observable<any>{
    let url = environment.Url +"ExpertOpinion/RequestAgainEO"
    // let url ="https://devumdaa.in/dev/WebApi/ExpertOpinion/RequestAgainEO"
    let fd = new FormData();
    fd.append("expert_opinion_id",result.expert_opinion_id)
    fd.append("comments",msg.comment)
    return this.http.post(url,fd)
  }
  
  accepted(e_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/AcceptRequest/"
    // let url = environment.Url +"ExpertOpinion/AcceptRequest/"
    let _url = url + e_id
    return this.http.get(_url)
  }
  rejected(e_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/RejectRequest/"
    // let url = environment.Url +"ExpertOpinion/RejectRequest/"
    let _url = url + e_id
    return this.http.get(_url)
  }
  canceled(e_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/CancelRequest/"
    // let url = environment.Url +"ExpertOpinion/CancelRequest/"
    let _url = url + e_id
    return this.http.get(_url)
  }
  closed(e_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/CloseExpertOpinion/"
    // let url = environment.Url +"ExpertOpinion/CloseExpertOpinion/"
    let _url = url + e_id
    return this.http.get(_url)
  }
  getFi(e_id):Observable<any>{
    let url = environment.Url +"ExpertOpinion/eo_webview/"
    // let url = environment.Url +"ExpertOpinion/eo_webview/"
    let _url = url + e_id
    return this.http.get(_url)
  }
  Filist(data):Observable<any>{
    let url = environment.Url +"ExpertOpinion/ViewFI/"
    // let url = environment.Url +"ExpertOpinion/ViewFI/"
    let _url = url + data.appointment_id
    return this.http.get(_url)
  }
}
