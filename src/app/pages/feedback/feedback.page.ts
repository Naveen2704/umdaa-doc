import { Component, OnInit, Inject } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Platform } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})

export class FeedbackPage implements OnInit {
 
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  subject:'';
  body:'';
  to:'kphani027@gmail.com';
  constructor(private emailComposer:EmailComposer, private platform:Platform) { }
   
  ngOnInit() {
  }


  send(){
    let email={
      to:this.to,
      cc:[],
      bcc:[],
      attachment:[],
      subject:this.subject,
      body:this.body,
      isHtml:false,
      app:"gmail"
    }
    this.emailComposer.open(email);
  }
}
