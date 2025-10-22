import { Component, ElementRef, Inject, OnInit,PLATFORM_ID,ViewChild } from '@angular/core';
import { RouterOutlet,RouterModule,Router} from '@angular/router';
import { HostListener} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SharedataService } from './sharedata.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'fashion-ui';
  mobileNav:boolean=false;
  openWhatsapp:any=false;
  whatsCount:any=0;
  landingPage=false;
  constructor(private location:Location,@Inject(PLATFORM_ID) private platformId: Object,private route:Router,public shareData:SharedataService){

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
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
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
      if(url == '/'){
        this.landingPage=true;
      }
      else{
        this.landingPage=false;
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
    this.route.navigate(['/log-in']);
  }

}
