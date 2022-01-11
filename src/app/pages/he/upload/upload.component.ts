import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadService } from '../upload.service';
import { MatOption } from '@angular/material';
import { NotificationService } from 'src/app/service/notification.service';
import { LoaderService } from 'src/app/service/loader.service';

import Swal from 'sweetalert2'



export interface citizenList {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})

export class UploadComponent implements OnInit {
  Uploadform: FormGroup;

  urls = [];
  fileToUpload: [];
  fileType: any;
  format: string;
  citizenvalue: any;
  Doctorvalue: any;
  opensubmenuC: boolean;
  opensubmenuD: boolean;
  citizensvalue: any;
  DepartmentList: any[];
  isSubmitted: boolean;
  active_loader: boolean = false;

  onSelectFile(event) {
    console.log(event.target.files[0].type);
    this.fileType = event.target.files[0].type
    this.fileToUpload = event.target.files 
   console.log(event)
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result.length);
                  console.log(event.target.result.length);
                  if (!event.target.result) return console.log('Cannot read variable');
                  //  if (event.target.result.length * 2  > 2**21) return alert('File exceeds the maximum size')  // Note: 2*2**20 = 2**21 
                  //  this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result)); 

                  this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result));
                  console.log(this.urls) 
                //   if (event.target.result.length * 2  < 2**21)
                //   {
                //     this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result));
                //     console.log(this.urls) 
                //   } 
                //   else{
                //     this.urls=[];
                //   return alert('File exceeds the maximum size')  // Note: 2*2**20 = 2**21 
                // }
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
    const file = event.target.files && event.target.files[0];
    var splitstr = file.type.split("/");
    console.log(splitstr[0])
    if( file.type.indexOf('image')> -1){
      this.format = 'image';
      console.log(this.format)
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
      console.log(this.format)
    }
    else if(splitstr[0] == "application"){
      this.format = 'pdf';
      console.log(this.format)
    }
  }
  @ViewChild('allSelected',{static: false}) private allSelected: MatOption;
  
  constructor(private notification:NotificationService,private _dailogRef:MatDialogRef<UploadComponent>,private sanitizer: DomSanitizer, private sevice:UploadService,private loader:LoaderService) { }
 
  ngOnInit() {
    this.Uploadform = new FormGroup({
      uptitle: new FormControl(''),
      updesc: new FormControl(''),
      patient_visibility:new FormControl(''),
      doctor_visibility: new FormControl(''),
      department:new FormControl(''),
      file_i: new FormControl(''),
      readmore:new FormControl(''),
      author:new FormControl(''),
    })

    this.sevice.getDepartments().subscribe((data)=>{
      console.log(data.result.departments)
      this.DepartmentList = data.result.departments
    })
    
  }
  tosslePerOne(all){ 
    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     return false;
 }
   if(this.Uploadform.controls.department.value.length==this.DepartmentList.length)
     this.allSelected.select();
 
 }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.Uploadform.controls.department
        .patchValue([...this.DepartmentList.map(item => item.department_id) ,0]);
    } else {
      this.Uploadform.controls.department.patchValue([]);
    }
  }
  citizenList :citizenList [] = 
  [{value: '2', viewValue: 'My Citizens'},
  {value: '1', viewValue: 'All Citizens'},
]
  close() {
    this._dailogRef.close();
  }
  toggleSelectionC(change: MatCheckboxChange){
       
        this.citizenvalue = change.source.value

        this.opensubmenuC = change.checked
  }
  toggleSelectionD(change: MatCheckboxChange){
   
    this.Doctorvalue = change.source.value;
    this.opensubmenuD = change.checked
}
    selectionC(e){
      console.log(e)
      this.citizensvalue = e
    }

    uploadhe(data){
     console.log(data)
     this.isSubmitted = true;
    if (!this.Uploadform.valid ) {
      return false;
    } else{
      // this.loader.loadingPresent()
      this.active_loader = true ;
      this.sevice.uploadPost(data,this.fileToUpload,this.citizensvalue,this.format).subscribe((data)=>{
        console.log(data)
        if(data['code']=='200'){
          // this.notification.success('Uploaded successfully');
          // this.loader.loadingDismiss();
          this.active_loader = false; 
          Swal.fire('','Your File Will Be Uploded Within 24Hrs', 'success')
          this.close();
        }else{
          // this.loader.loadingDismiss();envi
          this.active_loader = false; 
          Swal.fire('','Something Went Wrong', 'error')
        }
      })
    }
     
    }
   
}
