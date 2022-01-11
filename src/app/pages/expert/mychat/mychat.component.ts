import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';

import { DataService } from 'src/app/service/data.service';
import { ExpertService } from '../../webpage/expert/expert.service';

@Component({
  selector: 'app-mychat',
  templateUrl: './mychat.component.html',
  styleUrls: ['./mychat.component.scss'],
})
export class MychatComponent implements OnInit {
  patientobj: any;
  mesagesList: any=[];
  firstDoctor_id: any;
  Msg: string;
  @ViewChild('msg',{static: false}) msg: ElementRef;

  constructor(push: SwPush,private dataService: DataService,private router: Router,public dialogRef: MatDialogRef<MychatComponent>,@Inject(MAT_DIALOG_DATA) public data,private service:ExpertService)
  { 
    console.log(data)
    this.patientobj = data;
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

 ngOnInit() 
 {
  this.mesages()
 }
 clearInput(){
  this.msg.nativeElement.value = '';
 }
 close() {
   this.dialogRef.close();
 }
 patientinfo(){
  this.close();
  this.router.navigateByUrl('fi');
  this.dataService.newObject(this.patientobj)
}
mesages(){
  this.service.mesagesList(this.patientobj).subscribe((res)=>{
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
  this.service.sendMsg(this.Msg,this.patientobj ).subscribe((res)=>{
    console.log(res)
    if(res['code'] =='200'){
      console.log(this.Msg)
      this.clearInput();
      this.mesages()
    }
  })
}
}
