import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../service/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

// import { DocumentViewer } from '@ionic-native/document-viewer';

import { AlertController } from '@ionic/angular';
// import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

// class Port {
//   public id: number;
//   public name: string;
// }

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  public items: any = [];
  public val:any = [];
  public pdf:any = [];
  public ionic: any = [];
  public lists1: any = [];
  master:string="";
  // show="true";
  // jsonData:any=[];
  //  ports: Port[];
  // port: Port;
  data:string="";
  private _searchTerm: string = "";
  filtereditems:[];
  // public items: any;
  public var: any;
  public test: Array<{ title: string }> = [];

  constructor(private dataService: DataService,public alertController: AlertController,) {
   
    this.setFilteredItems();    
 }

 get searchTerm():string{
    return this._searchTerm;
 }

 set searchTerm(value){
    this._searchTerm=value;
    this.filtereditems = this.filterdata(value);
 }

 filterdata(searchString)
 {
     console.log(this.items);
    return this.items.filter(item=>
      item.consent_form_title.toLowerCase().indexOf(searchString.toLowerCase())!==-1
    )
 }
  
    setFilteredItems() {
       this.dataService.getData().subscribe((data)=>{
        console.log(data);
        this.master = data;
        localStorage.setItem("key", JSON.stringify(this.master));
        let myItem = JSON.parse(localStorage.getItem("key"));
        this.items = myItem["result"]["consent_form"];
        console.log(this.items);

      });
    }

    getValue(data){
       console.log(data);
      this.dataService.getAllDetails(data).subscribe((data)=>{
        this.searchTerm="";
        console.log(data);
        this.getDetails();
      });

    }


    getDetails()
    {
      this.dataService.getList().subscribe((data)=>{
        console.log(data);
          this.ionic = data["result"]["consent_form"];
         console.log( this.ionic);
        let myItem = JSON.parse(localStorage.getItem("key"));
        this.lists1 = myItem["result"]["consent_form"];
        console.log( this.lists1);
        this.ionic.map((a)=>{
          let obj2 =  this.lists1.find((b)=> a.consent_form_id === b.consent_form_id);
          if(obj2)
            Object.assign(a,obj2);
          return a;
          });
          console.log(this.ionic);
      });
    }

    getPdf(data)
    {
      console.log(data);
      this.dataService.getConsentForm(data).subscribe((res)=>{
         console.log(res["result"].patient_consent_form);
         this.pdf = res["result"].patient_consent_form;
         var redirectWindow = window.open('http://13.59.21.179/dev/uploads/consentforms/'+this.pdf, '_blank');
         console.log(this.pdf );
      });
    }

  ngOnInit() {

    this.getDetails();

  }
  

}
