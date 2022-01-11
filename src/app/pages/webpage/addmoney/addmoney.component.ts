import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExpertService } from '../expert/expert.service';
declare let window:any;

@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.component.html',
  styleUrls: ['./addmoney.component.scss'],
})
export class AddmoneyComponent implements OnInit {
  MoneyForm: FormGroup;
  obj: any;
  amount: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<AddmoneyComponent>,private service:ExpertService)
   {
     this.obj = data.docid;
     this.amount = data.amount
     console.log(this.obj)
    }

  ngOnInit() {
    this.MoneyForm = new FormGroup({
      amount: new FormControl('',Validators.required)
    })
  }

  close(){
    this.dialogRef.close()
  }
  addmoney(data){
    console.log(data);
    console.log(data.amount);
    console.log(this.obj);
    // console.log(parseFloat(data.amount).toFixed(2));
    // var finalAmount = parseFloat(data.amount).toFixed(2);
    // var number = "UMDAA0072"+Math.floor(Math.random() * 1000);
    // // console.log(totalamount);
    // this.service.generateHash(this.obj,number,parseFloat(data.amount).toFixed(2)).subscribe((data)=>{
    //   console.log(data);
    //   console.log(data['result']);
    //   var config = {
    //     "root": "",
    //     "flow": "DEFAULT",
    //     "merchant":{
    //          "name":"UMDAA Health Care",
    //          "logo":"assets/images/logo.png"
    //      },
    //      "style":{
    //          "headerBackgroundColor":"#8DD8FF",
    //          "headerColor":"#3F3F40"
    //     },
    //     "data": {
    //         "orderId": number,
    //         "token": data.result.body.txnToken,
    //         "tokenType": "TXN_TOKEN",
    //         "amount": finalAmount
    //     },  
    //     "handler":{
    //          "notifyMerchant": function (eventName, data) {
    //             if(eventName == 'SESSION_EXPIRED'){
    //                 // alert("Your session has expired!!");
    //                 // location.reload();
    //             }
    //          }
    //     }
    // };
    // // onScriptLoad(config);
    // if (window.Paytm && window.Paytm.CheckoutJS) {
    //   // initialze configuration using init method
    //   window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
    //       console.log('Before JS Checkout invoke');
    //       // after successfully update configuration invoke checkoutjs
    //       window.Paytm.CheckoutJS.invoke({ payMode:{
    //       "order": ['UPI','CARD']
    //       }})
    //         //     "order": ['UPI','CARD']
    //         // }})
    //       }).catch(function onError(error) {
    //           console.log("Error => ", error);
    //       });
    //   }
    // });
    console.log(data)   
    if (!this.MoneyForm.valid ) {
      return false;
    }else{
      this.service.amountAdd(data,this.obj).subscribe(data =>{
        console.log(data)
        if(data['code']=="200"){
          this.close()
          let url = data.result.url
          window.open(url ,'_blank',"width=500,height=500");
        }
      })                
  }
}
}
