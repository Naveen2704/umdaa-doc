import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { ExpertService } from '../../webpage/expert/expert.service';
import { HelpComponent } from '../help/help.component';
import { RequestagainComponent } from '../requestagain/requestagain.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  ptientObj: any;
  mesagesList: any=[];
  public text: string;
  Msg: string;
  firstDoctor_id: any;
  senderMsgList: any=[];
  receiverMsgList: any=[];
  show:boolean = false;
  AgainMsg: string;
  viewfilist: any=[];
  @ViewChild('msg',{static: false}) msg: ElementRef;
  constructor(push: SwPush,public dialogRef: MatDialogRef<ChatComponent>,@Inject(MAT_DIALOG_DATA) public data,private service:ExpertService,private dialog: MatDialog)
   { 
     console.log(data)
     this.ptientObj = data
     push.messages.subscribe(msg => {
      console.log(msg)
      console.log('push message',( msg['notification'].click_action))
     if(msg['notification'].click_action == "Expert Opinion Commented"){
      this.mesages();
     }else if(msg['notification'].click_action == "Expert Opinion Message Sent"){
      this.mesages();
     }
   })
   }

  ngOnInit() {
    this.mesages()
    this.fiList()
  }
  clearInput(){
    this.msg.nativeElement.value = '';
   }
  close() {
    this.dialogRef.close();
  }

  mesages(){
    this.service.mesagesList(this.ptientObj).subscribe((res)=>{
      console.log(res)
      this.mesagesList = res.result.messages
      if(this.mesagesList.length>0)
      { this.firstDoctor_id = this.mesagesList[0].doctor_id
        console.log(this.firstDoctor_id)
      }
      // for(var i=0;i<this.mesagesList.length;i++)
      // {
      //   if(this.mesagesList[i].doctor_id ==  this.firstDoctor_id)
      //   {
      //     var result = this.senderMsgList.filter((x)=> x.id === i)
      //     console.log(result);
      //     if(result == ''){
      //       this.senderMsgList.push({list:this.mesagesList[i],id:i});
      //     }
      //     console.log(this.senderMsgList);
      //   }else{
      //     var result = this.receiverMsgList.filter((x)=> x.id === i)
      //     console.log(result);
      //     if(result == ''){
      //       this.receiverMsgList.push({list:this.mesagesList[i],id:i});
      //     }
      //     console.log(this.receiverMsgList);
      //   }
      //   // console.log(this.mesagesList[0].doctor_id);
      // }
    })
  }
  sentMsg(msg:HTMLInputElement){
    console.log(msg.value);
    this.Msg = msg.value
    this.service.sendMsg(this.Msg,this.ptientObj).subscribe((res)=>{
      console.log(res)
      if(res['code'] =='200'){
        this.clearInput()
        this.mesages()
      }
    })
  }
  thanks(){
    this.service.thankyou(this.ptientObj).subscribe((res)=>{
      console.log(res)
      if(res['code'] =='200'){    
        this.mesages()
      }
    })
  }
  requestagain(){
    this.openrequest()
    // msg:HTMLInputElement
    // this.show = true;
    // this.AgainMsg = msg.value
    // this.service.requestAgain(this.AgainMsg,this.ptientObj).subscribe((res)=>{
    //   console.log(res)
    //   if(res['code'] =='200'){    
    //     this.mesages()
    //   }
    //   else{
    //     alert(res.result.result)
    //   }
    // })
  }
  viewfi(e_id){
    this.service.getFi(e_id).subscribe((res)=>{
      console.log(res)
      let url = res.result.webPage
      window.open(url,'_blank')
    })
  }

  fiList(){
    this.service.Filist(this.ptientObj).subscribe((res)=>{
      console.log(res)
      this.viewfilist = res.result.opinion_list
    })
  }

  openrequest(){
    const dialog_ref =
    this.dialog.open(RequestagainComponent,
     {
       panelClass: ['myapp-no-padding-dialog'],

      
       data:this.ptientObj

     }
     );

     dialog_ref.afterClosed().subscribe(result => {
 
     });
  }
  openHelp(){
    const dialog_ref =
    this.dialog.open(HelpComponent,
     {
       panelClass: ['myapp-no-padding-dialog'],

      
       data:this.ptientObj

     }
     );

     dialog_ref.afterClosed().subscribe(result => {
 
     });
  }
}
