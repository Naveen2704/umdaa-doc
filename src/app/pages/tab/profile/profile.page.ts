import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  responsedata: any=[];
  myInput:any=[];
  // appointmentsList: any;
  // data: any;
  // patientdetails: any=[];
  // patient_mobile: any;
  // patient_full_name: any;
  // patient_photo: any;
  // patient_umr_no: any;
  // patient_email: any;

  constructor(private patient:PatientService,private appointmentService:AppointmentService,private route:ActivatedRoute) { 
  }

  ngOnInit() {
    this.patient.postData().subscribe((data) =>{ 
      console.log(data);
          this.responsedata = data['result'];
        console.log(this.responsedata);
      });
      console.log(this.myInput)
}
 

    // this.route.params.subscribe(data => {
    //   this.data = data.id
    //   this.getAppointmentsData(this.data)
    // });
  }
//   getAppointmentsData(res)
//   {
//     let myItem = JSON.parse(localStorage.getItem("data"));
//     // console.log(myItem['result']);
//     let info = myItem['result'];
//     this.appointmentService.getAppointment(info).subscribe((data)=>{
//       //  console.log(res);
//       this.appointmentsList= data['result']['appointment_list'];
//       console.log(this.appointmentsList);

//       var filter = this.appointmentsList.filter(function(item){
//        return item.patient_id == res
//       });
//         console.log(filter);
//         this.patient_mobile = filter[0].mobile;
//         this.patient_full_name = filter[0].full_name;
//         this.patient_photo= filter[0].photo;
//         this.patient_umr_no = filter[0].umr_no;
//         this.patient_email = filter[0].email;
//         // console.log(this.patientdetails);
//     });
//   }

