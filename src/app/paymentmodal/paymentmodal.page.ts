import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { BookappService } from '../service/bookapp.service';
import { Router } from '@angular/router';
import { AppointmentPage } from '../pages/appointment/appointment.page';

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.page.html',
  styleUrls: ['./paymentmodal.page.scss'],
})
export class PaymentmodalPage implements OnInit {
  passInfo: any =[];
  patientBillInfo: any = [];
  go: any;
 
  constructor( private modal:ModalController ,private navParams:NavParams,public root:Router,public navCtrl:NavController) { }

  ngOnInit() {
   this.passInfo = this.navParams.get('responce');
   //console.log(this.passInfo['result']['appointment'])
   this.patientBillInfo = this.passInfo['result']['appointment']
  }
 

  async  closeModal(){
  // var modals = document.getElementsByTagName("ion-modal");
  // [].forEach.call(modals, function (el:any) {
  //     el.parentNode.removeChild(el);
  // });
  this.modal.dismiss()

  this.root.navigateByUrl('/bookapp', { replaceUrl: true }).then(()=>
  this.root.navigate(["/appointment"]));
  //this.root.navigate(['/appointment'])
 }

 printinvoice(){
   window.open(this.patientBillInfo['pdf_file'],"_blank")
 }


}
