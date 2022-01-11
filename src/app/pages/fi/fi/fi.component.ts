import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatListOption, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfirmdailogService } from '../main/confirmdailog.service';
import { FiService } from './fi.service';

export interface Mode {
  value: string;
  viewValue: string;
}
export interface Time {
  value: string;
  viewValue: string;
}
export interface Type {
  value: string;
  viewValue: string;
}

interface Food {
  value: string;
  viewValue: string;
}
const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'Are you sure to delete ?',
  cancelText: 'NO',
  confirmText: 'YES'
};
@Component({
  selector: 'app-fi',
  templateUrl: './fi.component.html',
  styleUrls: ['./fi.component.scss'],
})
export class FiComponent implements OnInit {
  CdForm: FormGroup;
  InForm: FormGroup;
  patientObj: string;
  getlatestCds: any=[];
  getlatestinv: any;
  items: Observable<string[]>;
  cdId: string;
  code: string;
  isSubmitted: boolean;
  DrugForm: FormGroup;
  results: any=[];
  options: Observable<string[]>;
  isprescribed: boolean;
  displayedColumns: string[] = ['position', 'name', 'weight'];
  displayedColumns_in :string[] = ['position', 'name', 'weight','Edit'];
  displayedColumns_pr: string[] = ['position', 'name', 'Prescription','Actions'];
  types: Type[] = [
    {value: 'Form', viewValue: 'Form'},
    {value: 'mL', viewValue: 'mL'},
    {value: 'Drops', viewValue: 'Drops'},
    {value: 'Tea spoons', viewValue: 'Tea spoons'},
    {value: 'Tablet', viewValue: 'Tablet'},
    {value: 'Capsule', viewValue: 'Capsule'},{value: 'Scoops', viewValue: 'Scoops'},
    {value: 'Respules', viewValue: 'Respules'},

    {value: 'Sachets', viewValue: 'Sachets'},
    {value: 'Puffs', viewValue: 'Puffs'},{value: 'Patch', viewValue: 'Patch'},
    {value: 'Enema', viewValue: 'Enema'},

    {value: 'Suppository', viewValue: 'Suppository'},
    {value: 'Pint', viewValue: 'Pint'},{value: 'Bottle', viewValue: 'Bottle'},
    {value: 'Injection', viewValue: 'Injection'},{value: 'Application', viewValue: 'Application'},
    {value: 'Others', viewValue: 'Others'}
  ];
  modes: Mode[] = [
    {value: 'Minute', viewValue: 'Minute'},
    {value: 'Hour', viewValue: 'Hour'},
    {value: 'Day', viewValue: 'Day'},
    {value: 'Week', viewValue: 'Week'},
    {value: 'Fortnight', viewValue: 'Fortnight'},
    {value: 'Month', viewValue: 'Month'},
    {value: 'Year', viewValue: 'Year'},
    {value: '--', viewValue: '--'},
  ];
  times: Time[] = [
    {value: 'SOS', viewValue: 'SOS'},
    {value: 'STAT', viewValue: 'STAT'},
    {value: 'HS', viewValue: 'HS'},
    {value: '1', viewValue: '1 TIME'},
    {value: '2', viewValue: '2 TIMES'},{value: '3', viewValue: '3 TIMES'},{value: '4', viewValue: '4 TIMES'},{value: '5', viewValue: '5 TIMES'},{value: '6', viewValue: '6 TIMES'},{value: '7', viewValue: '7 TIMES'},{value: '8', viewValue: '8 TIMES'},{value: '9', viewValue: '9 TIMES'},{value: '10', viewValue: '10 TIMES'},{value: '11', viewValue: '11 TIMES'},{value: '12', viewValue: '12 TIMES'},{value: '13', viewValue: '13 TIMES'},{value: '14', viewValue: '14 TIMES'},{value: '15 ', viewValue: '15 TIMES'},{value: '16', viewValue: '16 TIMES'},{value: '17', viewValue: '17 TIMES'},{value: '18', viewValue: '18 TIMES'},{value: '19', viewValue: '19 TIMES'},
    {value: '20', viewValue: '20 TIMES'}, {value: '21', viewValue: '21 TIMES'}, {value: '22', viewValue: '22 TIMES'}, {value: '23', viewValue: '23 TIMES'}, {value: '24', viewValue: '24 TIMES'},
 
    
  ];
  foods: Food[] = [
    {value: 'Oral', viewValue: 'Oral'},
    {value: 'IV (Intra-venous)', viewValue: 'IV (Intra-venous)'},
    {value: 'IM (Intra-muscular)', viewValue: 'IM (Intra-muscular)'},
    {value: 'Local Application', viewValue: 'Local Application'},
    {value: 'Subcutaneous', viewValue: 'Subcutaneous'},
    {value: 'Transdermal', viewValue: 'Transdermal'}, {value: 'Inhalation', viewValue: 'Inhalation'},
    {value: 'Sublingual', viewValue: 'Sublingual'},
    {value: 'Buccal delivery', viewValue: 'Buccal delivery'}, {value: 'Nasal', viewValue: 'Nasal'},
    {value: 'Vaginal delivery"', viewValue: 'Vaginal delivery"'},
    {value: 'Rectal delivery', viewValue: 'Rectal delivery'},

    {value: 'Intralesional', viewValue: 'Intralesional'},
    {value: 'Intrathecal', viewValue: 'Intrathecal'}, {value: 'Epidural', viewValue: 'Epidural'},
    {value: 'Implantaion', viewValue: 'Implantaion'},{value: 'Ocular', viewValue: 'Ocular'}, {value: 'Nebulization', viewValue: 'Nebulization'},
    {value: 'Others', viewValue: 'Others'},
  ];
  inv_id: any;
  invId: string;
  isChecked: boolean;
  isCheckedd: boolean;
  isCheckeddd: boolean;
  checkboxvalue: any;
  day: string;
  avalibleqty: number;
  avlQty: number;
  modeselect = 'Oral';
  typeselect = 'Tablet';
  drug_id: any;
  s_drugId: any;
  changedvalue: any;
  freqvalue: any;
  freqvaluee: string;
  dataSource: any=[];
  PrescriptionLength: any =[];
  constructor( public _fb :FormBuilder,private service:FiService,private dataService: DataService,private _dailog:ConfirmdailogService,private _notification:NotificationService,private router:Router) { }

