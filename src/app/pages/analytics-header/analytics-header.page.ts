import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics-header',
  templateUrl: './analytics-header.page.html',
  styleUrls: ['./analytics-header.page.scss'],
})
export class AnalyticsHeaderPage implements OnInit {
  fromDate: string;
  toDate: string;
  selectedModule: any;
  lists=[{name:"Revenue"},{name:"Marketing"},{name:"Customer Behaviour"},{name:"Google My Business"}]
  selectedOffers: any=[];
  selectedPeriod: any;
  constructor(private router :Router) { }

  ngOnInit() {
  }

  
  selectMe(a)
  {
    console.log(a);
    this.selectedModule =  a;
    // if(this.selectedModule == 'Google My Business'){
    //   this.gbusiness = true
    // }
    let index = this.selectedOffers.indexOf(a);
    if(index > 0){
      this.selectedOffers.splice(index,1);
      // this.gbusiness = false
    }else{
      this.selectedOffers.push(a)
    }
  }

  search()
  {
    console.log(this.selectedModule);
    console.log(this.fromDate);
    console.log(this.toDate);
    console.log(this.selectedPeriod);
    if(this.selectedModule == undefined || this.fromDate == undefined || this.toDate==undefined
      || this.selectedPeriod == undefined){
        alert("please select all fields");
      }else{
        if(this.selectedModule == 'Revenue')
        {
          this.router.navigate(['/analyticss/Revenue/'+this.fromDate+'/'+this.toDate+'/'+this.selectedPeriod]);
        }else if(this.selectedModule == 'Marketing'){
          this.router.navigate(['/analyticss/Marketing/'+this.fromDate+'/'+this.toDate+'/'+this.selectedPeriod]);
        }
        else if(this.selectedModule == 'Customer Behaviour'){
          this.router.navigate(['/analyticss/Customer/'+this.fromDate+'/'+this.toDate+'/'+this.selectedPeriod]);
        }
        else if(this.selectedModule == 'Google My Business'){
          this.router.navigate(['/gbusiness/']);
        }  
    }
    // else{
    //   alert('Select all parameters');
    // }}
  }

  getPeriod(event: any) {
    //update the ui
    this.selectedPeriod = event.target.value;
    console.log(this.selectedPeriod);
  }
  
  
  isselected(item:any):boolean{
    const index = this.selectedOffers.indexOf(item);
    return index >= 0;
  }

  fromDatee(v) {
    var date = new Date(v),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    this.fromDate = [date.getFullYear(), mnth, day].join("-");
  }

  endDateee(v)
  {
    var date = new Date(v),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    this.toDate = [date.getFullYear(), mnth, day].join("-");
  }
}
