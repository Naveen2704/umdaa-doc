import { Component, OnInit, ViewChild } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  // @ViewChild("map", { static: true }) mapElement: { nativeElement: Element; };
  
  // map:any;
  constructor( ) { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){

    let coords = new google.maps.LatLng(17.399892,78.4135149,44);
    let mapOptions = google.maps.MapOptions ={
      center:coords,
      zoom:10,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    // this.map= new google.maps.Map(this.mapElement.nativeElement,mapOptions)

    // let marker: google.maps.Marker = new google.maps.Marker({
    //   map:this.map,
    //   position:coords
    // })
  }
}
