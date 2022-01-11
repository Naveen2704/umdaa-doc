import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiService } from './fi/fi.service';

@Component({
  selector: 'app-fi',
  templateUrl: './fi.page.html',
  styleUrls: ['./fi.page.scss'],
})
export class FiPage implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute,private fiService:FiService,private  _platformStrategy: LocationStrategy,private router: Router) { }

  ngOnInit() {

  }
  back(e){
  console.log(e)
  // this._platformStrategy.back()
  this.router.navigateByUrl('/expert')
  }
}
