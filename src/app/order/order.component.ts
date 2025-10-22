import { CommonModule, isPlatformBrowser} from '@angular/common';
import { Component, ComponentRef, Inject, OnInit,PLATFORM_ID, ViewContainerRef} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId:Object,private containerRef: ViewContainerRef,private apiService:ApiserviceService,private route:Router){

  }
  userToken:any='';
  private loaderRef!: ComponentRef<LoaderComponent>;
  orderList:any=[];
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.userToken=sessionStorage.getItem('userToken');
    };
     this.showLoader();
    this.apiService.getOrderList(this.userToken).subscribe((res:any)=>{
      console.log(res,"lis")
      this.orderList=res?.getOrderData;
      this.hideLoader();
    })
  }
  showLoader = () => {
    this.loaderRef = this.containerRef.createComponent(LoaderComponent)
  }
  hideLoader = () => {
      this.loaderRef?.destroy();
  }
  viewOrder=(order:any)=>{
   this.route.navigate(['/view-order'],{queryParams:{orderId:order?._id}});
  }
};
