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
  addressList:any=[];
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
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
    this.addressForm=new FormGroup({
      address:new FormControl('',Validators.required),
      pincode:new FormControl('',[Validators.required]),
      village:new FormControl('---select-the-area---',Validators.required),
      phone:new FormControl('',Validators.required),
      payOnDelivery:new FormControl('---select-cashon-delivery---',Validators.required)
    });
    this.sharedData.loader.set(true);
    this.apiService.getUserAddress(this.userToken).subscribe((res:any)=>{
      console.log(res,"sss")
      if(res.address?.length){
        res.address.forEach((val:any)=>{
          let obj={active:false,addressVal:val};
          this.addressList.push(obj);
        })
      }
    })
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
       this.route.navigate(['/orders']);
    },
    er=>{
      this.sharedData.loader.set(false);
    }
  )
  }
  onSubmitAddress=()=>{
    if(this.addressForm.status!='INVALID' && this.addressForm.value.payOnDelivery!='---select-cashon-delivery---' && this.addressForm.value.village!='---select-the-area---'){
      this.confirmOrder({...this.orderDetails,...this.addressForm.value});
      this.deliveryAddressForm=false;
    }
    else{
      this.sharedData.setModalMsg('Please fill the fields.')
    }
  }
  postalCode=(village?:any)=>{
    if(this.addressForm.value.pincode.length==6){
      this.sharedData.loader.set(true)
      this.apiService.postalCodeApi(this.addressForm.value.pincode).subscribe((res:any)=>{
        this.sharedData.loader.set(false);
        this.villageList=[];
        res.postalList[0].PostOffice.forEach((postal:any)=>{
          this.villageList.push(postal?.Name)
        });
        if(village){
        this.addressForm.patchValue({
          village:village.includes('-')?village.split('-').join(" "):village
        });
        }
      },er=>{
        this.sharedData.loader.set(false);
        this.sharedData.setModalMsg(er.message);
      })
    }
  }
  selectAddress=(address:any)=>{
    this.addressList.forEach((value:any)=>{
      value.active=false;
    });
    address.active=true;
    const parseAddress=address.addressVal.split(" ");
    this.addressForm.patchValue({
      pincode:parseAddress[2],
      address:parseAddress[0].split('-').join(" "),
      phone:parseAddress[3],
    });
    this.postalCode(parseAddress[1].trim());
  }
}
