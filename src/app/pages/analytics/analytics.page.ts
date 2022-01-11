import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {FormGroup, FormControl} from '@angular/forms';
import { AppointmentService } from 'src/app/service/appointment.service';
import { GraphsService } from 'src/app/graphs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { GbusinessService } from '../gbusiness/gbusiness.service';
// import { GbusinessService } from './gbusiness.service';
import { DateAdapter } from '@angular/material/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  // public barChartPlugins = [pluginDataLabels];
    // public doughnutChartPlugins = [pluginDataLabels];
  // gbusiness
  apiKey: any = 'AIzaSyD4rpILmhUjAAOxFwN7D62xCbyK1RCGNg4';
  clientId: any='156131389471-492fagorrn1biovqs6qnmiq9fnfvfd7t.apps.googleusercontent.com';
  scopes: any = 'https://www.googleapis.com/auth/business.manage';
  accountDetails: any=[];
  LocationDetails: any=[];
  InsightsDetails: any=[];
  ReviewsDetails: any=[];
  hide:boolean=true;
  show:boolean=false;
  id: any;
  reviewData: any;
  mainData: any=[];
//   selectedPeriod: any;
  myAccounts= [];
  SearchData: any=[];
  locationData: any=[];
  reviewsDataa: any=[];
  insightsData: any=[];
  accountData: any=[];
  accountlocation: any;
  startDate: string;
  endDateee: string;
  account_name: any=[];
  hideMainData:boolean = false;
