import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router,ActivatedRoute} from '@angular/router';
import { Meta,Title } from '@angular/platform-browser';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,EventModalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  metaData: any;
  deleteModal:boolean=false;
  constructor(private apiService:ApiserviceService,@Inject(PLATFORM_ID) private platformId:Object,private route:Router,public sharedData:SharedataService,private metaService:Meta,private titleService:Title,private activatedRoute:ActivatedRoute){

  }
  cartList:any;
  userToken:any='';
  modalMsg:string='';
  cartData:any=false;
updMeta(metaData:any){
        // Ensure you're setting the correct <title> tag as well
        this.titleService.setTitle(metaData.title); 
        this.metaService.updateTag({property:'og:title',content:metaData.title});
        this.metaService.updateTag({property:'og:description',content:metaData.description});
        // Use the image from the resolved data if available, otherwise use a fallback
        this.metaService.updateTag({property:'og:image',content:metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
    }
  callCartCount = () => {
    this.sharedData.loader.set(true);
    this.apiService.getCartCount(this.userToken).subscribe((res: any) => {
      this.sharedData.loader.set(false);
      this.sharedData.cartCount.set(res.cartCount);
      this.closeDeleteModal();
    },
      er => {
        this.sharedData.loader.set(false);
        this.closeDeleteModal();
      })
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
      this.userToken=sessionStorage.getItem('userToken');
    };
        const resolvedSeoData = this.activatedRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
    this.sharedData.loader.set(true)
    this.getCartDetails(this.userToken);
  }
  getCartDetails=(token:any)=>{
    this.apiService.getCartProducts(token).subscribe((res:any)=>{
      this.cartList=res?.getCartData;
      this.sharedData.loader.set(false)
      console.log(this.cartList,"lis")
    },er=>{
      this.sharedData.loader.set(false)
    })
  }
  addQuantity=(cart:any)=>{
    cart.quantity+=1;
  }
  reduceQuantity=(cart:any)=>{
    if(cart.quantity>=2){
      cart.quantity-=1;
    }
  }
  placeOrder=(cart:any)=>{
      this.route.navigate(['/place-order'],{queryParams:{productId:cart?.productId},state:{quantity:cart?.quantity}});
  }
  receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit){
      this.deleteProductFromCart(this.cartData); 
    }else{
      this.closeDeleteModal();
    }
  }
  openDeleteModal=(msg:string)=>{
    this.deleteModal=true;
    this.modalMsg=msg;
  }
  closeDeleteModal=()=>{
    this.deleteModal=false;
  }
  deleteFromCart=(cart:any)=>{
    this.cartData=cart;
    this.openDeleteModal('Are you sure want to delete from cart!');
  }
  deleteProductFromCart=(cart:any)=>{
      this.sharedData.loader.set(true)
      this.apiService.delFromCart(cart.productId,cart.userId).subscribe((res:any)=>{
        this.sharedData.setModalMsg(res.message)
        this.sharedData.loader.set(false)
        this.getCartDetails(this.userToken);
        this.callCartCount();
      },
    er=>{
      this.sharedData.setModalMsg(er.message)
      this.sharedData.loader.set(false)
      this.closeDeleteModal();
      })
  }
}
