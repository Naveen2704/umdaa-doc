import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {Directive, ElementRef, HostListener, Input} from '@angular/core';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.page.html',
  styleUrls: ['./vitals.page.scss'],
})
export class VitalsPage implements OnInit {

  validateVitals : any=[];
  Vitalsform:FormGroup;
  submitted=false;
  vitalsdata: any;
  elements: any;
  hide:boolean =false;
  pulse: number;
  color: string;
  bp1color:string;
  bp1: number;
  bp2: number;
  RR: number;
  TEMP: number;
  SaO2:number;
  height:number;
  FeetHeight: number;
  kg:number;
  WeightPounds: any=[];
  BMI: any=[];
  heightinMetersSquare: number;
  bp2color: string;
  RRcolor: string;
  Tempcolor: string;
  sao2color: string;
  heightcolor: string;
  kgcolor: string;
  BSA: any=[];
  toggel: any;
  addTextArea: boolean;
  state:  boolean = false;
  uopGroup: FormGroup;
  adduopItems: FormArray;
  constructor(  private formBuilder:FormBuilder,private elm:ElementRef) { }

  ngOnInit() {
    this.Vitalsform = this.formBuilder.group({
      Pulse:(''),
      bp1:(''),
      bp2:(''),
      Respiratory:(''),
      Temperature:(''),
      height:(''),
      weight:(''),
      bmi:(''),
      bsa:(''),
      whr:(''),
      sa:(''),
      uop1:(''),
      uop2:(''),
      addElergy:(''),
      uop:this.formBuilder.array([
         // this.Createuop()
      ])
      
    });

}
Createuop():FormGroup{
  return this.formBuilder.group({
    adduop1: [''],
    adduop2: [''],
  });
}
isAllowed = (optional) => {
  return optional === 0 ? true : this.state;
}

onRangeChangeHandler() {

  //console.log(this.height )
  if (this.pulse > 100  || this.pulse < 60) {
      this.color = 'danger';
  } 
  else {
    this.color = 'black';
  }
 


  
}

Changebp1(){
  if( this.bp1 > 140 || this.bp1 < 120 ){
    this.bp1color = 'danger';
  }
  else {
    this.bp1color = 'black';
  }
}
Changebp2(){
  if( this.bp2 > 99 || this.bp2 < 80){
    this.bp2color = 'danger';
  }
  else {
    this.bp2color = 'black';
  }
}
ChangeRR(){
 
  if( this.RR > 22|| this.RR < 12){
    this.RRcolor = 'danger';
  }
  else {
    this.RRcolor = 'black';
  }
}
ChangeTEMP(){
 

    if( this.TEMP > 99 ||this.TEMP < 97){
      this.Tempcolor = 'danger';
    }
    else {
      this.Tempcolor = 'black';
    }
}
ChangeSao2(){

  if( this.SaO2> 100 || this.SaO2< 95){
    this.sao2color = 'danger';
  }
  else {
    this.sao2color = 'black';
  }
}
Changeheight(){


  if( this.height>213 || this.height< 152){
    this.heightcolor = 'danger';
  }
  else {
    this.heightcolor = 'black';
  }
  this.FeetHeight =  this.height * 0.0328084
  this.WeightPounds = this.kg *2.20462
  // this.FeetHeight =  this.height * 0.0328084
  this.heightinMetersSquare = (this.height *0.01)*(this.height *0.01)
  //this.WeightPounds = this.kg *2.20462
 this.BMI = Math.abs(this.kg/(this.heightinMetersSquare)).toFixed(1)
 this.BSA = Math.sqrt(this.height * this.kg / 3600).toFixed(1)

}
Changeweight(){
  
   if( this.kg > 113||this.kg< 45){
    this.kgcolor = 'danger';
  }
  else {
    this.kgcolor = 'black';
  }
  this.WeightPounds = (this.kg *2.20462).toFixed(1)
  // this.FeetHeight =  this.height * 0.0328084
  this.heightinMetersSquare = (this.height *0.01)*(this.height *0.01)
  //this.WeightPounds = this.kg *2.20462
 this.BMI = Math.abs(this.kg/(this.heightinMetersSquare)).toFixed(1)
 this.BSA = Math.sqrt(this.height * this.kg / 3600).toFixed(1)
}
getuops(){
  return (<FormArray>this.Vitalsform.get('uop')).controls
 }
adduop(): void{
  this.hide=true;

  this.adduopItems = (this.Vitalsform.get('uop') as FormArray)
  this.adduopItems.push(this.formBuilder.group({
    adduop1: new FormControl(""),
    adduop2: new FormControl(""),
  }))
}
removeuop(index: number){
  (this.Vitalsform.get('uop') as FormArray).removeAt(index);
}

onSubmit(data){
  console.log(data)
}

notify(event) {
  console.log(event);   
  this.toggel = event.detail.checked

  if (this.toggel == true) {
    return this.addTextArea = true;
  }else if (this.toggel == false) {
    this.addTextArea = false;
  }
  {
    this.addTextArea = false;
  }
}
 
}
