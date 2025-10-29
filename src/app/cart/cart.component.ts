import { Component, ComponentRef, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
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
  constructor(private apiService:ApiserviceService,private containerRef: ViewContainerRef,@Inject(PLATFORM_ID) private platformId:Object,private route:Router){

  }
  cartList:any;
  private loaderRef!: ComponentRef<LoaderComponent>;
  userToken:any='';
  ngOnInit(): void {
    this.showLoader();
    if(isPlatformBrowser(this.platformId)){
      this.userToken=sessionStorage.getItem('userToken');
    }
    this.apiService.getCartProducts(this.userToken).subscribe((res:any)=>{
      this.cartList=res?.getCartData;
      this.hideLoader();
      console.log(this.cartList,"lis")
    })
  }
  showLoader = () => {
    this.loaderRef = this.containerRef.createComponent(LoaderComponent)
  }
  hideLoader = () => {
      this.loaderRef.destroy();
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
    console.log(cart,"placed orders");
    //  this.showLoader();
      this.route.navigate(['/place-order'],{queryParams:{productId:cart?.productId},state:{quantity:cart?.quantity}});
  }
}
