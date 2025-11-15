import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private apiService:ApiserviceService,@Inject(PLATFORM_ID) private platformId:Object,private route:Router,public sharedData:SharedataService){

  }
  cartList:any;
  userToken:any='';
  ngOnInit(): void {
    this.sharedData.loader=true;
    if(isPlatformBrowser(this.platformId)){
      this.userToken=sessionStorage.getItem('userToken');
    }
    this.apiService.getCartProducts(this.userToken).subscribe((res:any)=>{
      this.cartList=res?.getCartData;
      this.sharedData.loader=false;
      console.log(this.cartList,"lis")
    },er=>{
      this.sharedData.loader=false;
    })
  }
  addQuantity=(cart:any)=>{
    cart.quantity+=1;
  }
  reduceQuantity=(cart:any)=>{
    if(cart.quantity>=1){
      cart.quantity-=1;
    }
  }
  placeOrder=(cart:any)=>{
      this.route.navigate(['/place-order'],{queryParams:{productId:cart?.productId},state:{quantity:cart?.quantity}});
  }
}