//   selectedModule: any;
//   lists=[{name:"Revenue"},{name:"Marketing"},{name:"Customer Behaviour"},{name:"Google My Business"}]
//   selectedOffers: any=[];
username: any;
gmbsignin:any ='SIGN IN';
hidereplay:boolean =true;
fromDateee: string;
toDatee: string;
// hidereplay:boolean =true;
// fromDate: string;
// toDate: string;
  // gbusiness
  // isselected:boolean = false;
  barChartOptions:ChartOptions  = {
    responsive: true,
    maintainAspectRatio: false,
  }
  doughnutChartOptions:ChartOptions ={
    responsive: true,
    maintainAspectRatio: false,
  }
  lineChartOptions:ChartOptions ={
    responsive: true,
    maintainAspectRatio: false,
  }
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  // p
  fromDate:any;
  toDate:any;
  max = new Date()
  google:boolean=false;
  //start stacked charts

  public barChartLabels=[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public chartColors: any[] = [
    { 
      backgroundColor: ['#ffb91d', '#9a92cd', '#6de304', '#ff0000', '#732bea', '#c913ad','#f97817'],

    }];
 
    public barChartColors: any[] = [
      { 
        backgroundColor: '#ffb91d'
  
      },
      {
        backgroundColor:'#9a92cd'
      },
      {
        backgroundColor: '#6de304'
      },
      {
        backgroundColor:'#ff0000'
      },
      {
        backgroundColor:'#732bea'
      },
      {
        backgroundColor: '#c913ad'
      },
      {
        backgroundColor:'#f97817'
      },
    ]
    public override :any[]=[{
      fill: false
    }]
  public barChartData =[];

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

    // Start Line charts
  public lineChartData = [];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  // End Line Charts
  parameters: any;
  amount: any;
  chartReady = false;
  xaxis: any;
  chartsAmount: any;
  chartsLabel: any;
  doctor_id: any;
  selectedPeriod: any;
  listData: any;
  analyticTable: any=[];
  analyticLabel: any;
  analyticData: any;
  selectedModule: any;
  lists=[{name:"Revenue"},{name:"Marketing"},{name:"Customer Behaviour"},{name:"Google My Business"}]
  selectedOffers: any=[];
  analyticLocationTable: any=[];
  avgLabTable: any=[];
  labTotalAmount: any;
  labTotalCount: any;
  labTotalWeek: any;
  avgLabTablee=[];
  avgpharmacyTable: any=[];
  gbusiness: boolean =false;
  // id: string;
  t_date: string;
  f_date: string;
  period: string;
  analytic: boolean;
  hideImageData:boolean = true;
  hideMainDataa:boolean = false;
  hideMainDataaa:boolean = false;

  constructor(private route: ActivatedRoute,private chart:GraphsService,private router :Router,
    private gs:GbusinessService,private loader:LoaderService,private dateAdapter: DateAdapter<Date>) { 

      this.dateAdapter.setLocale('en-GB');
    }

  ngOnInit() {
    this.handleClientLoad();
  }

  getPeriod(event: any) {
    //update the ui
    this.selectedPeriod = event.target.value;
    console.log(this.selectedPeriod);
  }

  fromDatee(v) {
    var date = new Date(v),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    this.fromDate = [date.getFullYear(), mnth, day].join("-");
  }

  endDatee(v)
  {
    var date = new Date(v),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    this.toDate = [date.getFullYear(), mnth, day].join("-");
  }

  getName(a)
  {
    // alert(a);
    this.selectedModule =a;
    // this.hideMainData =  true;
    // this.hideImageData = false;
    if(this.selectedModule == 'Google My Business')
    {
      this.search();
      this.hideMainData =  false;
      this.hideImageData = false;
      this.hideMainDataa = false;
      this.hideMainDataaa = true;
    }else{
      this.hideMainData =  true;
      this.hideImageData = false;
      this.hideMainDataa = true;
      this.hideMainDataaa = true;
    }
  }

  back()
  {
    this.hideImageData=true;
    this.hideMainData=false;
    this.hideMainDataaa = false;
    this.hideMainDataa = false;
    this.google = false;
    this.router.navigate(['/analytics/']);
    location.reload();
  }
  
  getAnalytics()
  {
    // alert(this.selectedPeriod)
    if(this.selectedPeriod == undefined || this.fromDate == undefined || this.toDate == undefined)
    {
      alert('please select all fields');
      this.loader.loadingDismiss();
    }else if(this.selectedPeriod == 'interval')
    {
      alert("Select Interval");
      this.loader.loadingDismiss();
    }else{
    this.barChartData=[];
    console.log(JSON.parse(localStorage.getItem('data')));
    console.log(JSON.parse(localStorage.getItem('data'))['result'].user_id);
    this.doctor_id = JSON.parse(localStorage.getItem('data'))['result'].user_id;
    this.chart.getData(this.doctor_id,this.fromDate,this.toDate,this.selectedPeriod).subscribe((data) => {
    // this.chart.getData(this.doctor_id,f_date,t_date,interval).subscribe((data) => {
      
      console.log(data);
      console.log(data['result']['Analytics'][0]);
      console.log(data['result']['AnalyticsPie'][0]['label']);
      console.log(data['result']['AnalyticsPie'][0]['data']);
      this.analyticLabel = data['result']['AnalyticsPie'][0]['label'];
      this.analyticData = data['result']['AnalyticsPie'][0]['data'];
      // console.log(data['result']['AnalyticsTable'][0].data);
      this.analyticTable = data['result']['AnalyticsTable'][0].data;
      this.listData = data['result']['Analytics'][0];
      console.log(data['result']['Analytics']);
      // console.log(data['result']['AnalyticsTrends']);
      // this.chartsAmount = data['result']['AnalyticsTable'][0]['amount'];
      // this.chartsLabel = data['result']['AnalyticsTable'][0]['label'];
      // console.log(data['result']['Analytics'][0]['trends']);
      // console.log(data['result']['Analytics'][0]['Amount']);
      // console.log(data['x-axis']);
      this.parameters = data['result']['Analytics'][0]['trends'];
      // this.amount = data['result']['Analytics'][0]['Amount'];
      this.xaxis = data['x-axis'];
      // End Loading

      this.loader.loadingDismiss()
      this.barChartTrends(this.parameters,data['x-axis']);
      this.doughnut(this.analyticLabel,this.analyticData);
      this.lineRevenueTrends(this.parameters,data['x-axis']);
      // console.log(data['result'].docList);
      // this.doctorList = data['result'].docList;

    })   
   }
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
    }else{
      this.selectedOffers.push(a)
    }
  }

  isselected(item:any):boolean{
    const index = this.selectedOffers.indexOf(item);
    return index >= 0;
  }

  search()
  {
    // start loading
    console.log(this.selectedModule);
    if(this.selectedModule != undefined){
        if(this.selectedModule == 'Revenue')
        {
          this.loader.loadingPresent()
          this.getAnalytics();
          this.analytic =true;
          this.google=false;
        }else if(this.selectedModule == 'Marketing'){
          this.loader.loadingPresent()
          this.getMarketingAnalytics();
          this.analytic =true;
          this.google=false;
        }
        else if(this.selectedModule == 'Customer Behaviour'){
          this.loader.loadingPresent()
          this.getcustomerBehaviourAnalytics();
          this.analytic =true;
          this.google=false;
        }
        else if(this.selectedModule == 'Google My Business'){
          this.loader.loadingPresent()
          this.google=true;
          this.analytic=false;
          this.loader.loadingDismiss();
          // this.getcustomerBehaviourAnalytics();
          // this.router.navigate(['/gbusiness/']);
          // this.gbusiness = true
        }  
    }else{
      alert('Select all parameters');
    }
  }

  getcustomerBehaviourAnalytics()
  {
    if(this.selectedPeriod == undefined || this.fromDate == undefined || this.toDate == undefined)
    {
      alert('please select all fields');
      this.loader.loadingDismiss();
    }else if(this.selectedPeriod == 'interval')
    {
    }else{
    this.barChartData=[];
    console.log(JSON.parse(localStorage.getItem('data')));
    console.log(JSON.parse(localStorage.getItem('data'))['result'].user_id);
    this.doctor_id = JSON.parse(localStorage.getItem('data'))['result'].user_id;
    this.chart.getCBAnalytics(this.doctor_id,this.fromDate,this.toDate,
      this.selectedPeriod).subscribe((data) => {
      console.log(data);
      console.log(data['result']['Analytics'][0]);
      console.log(data['result']['AnalyticsPie'][0]['label']);
      console.log(data['result']['AnalyticsPie'][0]['data']);
      this.analyticLabel = data['result']['AnalyticsPie'][0]['label'];
      this.analyticData = data['result']['AnalyticsPie'][0]['data'];
      // console.log(data['result']['AnalyticsTable'][0].data);
      this.analyticTable = data['result']['AnalyticsTable'][0].data;
      this.listData = data['result']['Analytics'][0];
      console.log(data['result']['Analytics']);
      // End Loading
      // console.log(data['result']['AnalyticsTrends']);
      // this.chartsAmount = data['result']['AnalyticsTable'][0]['amount'];
      // this.chartsLabel = data['result']['AnalyticsTable'][0]['label'];
      // console.log(data['result']['Analytics'][0]['trends']);
      // console.log(data['result']['Analytics'][0]['Amount']);
      // console.log(data['x-axis']);
      this.parameters = data['result']['Analytics'][0]['trends'];
      // this.amount = data['result']['Analytics'][0]['Amount'];
      this.xaxis = data['x-axis'];
       // End Loading
       
      this.loader.loadingDismiss();
      this.barChartTrends(this.parameters,data['x-axis']);
      this.doughnut(this.analyticLabel,this.analyticData);
      this.lineCBTrends(this.parameters,data['x-axis']);
      // console.log(data['result'].docList);
      // this.doctorList = data['result'].docList;

    });
    this.chart.locationWiseData(this.doctor_id,this.fromDate,this.toDate,
      this.selectedPeriod).subscribe((data) => {
      console.log(data);
      console.log(data['result']['AnalyticsPie'].label);
      console.log(data['result']['AnalyticsPie'].data);

      
      this.pieChartLabels = data['result']['AnalyticsPie'].label;
      this.pieChartData = data['result']['AnalyticsPie'].data;

      // this.doughnutChartLabels =  data['result']['AnalyticsPie'].label;
      // this.doughnutChartData = data['result']['AnalyticsPie'].data;
      console.log(data['result']['AnalyticsTable']);
      this.analyticLocationTable = data['result']['AnalyticsTable'][0].data;
    })    
    this.chart.avgLabTicketSize(this.doctor_id,this.fromDate,this.toDate,
      this.selectedPeriod).subscribe((data) => {
      console.log(data);
      console.log(data['result']['AnalyticsTable']);
      console.log(data['x-axis']);
      console.log(data['result']['AnalyticsTable'][0]);
      console.log(data['result']['AnalyticsTable'][0].amount);
      console.log(data['result']['AnalyticsTable'][0].count);
      console.log(data['result']['AnalyticsTable'][0].week);
      console.log(data['result']['AnalyticsTable'][0].pharmacy);
      this.avgLabTable = data['result']['AnalyticsTable'][0].data;
      this.avgpharmacyTable = data['result']['AnalyticsTable'][1].pharmacy;
      console.log(this.avgLabTable);
    })  
    }
  }

  getMarketingAnalytics()
  {
    if(this.selectedPeriod == undefined || this.fromDate == undefined || this.toDate == undefined)
    {
      alert('please select all fields');
      this.loader.loadingDismiss();
    }else if(this.selectedPeriod == 'interval')
    {
    }else{
    this.barChartData=[];
    console.log(JSON.parse(localStorage.getItem('data')));
    console.log(JSON.parse(localStorage.getItem('data'))['result'].user_id);
    this.doctor_id = JSON.parse(localStorage.getItem('data'))['result'].user_id;
    this.chart.getMarketingDataAnalytics(this.doctor_id,this.fromDate,this.toDate,this.selectedPeriod).subscribe((data) => {
      console.log(data);
      console.log(data['result']['Analytics'][0]);
      console.log(data['result']['AnalyticsPie'][0]['label']);
      console.log(data['result']['AnalyticsPie'][0]['data']);
      this.analyticLabel = data['result']['AnalyticsPie'][0]['label'];
      this.analyticData = data['result']['AnalyticsPie'][0]['data'];
      // console.log(data['result']['AnalyticsTable'][0].data);
      this.analyticTable = data['result']['AnalyticsTable'][0].data;
      this.listData = data['result']['Analytics'][0];
      console.log(data['result']['Analytics']);
      // console.log(data['result']['AnalyticsTrends']);
      // this.chartsAmount = data['result']['AnalyticsTable'][0]['amount'];
      // this.chartsLabel = data['result']['AnalyticsTable'][0]['label'];
      // console.log(data['result']['Analytics'][0]['trends']);
      // console.log(data['result']['Analytics'][0]['Amount']);
      // console.log(data['x-axis']);
      this.parameters = data['result']['Analytics'][0]['trends'];
      // this.amount = data['result']['Analytics'][0]['Amount'];
      this.xaxis = data['x-axis'];
      // End Laoding
      
      this.loader.loadingDismiss()
      this.barChartTrends(this.parameters,data['x-axis']);
      this.doughnut(this.analyticLabel,this.analyticData);
      this.lineMarketingTrends(this.parameters,data['x-axis']);
      // console.log(data['result'].docList);
      // this.doctorList = data['result'].docList;

    });
    this.chart.locationWiseData(this.doctor_id,this.fromDate,this.toDate,this.selectedPeriod).subscribe((data) => {
      console.log(data);
      console.log(data['result']['AnalyticsPie'].label);
      console.log(data['result']['AnalyticsPie'].data);

      
      this.pieChartLabels = data['result']['AnalyticsPie'].label;
      this.pieChartData = data['result']['AnalyticsPie'].data;

      // this.doughnutChartLabels =  data['result']['AnalyticsPie'].label;
      // this.doughnutChartData = data['result']['AnalyticsPie'].data;
      console.log(data['result']['AnalyticsTable']);
      this.analyticLocationTable = data['result']['AnalyticsTable'][0].data;
    })    
    }
  }

  doughnut(label,amount)
  {
    console.log(amount,label)
    this.chartReady = true;
    this.doughnutChartLabels = label;
    this.doughnutChartData = amount;
  }

  barChartTrends(param,axis)
  {
    this.barChartData=[];
    this.chartReady = true;
    console.log(param);
    // console.log(param[0]);
    console.log(axis);
    this.barChartLabels = axis;
    for(var i=0;i<param.length;i++)
    {
      console.log(param[i]);
         
      this.barChartData.push(param[i])
    }
  }

  lineRevenueTrends(params,axis)
  {
    this.chartReady = true;
    // // this.lineChartData = amount;
    // this.lineChartLabels = params;
    // for(var i=0;i<params.length;i++)
    // {
        this.lineChartData = [
          params[0],
          params[1],
          params[2],
          params[3],
          params[4],
          params[5],
          params[6]
        ];
    // }
     this.lineChartLabels = axis;
  }

  lineMarketingTrends(params,axis)
  {
    this.chartReady = true;
    // // this.lineChartData = amount;
    // this.lineChartLabels = params;
    // for(var i=0;i<params.length;i++)
    // {
  
        this.lineChartData = [
          params[0],
          params[1],
          params[2]
          // params[3],
          // params[4],
          // params[5]
        ];
    // }
     this.lineChartLabels = axis;
     
  }

  lineCBTrends(params,axis)
  {
    this.chartReady = true;
    // // this.lineChartData = amount;
    // this.lineChartLabels = params;
    // for(var i=0;i<params.length;i++)
    // {
        this.lineChartData = [
          params[0],
          params[1],
          params[2],
          params[3]
          // params[3],
          // params[4],
          // params[5]
        ];
    // }
     this.lineChartLabels = axis;
  }

  // first(event) {
  //   console.log(event);
  //   // this.roomsFilter.date = event;
  //   // this.getData(this.roomsFilter.date);
  // }

  // Start gBusiness
  
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({apiKey: 'AIzaSyD4rpILmhUjAAOxFwN7D62xCbyK1RCGNg4',
     clientId: '156131389471-492fagorrn1biovqs6qnmiq9fnfvfd7t.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/business.manage'})
        .then(function() {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn;
        });
  }

  handleAuthClick() {
    // this.loader.loadingDismiss();
    // alert("test");
    if(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile() == undefined)
    {
      gapi.auth2.getAuthInstance().signIn().then((result)=>{
        console.log('TOKEN1',gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
        var abc = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        if(abc != '')
        {
          this.hide = false;
          this.show=true;
          this.handleAccountsClick();
        }
      });
    }
    else
    {
      // gapi.auth2.getAuthInstance().signIn().then((result)=>{
        var abc = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        this.hide = false;
        this.show=true;
        
        this.handleAccountsClick();
      // });
    }
  }

  handleAccountsClick() {
    console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
   
    this.loader.loadingPresent();
    this.gs.getaccountDetails(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token).subscribe((data) => {
      console.log(data);
    
      this.account_name = data;
      this.username = data.accounts[0].accountName;
      this.location();
      this.loader.loadingDismiss();
    })
  }

  location()
  {
    this.gs.getlocationDetails(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
    gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId()).subscribe((data) => {
      console.log(data);
      this.accountlocation = data;
      console.log(this.accountlocation);
      this.locationData = this.accountlocation.locations
      console.log(   this.locationData)
    })
  }
  yourFn(e){
    console.log(e.tab.textLabel)
    if(e.tab.textLabel =='Reviews'){
      this.reviews()
    } 
  }

  reviews()
  { 
    // alert('hello')
    console.log(this.accountlocation)

    console.log(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId());
    console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
    this.loader.loadingPresent();
    this.gs.getreviewsDetails(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
    this.accountlocation.locations[0].name).subscribe((data) => {
      console.log(data);
      this.reviewsDataa = data;
      this.loader.loadingDismiss();
    })
  }

  insights()
  {
    this.loader.loadingPresent();
    this.gs.getinsightsDetails(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
    gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId(),
    this.accountlocation.locations[0].name,this.startDate,this.endDateee).subscribe((data) => {
      console.log(data);
      this.insightsData = data.locationMetrics[0].metricValues;
      console.log(this.insightsData);
      this.loader.loadingDismiss();
    })
  }
  
  selectDate(e)
  {
    console.log(e.target.value);
    console.log(new Date(e.target.value).toISOString());
    this.startDate = new Date(e.target.value).toISOString();
  }

  endDate(e)
  {
    console.log(e.target.value);
    console.log(new Date(e.target.value).toISOString());
    this.endDateee = new Date(e.target.value).toISOString();
  }

  reply(a)
  {
    this.hidereplay = true;
    this.id = a;
  }

  submitReply(a)
  {
      this.gs.reply(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
      this.accountlocation.locations[0].name,a,this.reviewData).subscribe((data) => {
        console.log(data);
          this.reviews();
          this.hidereplay = false;
      })
  }

  replyComment(e)
  {
    this.reviewData = e;
  }

  deleteReply(a)
  {
      this.gs.Delete(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
      this.accountlocation.locations[0].name,a).subscribe((data) => {
        console.log(data);
          this.reviews();
          // this.hidereplay = false;
      })
  }
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
    window.location.reload();
  }
  
  // End gbusiness

}
