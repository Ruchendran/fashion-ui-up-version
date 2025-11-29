import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { Meta,Title} from '@angular/platform-browser';
@Component({
  selector: 'app-track-order',
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent implements OnInit {
  metaData: any;
  constructor(private activateRoute:ActivatedRoute,private apiService:ApiserviceService,private sharedData:SharedataService,private metaService:Meta,private titleService:Title){

  }
  activeTrackingIndex=1;
  trackingMapList=[];
  orderId:any=null;
  updMeta(metaData:any){
        // Ensure you're setting the correct <title> tag as well
        this.titleService.setTitle(metaData.title); 
        this.metaService.updateTag({property:'og:title',content:metaData.title});
        this.metaService.updateTag({property:'og:description',content:metaData.description});
        // Use the image from the resolved data if available, otherwise use a fallback
        this.metaService.updateTag({property:'og:image',content:metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
    }
  ngOnInit(): void {
    const resolvedSeoData = this.activateRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
    this.activateRoute.queryParams.subscribe((val:any)=>{
      this.orderId=val?.orderId;
    });
    this.sharedData.loader.set(true);
    this.apiService.getOrderDetail(this.orderId).subscribe((res:any)=>{
      this.sharedData.loader.set(false)
      this.trackingMapList=res?.orderDetails?.trackerMap;
      this.activeTrackingIndex=res?.orderDetails?.activeTrackingIndex+1;
    },er=>{
      this.sharedData.loader.set(false)
    })
  }
}
