import { Component, ElementRef, Inject, OnInit,PLATFORM_ID,ViewChild } from '@angular/core';
import { RouterOutlet,RouterModule,Router} from '@angular/router';
import { HostListener} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SharedataService } from './sharedata.service';
import { LoaderComponent } from './loader/loader.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ApiserviceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule,FooterComponent,LoaderComponent,MessageModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'fashion-ui';
  mobileNav:boolean=false;
  openWhatsapp:any=false;
  whatsCount:any=0;
  userInitial:any;
  appInitialized=false;
  constructor(private location:Location,@Inject(PLATFORM_ID) private platformId: Object,private route:Router,public shareData:SharedataService,private apiService:ApiserviceService){

  }
  headerHide:boolean=true;
  @ViewChild('signInHover') signInHover!:ElementRef;
  @HostListener('click',['$event'])
  onClick=(outOfHover:Event)=>{
    if(!this.signInHover?.nativeElement.contains(outOfHover.target)){
      let signInHoverElement=document.getElementById('sign-in-hover');
      signInHoverElement?.classList.remove('sign-in-hover-label');
      signInHoverElement?.classList.add('sign-in-hover');
    }
  }
  callCartCount=(userToken:any)=>{
    this.shareData.loader.set(true);
    this.apiService.getCartCount(userToken).subscribe((res:any)=>{
      this.shareData.loader.set(false);
      this.shareData.cartCount.set(res.cartCount);
    },
  er=>{
    this.shareData.loader.set(false);
  })
  }
    callOrderCount=(userToken:any)=>{
    this.shareData.loader.set(true);
    this.apiService.getOrderCount(userToken).subscribe((res:any)=>{
      this.shareData.loader.set(false);
      this.shareData.orderCount.set(res.orderCount);
    },
    er=>{
      this.shareData.loader.set(false);
    }
  )
  }
  ngOnInit(): void {
    this.shareData.loader.set(false);
    if(isPlatformBrowser(this.platformId)){
    let data=sessionStorage.getItem('user');
    let userToken=sessionStorage.getItem('userToken');
       this.callCartCount(userToken);
       this.callOrderCount(userToken);
    if(data){
      this.shareData.setLogInUserVal(data);
    }
    }
    this.location.onUrlChange((url)=>{
      if( url == '/sign-in' || url=='/admin' || url=='/admin/upload'){
        this.headerHide=false;
      }
      else{
        this.headerHide=true;
      }
      if(isPlatformBrowser(this.platformId)){
        let signInHoverElement=document.getElementById('sign-in-hover');
        signInHoverElement?.classList.remove('sign-in-hover-label');
        signInHoverElement?.classList.add('sign-in-hover');
      }
      
    })
    
  }
  pointHover=()=>{
    let signInHoverElement=document.getElementById('sign-in-hover');
    signInHoverElement?.classList.add('sign-in-hover-label');
  }
  clickMobileArrow=()=>{
    this.appInitialized=true
    this.mobileNav=!this.mobileNav;
  }
    whatsAppClick=()=>{
    this.whatsCount=1;
    this.openWhatsapp=!this.openWhatsapp
  }


  MsgThroughWts=()=>{
    window.open("https://wa.me/+918074178839",'_blank');
  }

  onLogOut=()=>{
    sessionStorage?.removeItem('user');
    sessionStorage?.removeItem('password');
    sessionStorage?.removeItem('userToken');
    this.route.navigate(['/sign-in']);
    sessionStorage.removeItem('adminUser');
  }
  routesClick=()=>{
    this.mobileNav=false;
  }
  clickHome=()=>{
    this.route.navigate(['/']);
  }
}
