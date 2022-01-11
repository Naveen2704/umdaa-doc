import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  apiUrl = environment.baseUrl;
 //apiUrl: string = "https://umdaa.co/clinic/WebApi/V1"

  constructor(private http: HttpClient) { }
  getData()
  {
    return this.http.post(this.apiUrl,
      {
        "requesterid": 112,
        "requestname": "getTutorialLinks",
        "requestparameters": {
            "profile_id": 6
        }
    }
    );
  }
}
