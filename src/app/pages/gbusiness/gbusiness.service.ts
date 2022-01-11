import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GbusinessService {

  constructor(private http:HttpClient) { }

  
  getaccountDetails(a):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+a
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/accounts';
    let url = wikiUrl;
    return this.http.get(url,{ headers: headers })
  }

  getreviewsDetails(a,account_location_details):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+a
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/'+account_location_details+'/reviews';
    let url = wikiUrl;
    return this.http.get(url,{ headers: headers })
  }

  getlocationDetails(a,account_id):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+a
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/accounts/'+account_id+'/locations';
    let url = wikiUrl;
    return this.http.get(url,{ headers: headers })
  }

  getinsightsDetails(a,id,account_location_details,starttime,endtime):Observable<any> {
    console.log(a,id,account_location_details,starttime,endtime);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+a
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/accounts/' +id +  '/locations:reportInsights';
    let url = wikiUrl;


    var request_body = {};
    request_body['locationNames'] = [account_location_details];
    request_body['basicRequest'] = {
     // "basicRequest": {
             "metricRequests": [
                {
                  "metric": "ALL"
                }
             ],
             "timeRange": {
                "startTime": starttime,
                "endTime": endtime
                  // "startTime": "2020-10-12T01:01:23.045123456Z",
                  // "endTime": "2020-11-13T23:59:59.045123456Z"
             }
       // }
   };
    return this.http.post(url,request_body,{ headers: headers })
  }

  reply(token,name,a,comment):Observable<any> {
    console.log(token,name,a,comment);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/' + name +'/reviews/'+a+'/reply';
    let url = wikiUrl;
    var request_body ={ comment: comment };

    return this.http.put(url,request_body,{ headers: headers })
  }
  Delete(token,name,a):Observable<any> {
    console.log(token,name,a);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    })
    let wikiUrl = 'https://mybusiness.googleapis.com/v4/' + name +'/reviews/'+a+'/reply';
    let url = wikiUrl;
    var request_body ={};

    return this.http.delete(url,{ headers: headers })
  }
}