  ngOnInit() {

    this.dataService.dataObj.subscribe((data)=>{
      console.log(data)
      this.patientObj = data
      
    });
  this.CdForm = this._fb.group({
    queryField:new FormControl(''),
    cd_id : new FormControl(''),
    cd_code:new FormControl('')
  });
  this.InForm =  this._fb.group({
    queryinvField:new FormControl(''),
    Inv_id:new FormControl('')
  })
  this.DrugForm = this._fb.group({
    drugField:new FormControl('',Validators.required),
    Drug_id:new FormControl(''),
    Mode:new FormControl(''),
    type:new FormControl(''),
    M:new FormControl(''),
    A:new FormControl(''),
    N:new FormControl(''),

    time:new FormControl(''),
    Frequency:new FormControl(''),
    radio:new FormControl('',),
    Qty:new FormControl('',Validators.required),
    Duration:new FormControl('',Validators.required),
    Note:new FormControl(''),
    // followupdate:new FormControl(Date)
    
  })


  this.getclinicaldaignosis()
  this.getlatestinve()
  this.getlatestPrescription()
  }

  getclinicaldaignosis(){
    this.service.getlatestcd(this.patientObj).subscribe((res)=>{
      console.log(res)
      this.getlatestCds = res.result.clinicaldiagnosis;
    })
  }
  getlatestinve(){
    this.service.getlatestInv(this.patientObj).subscribe((res)=>{
      console.log(res)
      this.getlatestinv = res.result.investigations_list;
    })
  }
  getlatestPrescription(){
    this.service.getlatestPre(this.patientObj).subscribe((res)=>{
      console.log(res)
      this.PrescriptionLength = res.result.prescription
      this.dataSource = new MatTableDataSource( res.result.prescription);
    })
  }
  search (term: string) {
    console.log(term);
    if(term.length >= 3 ){
    this.items = this.service.search(term);
    console.log(this.items);

    }
   
    
  }

  getId(id,code)
  {
    console.log(id,code);
    //this.cd_id_s = id;
    //this.cd_id = this.cd_id_s 
    //console.log(this.cd_id);
    this.CdForm.get('cd_id').setValue(id);
    this.CdForm.get('cd_code').setValue(code)
  }

