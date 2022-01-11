import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  pages: { name: string; link: string; icon: string; Activeicon: string; subpages: any[]; }[];
  sidevisible: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataObj.subscribe((data)=>{
      console.log(data)
      // this.patientObj = data
      this.sidevisible = data
      console.log(this.sidevisible.closeStatus)
      if(this.sidevisible.closeStatus  == '0'){
        this.pages = [ 
          {
            name:'SUMMARY',
            link:'/summary',     
             icon:'././assets/icon/summary_w.png',
             Activeicon:'././assets/icon/summary.png',
             subpages:[]
        },
        {
          name:'FI',
          link:'/fic',     
           icon:'././assets/icon/fi_w.png',
           Activeicon:'././assets/icon/fi.png',
           subpages:[]
      },
      ]
      }
     if(this.sidevisible.closeStatus  == '1'){
        this.pages = [ 
          {
            name:'SUMMARY',
            link:'/summary',     
             icon:'././assets/icon/summary_w.png',
             Activeicon:'././assets/icon/summary.png',
             subpages:[]
        }
      ]
      }
      else{ 
  
      }
    });

   
 
  }
    
}
