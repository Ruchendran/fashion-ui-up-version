import { Component, ComponentRef, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private apiService:ApiserviceService,private containerRef: ViewContainerRef,@Inject(PLATFORM_ID) private platformId:Object){

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
     this.showLoader();
    this.apiService.appendOrder({...cart,productPrice:cart.productPrice*cart.quantity}).subscribe((res:any)=>{
       if(res.status == 409){
        alert(res.message);
       }
       else{
         alert(res.message);
       }
       this.hideLoader();
    },er=>{
       this.hideLoader();
    })
  }
}