  cdsearch(data,formDirective: FormGroupDirective){
    console.log(data.cd_id,data.cd_code);
    console.log(this.getlatestCds)
    console.log(data)
    if(data.cd_id == null )
    {
      this.cdId = '0';
      
    }
    else{
      this.cdId = data.cd_id
      
    }
    if(data.cd_code == null)
    {
      
      this.code = '';
    }
    else{
     
      this.code = data.cd_code
    }
    this.isSubmitted = true;
    if (!this.CdForm.valid ) {
      return false;
    }
    else{
      // this is for 
      
      this.service.addDiagnosis(this.cdId,data,this.patientObj).subscribe((res)=>{
        console.log(res)
        if(res['code']=='200'){
          this.getclinicaldaignosis()
          // this.ngOnInit();
          // this.getlatestCd(this.fi_Obj);
          // this._notification.success('Diagnosis Added successfully');

        }else{
          // this._notification.error('Diagnosis Added failed');

        }
      })
     
      formDirective.resetForm()
    }
   
  }
  deletcd(id){
    console.log(id);
     this._dailog.open(options).afterClosed().subscribe(res =>{
      if(res){
        this.service.deletecd(id,this.patientObj).subscribe(data => {
          console.log(data);
          if(data['code'] == '200'){
            this._notification.success('Diagnosis Deleted successfully');
            this.getclinicaldaignosis()
          // this.usersForm.reset();
         // formDirective.resetForm();
          }
          else{
            this._notification.error('Diagnosis Deletion failed');
          }
          
         })
      }
    })
  }
  getinvid(id){
    this.inv_id = id
    this.InForm.get('Inv_id').setValue(this.inv_id );
  }
  invsearch(query: string) {
    // console.log(query);

     if(query.length>=3){
    
       this.options = this.service.searchInve(query);
       this.getlatestinve()
      
     }
      if(query.length ==0 ){
      this.options = this.service.searchInve(query);
       
     }else{

     }
     
   }

   insearchadd(data,formDirective: FormGroupDirective){
    console.log(data.Inv_id)
    console.log(data,data.queryinvField)
    if(data.Inv_id == null)
    {
      this.invId = '0'
    }
    else{
      this.invId = data.Inv_id
    }

  //  this.isadded= true;
   if (!this.InForm.valid ) {
     return false;
   }else{
     this.service.addinvestigations(this.invId,data.queryinvField,this.patientObj).subscribe((res)=>{
       console.log(res)
       if(res['code']=='200'){
        // this.getlatestCd();
         this._notification.success('Investigations Added successfully');
         this.getlatestinve()
       }else{
         this._notification.error('Investigations Added failed');

       }
     }
    )
     formDirective.resetForm()
   }
 }
 deleteinv(id){
  console.log(id)
  this._dailog.open(options).afterClosed().subscribe(res =>{
    if(res){
      this.service.delete_inv(id,this.patientObj).subscribe(data => {
        console.log(data);
        if(data['code'] == '200'){
          this._notification.success('Investigation Deleted successfully');
          this.getlatestinve()
        // this.usersForm.reset();
       // formDirective.resetForm();
        }
        else{
          this._notification.error('Investigation Deletion failed');
        }
        
       })
    }
  })
}


