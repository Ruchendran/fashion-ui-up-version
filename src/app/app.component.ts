import { Component, ElementRef, Inject, OnInit,PLATFORM_ID,ViewChild } from '@angular/core';
import { RouterOutlet,RouterModule,Router} from '@angular/router';
import { HostListener} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SharedataService } from './sharedata.service';
import { LoaderComponent } from './loader/loader.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { Title,Meta } from '@angular/platform-browser';

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
  constructor(private location:Location,@Inject(PLATFORM_ID) private platformId: Object,private route:Router,public shareData:SharedataService,private titleService:Title,private metaService:Meta){

  }
  headerHide:boolean=true;
  @ViewChild('signInHover') signInHover!:ElementRef;
  @HostListener('click',['$event'])
  onClick=(outOfHover:Event)=>{
    if(!this.signInHover.nativeElement.contains(outOfHover.target)){
      let signInHoverElement=document.getElementById('sign-in-hover');
      signInHoverElement?.classList.remove('sign-in-hover-label');
      signInHoverElement?.classList.add('sign-in-hover');
    }
  }
  updMeta(){
    this.titleService.setTitle("fashion-shopping-trend");
    this.metaService.updateTag({property:'og:title',content:'fasion-ui-page'});
    this.metaService.updateTag({property:'og:description',content:"these are igly trend products."});
    this.metaService.updateTag({property:'og:image',content:'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
    this.updMeta();
    let data=sessionStorage.getItem('user');
    if(data){
      this.shareData.setLogInUserVal(data);
    }
    }
    this.location.onUrlChange((url)=>{
      if(url == '/register' || url == '/log-in'){
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
    console.log("hit")
    window.open("https://wa.me/+918074178839",'_blank');
  }

  onLogOut=()=>{
    sessionStorage?.removeItem('user');
    sessionStorage?.removeItem('password');
    sessionStorage?.removeItem('userToken');
    this.route.navigate(['/log-in']);
    sessionStorage.removeItem('adminUser');
  }
  routesClick=()=>{
    this.mobileNav=false;
  }

}
