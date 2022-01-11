import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/service/examination.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  forms: any;
  
  constructor(private examinationService: ExaminationService) {}

  
  ngOnInit() {
    // this.getData();
  }

  // getData()
  // {
  //   this.examinationService.getExamination().subscribe((data)=>{
  //     let result = localStorage.setItem("SystemicExamination", JSON.stringify(data));
  //     let myItem = JSON.parse(localStorage.getItem("SystemicExamination"));
  //     console.log(myItem);
  //     console.log(myItem["result"]["form"]);
  //     this.forms = myItem["result"]["form"];
  //   });
  // }
}