  drugsearch(drugs: string){
    if(drugs.length>=3){

  
      this.service.Drugsearch(drugs,this.patientObj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        console.log(data)
      }));
      
    }
    if(drugs.length ==0){
      this.service.Drugsearch(drugs,this.patientObj).subscribe((data=>{
        this.results = data.result['medicine_object']['drugs']
        // console.log(this.results)
        // console.log(this.results.result['medicine_object']['drugs'])
      }));
      
     // this.results = this._searchService.search(drugs)
      
    }
  }
  druginfo(item){
    console.log(item)
    console.log(item.available_quantity)
    this.avlQty = item.available_quantity
   console.log(item.trade_name,item.drug_id)
   this.drug_id = item.drug_id
   this.s_drugId = item.drug_id;
   console.log(this.s_drugId)
  }
  check(event){

    console.log(event.checked);
    this.checkboxvalue = event.checked;
    console.log(this.checkboxvalue)
    if(this.isChecked == true){
      this.DrugForm.get('M').setValue('M');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }
     if(this.isCheckedd == true){
      this.DrugForm.get('A').setValue('A');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }
    if (this.isCheckeddd == true){
      this.DrugForm.get('N').setValue('N');
      this.DrugForm.get('time').patchValue('');
      this.DrugForm.get('Frequency').patchValue('');
    }else{

    }
    // if(this.isChecked == true || this.isCheckedd == true || this.isCheckeddd == true){
    //   this.DrugForm.get('time').patchValue('');
    //   this.DrugForm.get('Frequency').patchValue('');
    // }else{
    
    // }
 
   
    
  }
  selectionChange(option: MatListOption) {
    console.log(option.value);
    this.changedvalue = option.value
    if(this.changedvalue!=''){
      this.isChecked = false;
      this.isCheckedd = false;
      this.isCheckeddd = false;
  
    }
  }
  selectionChanges(option: MatListOption){
    this.freqvalue = option.value
    if(option.value == 'Minute' || option.value == 'Hour')
    {
      this.freqvaluee ='Day'
    }else
    {this.freqvaluee = this.freqvalue}
    if(this.freqvalue!=''){
      this.isChecked = false;
      this.isCheckedd = false;
      this.isCheckeddd = false;
  
    }
  }
  clearForm(formDirective) {

    formDirective.resetForm();
    this.DrugForm.get('Mode').setValue('Oral');
    this.DrugForm.get('type').setValue('Tablet');
  }
  Prescribe(data,formDirective: FormGroupDirective,){
    this.isprescribed= true;
    if (!this.DrugForm.valid ) {
      return false;
    }else{
      console.log(data)
      if(data.M != '' && data.A != '' && data.N != ''){
        if(data.M == 'M' && data.A == 'A' && data.N == 'N')
        {this.day = data.M+","+data.A+","+data.N}
        else if(data.M == 'M' && data.N == 'N'){this.day = data.M+","+data.N}
        else if(data.A == 'A' && data.N == 'N'){this.day = data.A+","+data.N}
        else if(data.M == 'M' && data.A == 'A'){this.day = data.M+","+data.A}
        else if(data.M == 'M' ){ this.day = data.M}
        else if(data.A == 'A' ){ this.day = data.A}
        else if(data.N == 'N' ){ this.day = data.N}
        else{}   
        console.log(this.day)
        console.log(this.day.split(','))
        console.log((this.day.split(',')).length)
       
        this.avalibleqty = data.Qty*data.Duration*(this.day.split(',')).length;
        console.log(this.avalibleqty);
        if(this.avlQty < this.avalibleqty ){
            alert('Not available in Pharmacy.Available Qty is ' + this.avlQty );
        }
          this.service.addPrescription_check(data,this.patientObj).subscribe(res=>{
          console.log(res)
          if(res['code']=='200'){
            this._notification.success('Prescribe Added successfully');
            this.getlatestPrescription()
           // formDirective.reset();
            this.clearForm(formDirective)
            
          }else{
            this._notification.error('Prescribe Added fail');
          }
        })
        
       
      
      }
      
      else{
        console.log(data.Qty*data.Duration*data.time)
         if(this.avlQty < data.Qty*data.Duration*data.time){
          alert('Not available in Pharmacy.Available Qty is ' + this.avlQty )
        }
        this.service.addPrescription_select(data,this.patientObj).subscribe(res=>{
          console.log(res)
          if(res['code']=='200'){
            this._notification.success('Prescribe Added successfully');
            this.clearForm(formDirective)
             this.getlatestPrescription()
          }else{
            this._notification.error('Prescribe Added fail');
          }
        } )
      }
     
      
    
    }
    
  }
  deletePre(id){
    // console.log(id);
     this._dailog.open(options).afterClosed().subscribe(res=>{
       //console.log(res)
       if(res){
         this.service.DeletePrescription(id).subscribe(data => {
           console.log(data);
           if(data['code'] == '200'){
             this._notification.success('Prescription Deleted successfully');
             this.getlatestPrescription()
           // this.usersForm.reset();
          // formDirective.resetForm();
           }
           else{
             this._notification.error('Prescription Deletion failed');
           }
           
          })
       }
     })
   
  }
  forward(){
    this.service.forwardfi(this.patientObj).subscribe((fi) => {
      console.log(fi)
      if(fi['code']=='200'){ 
        this._notification.success('Request Forwarded');
        this.router.navigateByUrl('/expert');
      }
    })
  }
}
