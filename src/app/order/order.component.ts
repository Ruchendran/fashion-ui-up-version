import { CommonModule, isPlatformBrowser} from '@angular/common';
import { Component, ComponentRef, Inject, OnInit,PLATFORM_ID, ViewContainerRef} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Meta,Title } from '@angular/platform-browser';
import { ParentChildAccordianComponent } from '../parent-child-accordian/parent-child-accordian.component';
import { NoRecordsFoundComponent } from '../no-records-found/no-records-found.component';
import { SharedataService } from '../sharedata.service';
import { ShowMsgComponent } from '../show-msg/show-msg.component';
@Component({
  selector: 'app-order',
  imports: [CommonModule,ParentChildAccordianComponent,NoRecordsFoundComponent,ShowMsgComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId:Object,private containerRef: ViewContainerRef,private apiService:ApiserviceService,private route:Router,private activatedRoute:ActivatedRoute,private metaService:Meta,private titleService:Title,private sharedData:SharedataService){

  }
  userToken:any=''
  orderList:any=[];
  metaData:any;
  mobileAccordianDetails:any=[];
  public Array= Array;
  updMeta(metaData:any){
        // Ensure you're setting the correct <title> tag as well
        this.titleService.setTitle(metaData.title); 
        this.metaService.updateTag({property:'og:title',content:metaData.title});
        this.metaService.updateTag({property:'og:description',content:metaData.description});
        // Use the image from the resolved data if available, otherwise use a fallback
        this.metaService.updateTag({property:'og:image',content:metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
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
  ngOnInit(): void {
    const resolvedSeoData = this.activatedRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
      // this.userToken=sessionStorage.getItem('userToken');
    };
    this.userToken=this.sharedData.userToken();
    this.getOrderList(this.userToken)
  }
  getOrderList(token:any){
    this.sharedData.loader.set(true)
    this.apiService.getOrderList(token).subscribe((res:any)=>{
      this.orderList=res?.getOrderData;
      // console.log(this.orderList,"lists")
      this.mobileAccordianDetails=[]
      res.getOrderData.forEach((order:any,index:any)=>{
        let mobileOrderData:any={};
        mobileOrderData['parentHeading']=`Order-${index+1} (${order.delivered?'Delivered':'Pending'})`;
        mobileOrderData['parentWidth']='100%';
        mobileOrderData['btnText']='Track Order';
        mobileOrderData['btnShow']=true;
        mobileOrderData['orderId']=order._id;
        mobileOrderData['contentColor']='#f2b50c';
        mobileOrderData['delivered']=order.delivered;
        mobileOrderData['feedBack']=order.feedBack;
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
          productObject['userStarRating']=0;
          productObject['productId']=product.productId;
          totalPrice+=product.productPrice;
          mobileProductList.push(productObject);
        });
        mobileOrderData['totalPrice']=totalPrice;
        mobileOrderData['childProps']=mobileProductList;
        this.mobileAccordianDetails.push(mobileOrderData);
      })
      // console.log(this.mobileAccordianDetails,'sss')
      this.sharedData.loader.set(false);
    })
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
  getTotalPrice=(order:any)=>{
     let total=0;
     order.forEach((product:any)=>{
      total=total+product.productPrice;
     })
     return total;
  }


  //fill the stars method.
  fillStar=(product:any,i:number)=>{
    product.userStarRating=i+1;
  }
  // fill out the stars method or delete the stars.
  deleteStar=(product:any,i:number)=>{
    product.userStarRating=0;
  }

  //feedback btn enble checking method.
  checkFeedbackEnable=(order:any)=>{
    const productsLength=order.orderedProducts.length;
    // console.log(order,"sss",productsLength)
    let countUserStarRatingProduct=0;
    order.orderedProducts.forEach((product:any)=>{
      if(product.userStarRating>0){
        countUserStarRatingProduct+=1;
      }
    });
    if(countUserStarRatingProduct == productsLength){
      return false;
    }
    else{
    return true;
    }
  }


  //updae the userFeedback.
  updateUserFeedBack=(products:any,orderId:any,userId:any)=>{
    const productsListPayload:any=[];
    products.forEach((product:any)=>{
      productsListPayload.push({userStarRating:product.userStarRating,productId:product.productId});
    });
    this.sharedData.loader.set(true);
    this.apiService.updUserFeedback({productsListPayload,orderId,userId}).subscribe((res:any)=>{
      this.sharedData.loader.set(false);
      this.sharedData.setModalMsg(res.message);
      
      this.getOrderList(this.userToken);
      this.callOrderCount(this.userToken);
    })
  }

  // nreceive event from child emitOrerValueForFedback.
  emitOrerValueForFedback=(event:any)=>{
    this.updateUserFeedBack(event.childProps,event.orderId,this.userToken);
  }
}
