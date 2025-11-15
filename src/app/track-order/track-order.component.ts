import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
@Component({
  selector: 'app-track-order',
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent implements OnInit {
  constructor(private activateRoute:ActivatedRoute,private apiService:ApiserviceService,private sharedData:SharedataService){

  }
  activeTrackingIndex=1;
  trackingMapList=[];
  orderId:any=null;
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((val:any)=>{
      this.orderId=val?.orderId;
    });
    this.sharedData.loader=true;
    this.apiService.getOrderDetail(this.orderId).subscribe((res:any)=>{
      this.sharedData.loader=false;
      this.trackingMapList=res?.orderDetails?.trackerMap;
      this.activeTrackingIndex=res?.orderDetails?.activeTrackingIndex+1;
    },er=>{
      this.sharedData.loader=false;
    })
  }
}
