import { CommonModule, isPlatformBrowser} from '@angular/common';
import { Component, ComponentRef, Inject, OnInit,PLATFORM_ID, ViewContainerRef} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ApiserviceService } from '../apiservice.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Meta,Title } from '@angular/platform-browser';
import { ParentChildAccordianComponent } from '../parent-child-accordian/parent-child-accordian.component';
@Component({
  selector: 'app-order',
  imports: [CommonModule,ParentChildAccordianComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId:Object,private containerRef: ViewContainerRef,private apiService:ApiserviceService,private route:Router,private activatedRoute:ActivatedRoute,private metaService:Meta,private titleService:Title){

  }
  userToken:any='';
  private loaderRef!: ComponentRef<LoaderComponent>;
  orderList:any=[];
  metaData:any;
  mobileAccordianDetails:any=[];
  updMeta(metaData:any){
        // Ensure you're setting the correct <title> tag as well
        this.titleService.setTitle(metaData.title); 
        this.metaService.updateTag({property:'og:title',content:metaData.title});
        this.metaService.updateTag({property:'og:description',content:metaData.description});
        // Use the image from the resolved data if available, otherwise use a fallback
        this.metaService.updateTag({property:'og:image',content:metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
    }
  ngOnInit(): void {
    const resolvedSeoData = this.activatedRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
      this.userToken=sessionStorage.getItem('userToken');
    };
     this.showLoader();
    this.apiService.getOrderList(this.userToken).subscribe((res:any)=>{
      console.log(res,"lis")
      this.orderList=res?.getOrderData;
      res.getOrderData.forEach((order:any,index:any)=>{
        let mobileOrderData:any={};
        mobileOrderData['parentHeading']=`Order ${index+1}`;
        mobileOrderData['parentWidth']='100%';
        mobileOrderData['btnText']='Track Order';
        mobileOrderData['btnShow']=true;
        mobileOrderData['orderId']=order._id;
        mobileOrderData['contentColor']='#f2b50c';
        let mobileProductList:any=[];
        let totalPrice=0;
        order.orderedProducts.forEach((product:any)=>{
          let productObject:any={};
          productObject['accordianWidth']='95%';
          productObject['heading']=product.productName;
          productObject['description']=product.productDes;
          productObject['content']='';
          productObject['img']=product.productImg;
          productObject['accordianShow']=false;
          productObject['notInitial']=false;
          productObject['quantity']=product.quantity;
          productObject['price']=product.productPrice;
          totalPrice+=product.productPrice;
          mobileProductList.push(productObject);
        });
        mobileOrderData['totalPrice']=totalPrice;
        mobileOrderData['childProps']=mobileProductList;
        this.mobileAccordianDetails.push(mobileOrderData);
      })
      console.log(this.mobileAccordianDetails,'sss')
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
  //  this.route.navigate(['/view-order'],{queryParams:{orderId:order?._id}});
  }
  trackOrder=(order:any)=>{
     this.route.navigate(['/track-order'],{queryParams:{orderId:order?._id}});
  }
  getOrderTrack=(id:string)=>{
    this.route.navigate(['/track-order'],{queryParams:{orderId:id}});
  }
}
