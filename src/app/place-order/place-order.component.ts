import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule,isPlatformBrowser} from '@angular/common';
import { ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-place-order',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit  {
  constructor(private activeRoute:ActivatedRoute,private apiService:ApiserviceService,private route:Router,@Inject(PLATFORM_ID) private platformId:Object){

  }
  orderDetails:any;
  deliveryAddressForm:boolean=false;
  addressForm:any;
  stateList=["Andhra Pradesh","Tamil Nadu","Assam","Karnataka","Kerala"]
  ngOnInit(): void {
    this.addressForm=new FormGroup({
      address:new FormControl('',Validators.required),
      pincode:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required)
    })
    if(isPlatformBrowser(this.platformId)){
      let state=window.history.state;
      this.activeRoute.queryParams.subscribe((data:any)=>{
        this.apiService.getPlaceOrderDetail(data?.productId).subscribe((res:any)=>{
            this.orderDetails=res?.orderDetails;
            this.orderDetails.quantity=state?.quantity;
            this.orderDetails.productPrice=this.orderDetails.productPrice*state?.quantity;
        })
      })
    }
  }
  confirmOrder=(order:any)=>{
       this.apiService.appendOrder(order).subscribe((res:any)=>{
       if(res.status == 409){
        alert(res.message);
       }
       else{
         alert(res.message);
       }
      //  this.hideLoader();
    },er=>{
      //  this.hideLoader();
    }) 
  }
  deliveryAddress=(order:any)=>{
    this.deliveryAddressForm=true;
  }
  onCloseForm=()=>{
    this.deliveryAddressForm=false;
  }
}
