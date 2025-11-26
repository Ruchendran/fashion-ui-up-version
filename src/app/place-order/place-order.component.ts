import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule,isPlatformBrowser} from '@angular/common';
import { ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';
import { SharedataService } from '../sharedata.service';
@Component({
  selector: 'app-place-order',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit  {
  userToken: any;
  constructor(private activeRoute:ActivatedRoute,private apiService:ApiserviceService,private route:Router,@Inject(PLATFORM_ID) private platformId:Object,public sharedData:SharedataService){

  }
  orderDetails:any;
  deliveryAddressForm:boolean=false;
  addressForm:any;
  villageList=["Satrawada","Nagari","Chindalpet","Pudhupet","Ekambarakuppam"]
  ngOnInit(): void {
    this.addressForm=new FormGroup({
      address:new FormControl('',Validators.required),
      pincode:new FormControl('',Validators.required),
      village:new FormControl('Satrawada',Validators.required),
      phone:new FormControl('',Validators.required),
      payOnDelivery:new FormControl('---select-payon-delivery---',Validators.required)
    })
    if(isPlatformBrowser(this.platformId)){
      let state=window.history.state;
      this.userToken=sessionStorage.getItem('userToken');
      this.sharedData.loader.set(true)
      this.activeRoute.queryParams.subscribe((data:any)=>{
        this.apiService.getPlaceOrderDetail(data?.productId,this.userToken).subscribe((res:any)=>{
            this.sharedData.loader.set(false)
            this.orderDetails=res?.orderDetails;
            this.orderDetails.quantity=state?.quantity;
            this.orderDetails.productPrice=this.orderDetails.productPrice*state?.quantity;
        },er=>{
           this.sharedData.loader.set(false)
        })
      })
    }
  }
  confirmOrder=(order:any)=>{
     this.sharedData.loader.set(true)
    this.apiService.appendOrder(order).subscribe((res:any)=>{
       this.sharedData.loader.set(false)
       if(res.status == 409){
            this.sharedData.setModalMsg(res.message)
       }
       else{
            this.callOrderCount(this.userToken);
             this.sharedData.setModalMsg(res.message)
       }
      //  this.hideLoader();
    },er=>{
      this.sharedData.loader.set(false)
      this.sharedData.setModalMsg(er.message)
    }) 
  }
  deliveryAddress=(order:any)=>{
    this.deliveryAddressForm=true;
  }
  onCloseForm=()=>{
    this.deliveryAddressForm=false;
  }
    callOrderCount=(userToken:any)=>{
    this.sharedData.loader.set(true);
    this.apiService.getOrderCount(userToken).subscribe((res:any)=>{
      this.sharedData.loader.set(false);
      this.sharedData.orderCount.set(res.orderCount);
    },
    er=>{
      this.sharedData.loader.set(false);
    }
  )
  }
  onSubmitAddress=()=>{
    if(this.addressForm.status!='INVALID' && this.addressForm.value.payOnDelivery!='---select-payon-delivery---'){
      this.confirmOrder({...this.orderDetails,...this.addressForm.value});
      this.deliveryAddressForm=false;
      this.route.navigate(['/orders']);
    }
    else{
      alert('Please fill the fields.')
    }
  }
}
