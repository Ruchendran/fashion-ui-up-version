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
      payOnDelivery:new FormControl('Yes',Validators.required)
    })
    if(isPlatformBrowser(this.platformId)){
      let state=window.history.state;
      this.userToken=sessionStorage.getItem('userToken');
      this.sharedData.loader=true;
      this.activeRoute.queryParams.subscribe((data:any)=>{
        this.apiService.getPlaceOrderDetail(data?.productId,this.userToken).subscribe((res:any)=>{
            this.sharedData.loader=false;
            this.orderDetails=res?.orderDetails;
            this.orderDetails.quantity=state?.quantity;
            this.orderDetails.productPrice=this.orderDetails.productPrice*state?.quantity;
        },er=>{
           this.sharedData.loader=false;
        })
      })
    }
  }
  confirmOrder=(order:any)=>{
     this.sharedData.loader=true;
    this.apiService.appendOrder(order).subscribe((res:any)=>{
       this.sharedData.loader=false;
       if(res.status == 409){
          alert(res.message);
       }
       else{
          alert(res.message);
       }
      //  this.hideLoader();
    },er=>{
      this.sharedData.loader=false;
    }) 
  }
  deliveryAddress=(order:any)=>{
    this.deliveryAddressForm=true;
  }
  onCloseForm=()=>{
    this.deliveryAddressForm=false;
  }
  onSubmitAddress=()=>{
    if(this.addressForm.status!='INVALID'){
      this.confirmOrder({...this.orderDetails,...this.addressForm.value});
      this.deliveryAddressForm=false;
    }
    else{
      alert('Please fill the fields.')
    }
  }
}
