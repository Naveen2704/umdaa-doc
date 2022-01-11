import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ExpertService } from '../../webpage/expert/expert.service';
import { SummaryService } from './summary.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  patientObj: string;
 

  constructor(private dataService: DataService,private _service:SummaryService,private service:ExpertService) { }
  summaryList: any=[];
  displayedColumns: string[] = ['name', 'weight', 'symbol'];

  ngOnInit() {
    this.dataService.dataObj.subscribe((data)=>{
      console.log(data)
      this.patientObj = data
      
    });
    this.getSummary()
  }
  getSummary(){
    this._service.getData(this.patientObj).subscribe((res) => {
      console.log(res)
      this.summaryList = res.result.pa_appointment
    })
  }

 

  shortsummary(id){
   
    this._service.getshortsummary(id).subscribe((res) => {
     
     let url = res.result.pdf_name
   window.open(url,'_blank')
   })
   }
  fullsummary(id){
   this._service.getfullsummary(id).subscribe((res) => {

     let url = res.result.pdf_name
   window.open(url,'_blank')
   })
 }
 pre(e_id){
  this.service.getFi(e_id).subscribe((res)=>{
    console.log(res)
    let url = res.result.webPage
    window.open(url,'_blank')
  })
 }
}
