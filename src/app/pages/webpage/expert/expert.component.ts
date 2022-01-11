import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpertService } from './expert.service';
import { NotificationService } from 'src/app/service/notification.service';
import { AddmoneyComponent } from '../addmoney/addmoney.component';
import { LoaderService } from 'src/app/service/loader.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {
  Expertform: FormGroup;
  doctorId: any;
  DepartmentsList: any=[];
  DoctorsList: any;
  Amount: any;
  DoctorInfo: any=[];
  hide: boolean =false;
  hidden:boolean =false;
  price: any;
  obj: any;
  refered_doctor: any;
  disabled:boolean =true;
  amount: any;
  visibility: boolean=false;
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ExpertComponent>,@Inject(MAT_DIALOG_DATA) public data,private service:ExpertService,private notification:NotificationService,private loader:LoaderService) 
  { 
    console.log(data);
    this.obj = data;
  
    this.doctorId = data.doctor_id
  
  }

  ngOnInit() {
    this.Expertform = new FormGroup({
      Response: new FormControl(''),
      department: new FormControl(''),
      doctor: new FormControl(''),
      comment: new FormControl('')
    })

    this.getDepartments();
    this.getWallet()
  }

  close() {
    this.dialogRef.close();
  }
  getWallet(){
    // this.loader.loadingPresent()
    this.service.WalletAmount(this.doctorId).subscribe((res)=>{
      console.log(res)
      // this.loader.loadingDismiss()
      this.Amount = res.result.walletAmount;
      // console.log(parseInt(this.Amount) )
      // if(this.Amount < '1,039,662.00'){
      //   alert('below 800')
      // }
    })
  }
  getDepartments(){
    // this.loader.loadingPresent()
    this.service.GetDepartments(this.doctorId).subscribe((res)=>{
      console.log(res)
        if(res['code'] == 200){
          this.DepartmentsList = res.result.departments;
          // this.loader.loadingPresent()
        }
        else{
          Swal.fire('','Somthing Wrong','error')
        }
    })
  }
  departmentId(dep_id){
    console.log(dep_id)

    this.service.getDoctors(this.doctorId,dep_id).subscribe((response) =>{
      console.log(response)
      if(response['code'] == "200"){
        this.hidden = true;
        this.DoctorsList = response.result.docInfo;
        if(response.result === 'null'){
          this.notification.error('Doctors Not Found')
        }
      }
     
    
    })
  }
  Doctorid(id){
    this.hide =true;
    console.log(id)
    this.refered_doctor = id
    console.log( this.DoctorsList );
    var List = this.DoctorsList.filter(x => x.doctor_id === id);
    console.log(List[0]);
    this.DoctorInfo = List[0]
    this.price = List[0].price
  }
  ExpertRequest(data){
    console.log(data)
    this.service.Expertrequest(data,this.price,this.obj).subscribe((res)=>{
      console.log(res)
      if(res['code'] =='200'){
        this.notification.success('Request sent successfully')
        this.close()
      }
    })
  }

  addmoney(){
    const dialog_ref =
         this.dialog.open(AddmoneyComponent,
          {
            panelClass: ['myapp-no-padding-dialog-patient'],
    
            data:this.obj
            
  
          }
          );
  
          dialog_ref.afterClosed().subscribe(result => {
           
          });
  }

}
