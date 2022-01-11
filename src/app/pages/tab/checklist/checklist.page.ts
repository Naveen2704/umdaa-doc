import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';
import { element } from 'protractor';
import { AlertController } from '@ionic/angular';
import { NavController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
// import { IonContent  } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { format } from 'path';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  // @ViewChild(IonContent) content: IonContent;
  @ViewChild('target',{static: false}) targetEl: ElementRef;


  beforelists:any = [];
  data:string = "";
  totallist:string="";
  lists1:any = [];
  lists2:any = [];
  afterlists:any = [];
  duringlists:any = [];
  errors:any = [];
  marked = true;
  consent_checklist:any = [];
  checkedItems:any="";
  SchoolDetailsForm : FormGroup;    
  Consent_Form:any="";
  id:any="";
  remark = "";
  toggleBool: boolean=false;
  filter=true;
  beforedata:any=[];
  impbefore:any=[];
  resultArr:any=[];
  resultArr1:any=[];
  isDisabled:boolean=true;
  map='before';
  mapp='after';
  mappp='during';
  count:any=[];
  names:any='';
  inputDisabled: boolean = false;
  isDisabledd:boolean=true;
  isDisab:boolean=true;
  loading: any;
  submitted = false;
  vzmlist:any=[];
  textValue="";
  main: number;
  length:number;
  checked: 5;
  imp12:number= 1;
  checkedValuesun:number = 0;
  testing: any;
  diwali:any;
  impAfter12: number;
  afterTesting: any;
  plate: number;
  groupArray: any=[];
  lists3: any;
  DuringTesting: any;
  impDuring12: number;
  
  changeEvent(event) {
    if (event.target.checked) {
        this.toggleBool= false;
    }
    else {
        this.toggleBool= true;
    }
}

triggerafterrEvent(res)
{
// console.log(res);
((document.getElementById(res) as HTMLInputElement).disabled)=!((document.getElementById(res) as HTMLInputElement).disabled);

if((document.getElementById(res) as HTMLInputElement).disabled == false)
{
  
this.impAfter12 = 1;
// document.getElementById(id).clear();
return this.afterTesting = res;

}
else{
  this.impAfter12 =0;
  return this.afterTesting = res;

}

}

triggerDuringEvent(res)
{
// console.log(res);
((document.getElementById(res) as HTMLInputElement).disabled)=!((document.getElementById(res) as HTMLInputElement).disabled);

if((document.getElementById(res) as HTMLInputElement).disabled == false)
{
  
this.impDuring12 = 1;
// document.getElementById(id).clear();
return this.DuringTesting = res;

}
else{
  this.impDuring12 =0;
  return this.DuringTesting = res;

}

}
 
 
  triggerSomeEvent($event) {
 
      this.isDisabled = !this.isDisabled;
      return;

      
  }

  triggerduringEvent($event) {
 
    this.isDisab = !this.isDisab;
    return;

    
}

  triggerafterEvent()
  {
    this.isDisabledd = !this.isDisabledd;
    return;
  
  }



  //  isDisable = true;
  triggerEvent(id) {
     console.log(id);
    //  this.diwali = !this.diwali;
    // let again = (document.getElementById(id) as HTMLInputElement).disabled;
    ((document.getElementById(id) as HTMLInputElement).disabled)=!((document.getElementById(id) as HTMLInputElement).disabled);
    // return this.textValue ='';

 
      if((document.getElementById(id) as HTMLInputElement).disabled == false)
      {
        
      this.imp12 = 1;
      // document.getElementById(id).clear();
      return this.testing = id;

      }
      else{
        this.imp12 =0;
        return this.testing = id;

      }
// 
  // if(newValue == 12){
  // console.log(newValue);
  // }
  // console.log(newValue.length);
  // this.textValue=newvalue;
  // console.log(this.textValue);
// }
    // console.log(this.textValue);
    // if(this.textValue.length > 0)
    // {
      
    //    return this.length = 1;
    // }
    // else{
    //    this.length = 0;
    // }
   
  }

  public profileForm: FormGroup;
 
 items: any;

 constructor(private route: ActivatedRoute,private router:Router, public nav: NavController,public loadingController: LoadingController,private dataService: DataService,private fb:FormBuilder,public alertController: AlertController) {
  // this.createform(response);
  this.getBeforeList(),
    this.getAfterList(this.beforelists),
    this.getDuringList(this.afterlists)

    // this.select = [ {name : "Paul", key : "bonjour"}, {name : "Alfred", key : "aurevoir"}] 
}
getCheckedvalue () {
 this.checkedItems =  this.items.filter(value => {
   return value.isChecked;
 });
//  console.log(this.checkedItems);
}

createBeforeForm(beforeres)
{  
  localStorage.setItem("before1", JSON.stringify(beforeres));
}

createform(response)    
{   


console.log(response);
var uniqueNames = [];
for(var i = 0; i< response.length; i++){    
    if(uniqueNames.indexOf(response[i].category) === -1){
       uniqueNames.push(response[i].category);     
        //  console.log(this.plate);  
    }        
}
 this.count = uniqueNames.length;
//this.count = 1;

 console.log(this.count );   

 this.groupArray = [];
for(i = 0; i< uniqueNames.length; i++){  
  this.names = uniqueNames[i]; 
  this.groupArray.push(uniqueNames[i]);
  console.log(this.names);

  // alert(uniqueNames[i]);      
}
console.log(this.groupArray);
// this.groupArray.push(this.names); 
// console.log(this.groupArray);


  //  let myList = JSON.parse(localStorage.getItem("before1"));
  //  console.log(this.impbefore);
  //    this.impbefore=myList;

  let arr=[];    
  for(let i=0;i<response.length;i++)    
  {   
    // console.log(data[i]);   
    arr.push(this.BuildFormDynamic(response[i]))         
  }    

    this.SchoolDetailsForm =  this.fb.group({    
      anesthetist : ['',Validators.required],   
      assisted_by:['',Validators.required], 
      UHID:[''],
      checked_by:['', Validators.required], 
      nurse:['',Validators.required],
      done_by:['',Validators.required],  
      patient_consent_form_id:[''],
      consent_check_list:this.fb.array(arr)    
    })   

    // this.SchoolDetailsForm.get('consent_check_list').valueChanges.subscribe(value=>{
    //   //  console.log((value));
    //   // this.length = value;
    //   // if(value!='')
    //   // {
    //   //   console.log(value);
    //   //   this.checkedValuesun = !this.checkedValuesun;
    //   //   // console.log(this.checkedValuesun);
    //   // }
    //   });

    // this.SchoolDetailsForm.controls.consent_check_list.valueChanges.subscribe(value=>{
    //   console.log(value.remark);
    //   // this.length = value;
    //   });



  }
  
  sendOne()
  {

       return 0;
    
    // else{
    //   return 0;
    // }
  }

// 




    
BuildFormDynamic(product):FormGroup{  
 console.log(product);
  console.log(product.length);



 return this.fb.group({    
       Consent_Form:[product.description],
       checked: this.sendOne(),
       category:[product.category],
       checklist_id: [product.checklist_id],
       doctor_review: [''],
       patient_checklist_id: [product.patient_checklist_id],
       remark:['']   
  });

}    




get f() { 
  // this.SchoolDetailsForm.get('checked_by').valueChanges.subscribe(value=>{
  // console.log(value);
  // });

  return this.SchoolDetailsForm.controls; }
  // scrollToTop() {
  //   this.content.scrollToTop(400);
  // }
  // ionViewDidEnter(){
  //   this.scrollToTop();
  // }

  SaveData()    
  {  
    this.submitted = true;

    // stop here if form is invalid
    if (this.SchoolDetailsForm.invalid) {
      this.targetEl.nativeElement.scrollIntoView({behavior: 'smooth'}); 
      // this.document.documentElement.scrollTop = 0
      // this.scrollToTop();
        return;
    }

    else{   
      console.log(this.SchoolDetailsForm.value);
    this.dataService.checklist(this.SchoolDetailsForm.value).subscribe((data)=>{
       console.log(data);

       this.presentAlertConfirm();
       
    });
  }
  
  }

  
  
  async presentAlert() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Please Fill All The *  Fields',
      buttons: [
     {
          text: 'Continue',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Successfully Submitted!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            // console.log('Confirm Okay');
            this.navigate();
          }
        }
      ]
    });

    await alert.present();
  }

  navigate()
  {
    this.router.navigateByUrl('forms');
  }
  // changeTrigger()
  // {
  //   this.isDisabled = !this.isDisabled;
  //   return; 
  // }

  toggleVisibility(e){
    this.marked = e.target.checked;
    // console.log(this.marked);
  }

  checkdata()
  {
    // console.log(this.profileForm.value);
  }



  validation_messages = {
    'Checked': [
        { type: 'required', message: 'Checked is required.' },
      ],
      'Nurse': [
        { type: 'required', message: 'Name is required.' }
      ],
  
    }


  ngOnInit() {
     this.presentLoadingWithOptions();
    // let myList = JSON.parse(localStorage.getItem("before1"));
    // console.log(myList);
    // this.impbefore=myList;
     this.createform(this.resultArr1);  
    // this.createform1(this.afterlists);
    this.route.params.subscribe(data => {
      this.data = data.title
      this.id=data.id
      console.log(this.id)
      this.getBeforeList()
    });

    this.profileForm = this.fb.group({
      Checked: ['', Validators.required],
      Assisted: ['',Validators.required],
      // consent_check_list: this.fb.array([this.getList()]),
      consent_check_list:this.checklist_array(),
      Nurse:['',Validators.required],
      UHID:['',Validators.required],
      Procedure:['',Validators.required],
      Anesthetist:['',Validators.required]
    });

    //  this.triggerEvent();

  }
    async presentLoadingWithOptions() {
      const loading = await this.loadingController.create({
        spinner: "bubbles",
        duration: 1000,
        message: 'Please wait...',
        translucent: true,
         animated:true,
       
        cssClass: 'custom-class custom-loading'
      });
      // this.setFilteredItems();
      return await loading.present().then(() => {});
  
    }

  checklist_array()
  {
    const arr = this.beforelists.map(element=>{
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }


  

  getList()
  {
    return this.fb.group({
      remark:[]
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      before: []
    });
  }



   getBeforeList()
   {

     this.dataService.getBeforeDescription(this.id).subscribe((data)=>{
      // this.loading.dismissAll();
        console.log(data);
       this.beforelists = data["result"]["consent_check_list"];
       console.log(this.beforelists);
       let myItem = JSON.parse(localStorage.getItem("key"));
       this.lists1 = myItem["result"]["checklist_master"];
       console.log(this.lists1);
      this.beforelists.map((a)=>{
      let obj2 = this.lists1.find((b)=> a.checklist_id === b.checklist_id);
      if(obj2)
        Object.assign(a,obj2);
      return a;
      });

      console.log(this.beforelists);
      // this.createform();
      this.createBeforeForm(this.beforelists);
      this.beforedata=this.beforelists;
      this.getAfterList(this.beforelists);
      this.getAfterList(this.beforelists);


     });
   }

   getAfterList(res)
   {
     console.log(res);
  //   this.loading = this.loadingController.create({
  //     message: 'Authenticating...'
  // });
     this.dataService.getAfterDescription(this.id).subscribe((data)=>{
      // this.loading.dismissAll();
        // console.log(data);
       let myItem = JSON.parse(localStorage.getItem("key"));
       this.lists2 = myItem["result"]["checklist_master"];
      //  console.log(this.lists1);
       this.afterlists = data["result"]["consent_check_list"];
        console.log(this.afterlists);
       
      this.afterlists.map((a)=>{
      let obj2 =  this.lists2.find((b)=> a.checklist_id === b.checklist_id);
      if(obj2)
        Object.assign(a,obj2);
      return a;
      });

       console.log(this.afterlists);
      // console.log(res);
      // this.createform1(this.afterlists);
      let resultArr = [];

      resultArr= resultArr.concat(this.afterlists);
      resultArr= resultArr.concat(res);
    
      console.log(resultArr);
      this.getDuringList(resultArr);
      this.createform(resultArr);


      });
   }

   getDuringList(res)
   {
  //   this.loading = this.loadingController.create({
  //     message: 'Authenticating...'
  // });
  // this.loading.present();
    // console.log(res);
     this.dataService.getDuringDescription(this.id).subscribe((data)=>{
      // this.loading.dismissAll();
       let myItem = JSON.parse(localStorage.getItem("key"));
       this.lists3 = myItem["result"]["checklist_master"];
      //  console.log(this.lists1);
       this.duringlists = data["result"]["consent_check_list"];
       console.log(this.duringlists);
       
      this.duringlists.map((a)=>{
      let obj2 =  this.lists3.find((b)=> a.checklist_id === b.checklist_id);
      if(obj2)
        Object.assign(a,obj2);
      return a;
      });

      // console.log(this.duringlists);
      let resultArr1 = [];

      resultArr1= resultArr1.concat(this.duringlists);
      resultArr1= resultArr1.concat(res);
    
    console.log(resultArr1);
      // this.duringlists(resultArr);
      this.createform(resultArr1);
      });
   }
     
}
