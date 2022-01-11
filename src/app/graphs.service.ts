import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  constructor(private http: HttpClient) { }

  // getData($doctor_id,$interval,$from_date,$to_date):Observable<any>
  getData(doctor_id,from_date,to_date,period):Observable<any>
  {
    // let url ="Charts/getCharts/"+$doctor_id+
    // '/'+$interval+'/'+$from_date+'/'+$to_date;
    let url = environment.Url+"Charts/getChartsTrends/"+doctor_id+"/"+period+"/"+from_date+"/"+to_date;
    // let url = "Charts/getChartsTrends/3/Monthly/2021-01-15/2021-02-24";
    return this.http.get(url)
  }

  getMarketingDataAnalytics(doctor_id,from_date,to_date,period):Observable<any>
  {
    let url =environment.Url+"Charts/getCharts/"+doctor_id+"/"+period+"/"+from_date+"/"+to_date;
    return this.http.get(url)
  }

  locationWiseData(doctor_id,from_date,to_date,period):Observable<any>
  {
    let url =environment.Url+"Charts/locationWise/"+doctor_id+"/"+period+"/"+from_date+"/"+to_date;
    return this.http.get(url)
  }

  getCBAnalytics(doctor_id,from_date,to_date,period):Observable<any>
  {
    let url =environment.Url+"Charts/custumerBehaviour/"+doctor_id+"/"+period+"/"+from_date+"/"+to_date;
    return this.http.get(url)
  }

  avgLabTicketSize(doctor_id,from_date,to_date,period):Observable<any>
  {
    let url = environment.Url+"Charts/avgPatientSize/"+doctor_id+"/"+period+"/"+from_date+"/"+to_date;
    return this.http.get(url)
  }


}
