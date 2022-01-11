import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  apiUrl = environment.baseUrl;
  userDetails: any;
  fileslists:Array<File> = [];

  currentStatus = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) { }


  uploadPost(data,fileHolder,citizens,artype):Observable<any> {
console.log(data,fileHolder,citizens,artype)
console.log(this.userDetails.result.user_id)
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    let fd = new FormData();
    
    console.log(this.fileslists)

    fd.append("article_title",data.uptitle);
    fd.append("short_description",data.updesc);
    fd.append("article_type",artype);
    fd.append("patient_visibility",data.patient_visibility);
    fd.append("doctor_visibility",data.doctor_visibility);
    fd.append("user_id", this.userDetails.result.user_id);
    fd.append("departments",data.department);
    fd.append("citizens",citizens);
    fd.append("article_author",data.author);
    fd.append("read_article_link",data.readmore)
    for(let i=0;i<fileHolder.length;i++){
      this.fileslists[i]=  fileHolder.item(i)
      fd.append("file_i[]",this.fileslists[i]);
    } 
    console.log(fd)
    // let wikiUrl = 'http://devumdaa.in/dev/VideoSharing';
    let wikiUrl = environment.Url +'VideoSharing'
    return this.http.post(wikiUrl,fd)
  }

  getDepartments():Observable<any>{
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    return this.http.post(this.apiUrl,
      { "requesterid": this.userDetails.result.user_id, "requestname": "clinic_master" }
    )
  }
  getyourart():Observable<any> {
    this.userDetails = JSON.parse(localStorage.getItem('data'))
    // let wikiUrl = 'http://devumdaa.in/dev/VideoSharing/IndArticles/';
    let wikiUrl = environment.Url +'VideoSharing/IndArticles/';
    let _URL = wikiUrl + this.userDetails.result.user_id;
        // return this.http.get(_URL).subscribe((result)=>this.currentStatus.next(result))
        return this.http.get(_URL)
      }

      approvestatus(id):Observable<any>{
        this.userDetails = JSON.parse(localStorage.getItem('data'))
        let fd = new FormData();
        fd.append("user_id",this.userDetails.result.user_id);
        fd.append("article_id",id);
        // let wikiUrl = 'http://devumdaa.in/dev/VideoSharing/Approve/'
        let wikiUrl = environment.Url +'VideoSharing/Approve/'
        return this.http.post(wikiUrl,fd)
      }
     reject(data,id):Observable<any>{
        this.userDetails = JSON.parse(localStorage.getItem('data'))
        let fd = new FormData();
        fd.append("user_id",this.userDetails.result.user_id);
        fd.append("article_id",id);
        fd.append("comments",data.comment);
        // let wikiUrl = 'http://devumdaa.in/dev/VideoSharing/Reject/'
       let wikiUrl = environment.Url +'VideoSharing/Reject/'
        return this.http.post(wikiUrl,fd)
      }
      gethealthart():Observable<any> {
        this.userDetails = JSON.parse(localStorage.getItem('data'))   
        // let wikiUrl = 'http://devumdaa.in/dev/VideoSharing/Articles/';
        let wikiUrl = environment.Url +'VideoSharing/Articles/';
        let _URL = wikiUrl + this.userDetails.result.user_id;
            // return this.http.get(_URL).subscribe((result)=>this.currentStatus.next(result))
            return this.http.get(_URL)
          }
}
