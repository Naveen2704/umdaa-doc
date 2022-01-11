import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { GbusinessService } from './gbusiness.service';
// declare var gapi : any;
@Component({
  selector: 'app-gbusiness',
  templateUrl: './gbusiness.page.html',
  styleUrls: ['./gbusiness.page.scss'],
})
export class GbusinessPage implements OnInit {

  // export class ListComponent implements OnInit {

    // @ViewChild('navButton',{static:false}) navButton: ElementRef
  
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
    selectedPeriod: any;
    myAccounts= [];
    SearchData: any=[];
    locationData: any=[];
    reviewsDataa: any=[];
    insightsData: any=[];
    accountData: any=[];
    accountlocation: any;
    startDate: string;
    endDatee: string;
    account_name: any=[];
    // selectedModule: any;
    // lists=[{name:"Revenue"},{name:"Marketing"},{name:"Customer Behaviour"},{name:"Google My Business"}]
    // selectedOffers: any=[];
  username: any;
  gmbsignin:any ='SIGN IN';
  
  hidereplay:boolean =true;
  fromDate: string;
  toDate: string;
    constructor(private gs:GbusinessService,private loader:LoaderService,private router :Router) {
     }
  
    ngOnInit() {
      // this.handleAccountsClick();

      this.handleClientLoad();
      // this.initClient();
    }

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
      this.accountlocation.locations[0].name,this.startDate,this.endDatee).subscribe((data) => {
        console.log(data);
        this.insightsData = (data.locationMetrics[0].metricValues);
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
      this.endDatee = new Date(e.target.value).toISOString();
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
    

  }