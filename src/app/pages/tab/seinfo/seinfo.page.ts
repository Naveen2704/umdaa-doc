import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-seinfo',
  templateUrl: './seinfo.page.html',
  styleUrls: ['./seinfo.page.scss'],
})
export class SeinfoPage implements OnInit {
  title: any;
  id:any;
  response:any;
  welcome: any;
  empList: any = [];
  empcount: any;
  final: any =[];
  conclude: any=[];
  finalList:any=[];
  public show:boolean = false;
  subheading: any=[];
  empList2: any =[];
  answer: any;
  empList3: any=[];
  field: any;
  againConcat: any;
  allfields: any=[];
  doctors: any;
  filterfilledname: any;
  title123: any;
  empList4: any;
  field_option: any;
  field_options: any;
  field_optionss: any;
  field_optionsss: any;
  field_optionssss: any;
  allfieldss: any=[];
  doctorss: any=[];
  public chkState = false;
  panel1: any;
  verify: any;
  fieldnamess: any=[];
  fill: any=[];
  f: any=[];
  fieldna: any =[];
  filterfill: any=[];
  property: any=[];
  finalsubheadings = [];
  finalsub_options=[];
  sat1: any=[];
  sat2: any=[];
  again: any=[];
  jsonId: number;
  sliceData: any =[];
  success: any=[];
  mon: any=[];
  filtered_final: any=[];


  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.title = res.title
      this.id = res.id
      console.log(this.id);
      this.getheadings(this.id)
    });
  }

  getheadings(id)
  {
    let myItem = JSON.parse(localStorage.getItem("SystemicExamination"));
    // console.log(myItem["result"]["heading"]);
    this.empList = myItem["result"]["heading"];
    // console.log(this.empList);
    // console.log(this.empList.length);
    this.response = [].concat.apply([], this.empList);
    // console.log(this.response);
    var filtered=this.response.filter(function(item){
        return item.form_id==id;         
    });
     this.finalList = filtered;

         this.empList2 = myItem["result"]["sub_heading"];
    this.subheading = [].concat.apply([], this.empList2);
    // console.log(this.subheading);
   this.again = [].concat.apply([], this.subheading);
    // console.log(this.again);
    

    this.empList3 = myItem["result"]["field_name"];
  this.field = [].concat.apply([], this.empList3);
  this.againConcat =  [].concat.apply([], this.field);
  this.filterfilledname = [].concat.apply([], this.againConcat);
  // console.log(this.filterfilledname);

        this.empList4 = myItem["result"]["field_option"];
        // console.log(this.empList4);
        this.field_option = [].concat.apply([], this.empList4);
        // console.log(this.field_option);
         this.field_options = [].concat.apply([], this.field_option);
        //  console.log(this.field_options);




         this.field_optionss = [].concat.apply([], this.field_options);
        //  console.log(this.field_optionss);
         this.field_optionsss = ([].concat.apply([], this.field_optionss));
        //  console.log(this.field_optionsss);
        //  console.log(( this.field_optionsss[29]));
        //  console.log(( this.field_optionsss[30]));
        //  console.log(this.field_optionsss[30].field_id);
        //  console.log(this.field_optionsss[29].field_id);
         for(var j=0;j<=this.field_optionsss.length-1;j++)
         {
          //  console.log(j);
         if(this.field_optionsss[j].field_id == undefined)
         {
           this.jsonId = j;
          //  console.log(this.jsonId);
           
           this.sliceData.push(this.field_optionsss.splice(j, 1));
          //  console.log(this.sliceData);
          //  console.log(this.field_optionsss);
         } 

     
              
        }  
        var abc = ([].concat.apply([], this.sliceData));
        // console.log(abc);
        // // console.log(abc[0]);
        // console.log(abc.length);
        // console.log(this.field_optionsss);
for(var k=0;k<=abc.length-1;k++){
var parsed = abc[k];
var arr = [];

for(var x in parsed){
  arr.push(parsed[x]);
}
this.success.push(arr);
// console.log(arr);

}

// console.log(this.success);
// console.log( [].concat.apply([],this.success));
this.mon = [].concat.apply([],this.success);
// console.log( [].concat.apply([],this.mon));

// console.log(this.field_optionsss);

this.filtered_final = [].concat.apply([],this.mon).concat(this.field_optionsss);
// console.log(this.filtered_final);


        // console.log((this.field_optionsss).splice(this.jsonId, 1));
  }

  toggle(final) {
    // console.log(final);
    let myItem = JSON.parse(localStorage.getItem("SystemicExamination"));
        for(var i=0;i<=this.finalList.length;i++)
        {
            if(final.section_id == this.finalList[i].section_id)
            {
             this.show = !this.show;
            return this.verify = final.section_id;
            }
         }
         
  }

}
