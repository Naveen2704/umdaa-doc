import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiService {
  clinicDiagnosis: any=[];
  Investigations:any =[]
  prescription: any=[]
  dataMorning: string;
  dataNight: string;
  dataAftenoon: string;
  day: string;

  id:string;
  constructor(private _http:HttpClient) { }
  apiUrl:string = environment.baseUrl;

  getlatestcd(result): Observable<any>{
    let url = environment.Url+"ExpertOpinion/latestClinicalDiagnosis/"
    let _url = url + result.expert_opinion_id
    return this._http.get(_url)
  }
  getlatestInv(result): Observable<any>{
    let url = environment.Url+"ExpertOpinion/latestInvestigations/"
    let _url = url + result.expert_opinion_id
    return this._http.get(_url)
  }
  getlatestPre(result): Observable<any>{
    let url = environment.Url+"ExpertOpinion/latestPrescriptions/"
    let _url = url + result.expert_opinion_id
    return this._http.get(_url)
  }
  forwardfi(result): Observable<any>{
    let url = environment.Url+"ExpertOpinion/ForwardRequest/"
    let _url = url + result.expert_opinion_id
    return this._http.get(_url)
  }
  search(term:string):Observable<any> {
    // console.log(term);
    let wikiUrl = environment.Url+'ClinicalDiagnosis/';
    // let wikiUrl = 'https://umdaa.co/clinic/clinic/WebApi/ClinicalDiagnosis/';
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + term;
    if (term === '') {
      return of([]);
    }
    let searchResult  = this._http.get(_URL).pipe( debounceTime(1000),distinctUntilChanged(),
     map((data:any) => {
      //  console.log(data);
      if(data.length != 0) {
        return data as any[];
      }
    }));
    return searchResult;
         
  }
  addDiagnosis(id,data,result):Observable<any>{
    console.log(result);
  
    this.clinicDiagnosis=[
      {
        "clinical_diagnosis_id": id,
        "disease_name": data.queryField,
        "isEnabled": false
    }
    ];
    let url  = environment.Url+"ExpertOpinion/clinical_diagnosis_submit"

    let fd = new FormData();
    fd.append('appointment_id',result.appointment_id),
    fd.append('user_id',result.doctor_id)
    fd.append('expert_opinion_id',result.expert_opinion_id)
    fd.append('clinicaldiagnosis',JSON.stringify(this.clinicDiagnosis))
  
     return this._http.post(url, fd)

  }
  deletecd(id,result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "patient_clinical_diagnosis",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
            "clinicaldiagnosis": [
                {
                    // "clinical_diagnosis_id": "187",
                    // "code": "A312",
                    // "disease_name": "Disseminated mycobacterium avium-intracellulare complex (DMAC)",
                    // "isEnabled": false,
                    "patient_cd_line_item_id": id,
                    "type": "del"
                }
            ],
            "doctor_id": result.doctor_id,
            "patient_id": result.patient_id,
            "position": 0,
            "umr_no": result.umr_no,
        }
    })
  }
  searchInve(query:string):Observable<any> {
    let wikiUrl = environment.Url+'Investigations/';
    // let wikiUrl = 'https://umdaa.co/clinic/clinic/WebApi/Investigations/';
    let params = new URLSearchParams();
    params.set('search', query); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl + query;
    return this._http.get(_URL)
         
  } 
  addinvestigations(inv_id,name,result):Observable<any>{
    this.Investigations =[
      {
        "category": "Excel",
        "checked": "",
        "investigation_code": "",
        "investigation_id":inv_id,
        "investigation_name": name,
        "isClinicInvestigation": true,
        "isSelectedCheckbox": false,
        "patient_lab_report_id": 0
    }
    ]
    let url  = environment.Url+"ExpertOpinion/investigations_submit"

    let fd = new FormData();
    fd.append('appointment_id',result.appointment_id),
    fd.append('user_id',result.doctor_id)
    fd.append('expert_opinion_id',result.expert_opinion_id)
    fd.append('investigations',JSON.stringify(this.Investigations))
  
     return this._http.post(url, fd)
  }
  delete_inv(id,result):Observable<any>{
    return this._http.post(this.apiUrl,
      {
        "requesterid": 11,
        "requestname": "investigations_submit",
        "requestparameters": {
          "appointment_id": result.appointment_id,
          "clinic_id": result.clinic_id,
          "doctor_id": result.doctor_id,
            "investigations_list": [
                {
                    "checked": "0",
                    "clinic_status": "0",
                    "investigation_id": '',
                    "investigation_name": "Endomysial Antibody IgA",
                    "isClinicInvestigation": false,
                    "isSelectedCheckbox": false,
                    "patient_investigation_line_item_id":id,
                    "patient_lab_report_id": 0,
                    "type": "del"
                }
            ],
            "patient_id": result.patient_id,
            "position": 0,
            "umr_no": result.umr_no,
        }
    })
  }
  Drugsearch(drugs:string,result):Observable<any> {
    let wikiUrl = environment.Url+'Drug/DrugSearch/';
    // let wikiUrl = 'https://umdaa.co/clinic/clinic/WebApi/Drug/DrugSearch/'
    let params = new URLSearchParams();
    params.set('search', drugs); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    let _URL = wikiUrl+result.clinic_id+"/"+drugs;
    return this._http.get(_URL)
  }
  addPrescription_check(data,result):Observable<any>{
    if(data.M == 'M' && data.A == 'A' && data.N == 'N')
    {this.day = data.M+","+data.A+","+data.N}
    else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
    else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
    else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
    else if(data.M == 'M' ){ this.day = data.M}
    else if(data.A == 'A' ){ this.day = data.A}
    else if(data.N == 'N' ){ this.day = data.N}
    else{}   
    console.log(this.day)
    console.log(this.day.split(','))
    console.log((this.day.split(',')).length)
    if(data.Note === null){
      data.Note = ''
    }
    if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
    {
      var Quantity:any = 0;
    }
    else{
     var Quantity:any  = data.Qty
    }
    this.prescription =[
      {
        "composition": "",
        "day_schedule":this.day,
                    "dosage_unit": data.type,
                    "dose_course": data.Duration,
                    "drug_dose": data.Qty,
                    "drug_id": data.Drug_id == undefined?'0':data.Drug_id,
                    "drug_status": "exist",
                    "medicine_name": data.drugField,
                    "mode": data.Mode,
                    "preffered_intake": data.radio,
                    "quantity":Quantity*data.Duration*(this.day.split(',')).length,
                    "remarks": data.Note
    }
    ]
    let url  = environment.Url+"ExpertOpinion/prescriptions"

    let fd = new FormData();
    fd.append('appointment_id',result.appointment_id),
    fd.append('expert_opinion_id',result.expert_opinion_id)
    fd.append('user_id',result.doctor_id)
    fd.append('prescriptions',JSON.stringify( this.prescription))
    return this._http.post(url, fd)
  }


  addPrescription_select(data,result):Observable<any>{
  
    if(data.Note === null){
      data.Note = ''
    }
   if(data.type == 'Others' || data.type == 'Drops' || data.type == 'mL' || data.type == 'Tea spoons' || data.type == 'Puffs' || data.type == 'Injection' || data.type == 'Application')
   {
     var Quantity:any = 0;
   }
   else{
    var Quantity:any  = data.Qty
   }
   this.prescription =[
    {
      "composition": "",
                    "day_schedule": "",
                    "day_dosage": data.time,
                    "dosage_frequency": data.Frequency,
                    "dosage_unit": data.type,
                    "dose_course": data.Duration,
                    "drug_dose": data.Qty,
                    "drug_id": data.Drug_id == undefined?'0':data.Drug_id,
                    "drug_status": "exist",
                    "medicine_name": data.drugField,
                    "mode": data.Mode,
                    "preffered_intake": data.radio,
                    "quantity":Quantity*data.Duration*data.time,
                    "remarks": data.Note
  }
  ]
  let url  = environment.Url+"ExpertOpinion/prescriptions"

  let fd = new FormData();
  fd.append('appointment_id',result.appointment_id),
  fd.append('expert_opinion_id',result.expert_opinion_id)
  fd.append('user_id',result.doctor_id)
  fd.append('prescriptions',JSON.stringify( this.prescription))
    
  return this._http.post(url, fd)
  }
  DeletePrescription(id):Observable<any>{
    return this._http.post(this.apiUrl,
    {"requesterid":11,"requestname":"delete_drug","requestparameters":{"patient_prescription_drug_id":id}}
    )
  }
}
