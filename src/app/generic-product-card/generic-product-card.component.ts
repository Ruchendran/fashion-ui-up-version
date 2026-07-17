import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { UnitPipe } from '../unit.pipe';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-product-card',
  imports: [CommonModule,UnitPipe],
  templateUrl: './generic-product-card.component.html',
  styleUrl: './generic-product-card.component.scss'
})
export class GenericProductCardComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    private apiService:ApiserviceService,
    private sharedData:SharedataService,
    private route:Router
  ){
    
  }
  userToken:any='';
  user:any='';
  @Input()cardDetails:any;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
      this.userToken = sessionStorage.getItem('userToken');
      this.user=sessionStorage.getItem('user')
    }
  }

  //add to cart
    addToCart = (product: any) => {
    if(this.user && this.userToken){
      // this.sharedData.loader.set(true);
      this.apiService.saveToCart({ ...product, userToken: this.userToken, quantity: 1 }).subscribe((res: any) => {
        this.sharedData.setModalMsg(res.message);
        // this.sharedData.loader.set(false);
        this.sharedData.callCartCount(this.userToken);
      },
        er => {
          // this.sharedData.loader.set(false)
        })
    }
    else{
      this.sharedData.setModalMsg('Please register or sign in')
      this.route.navigate(['/'])
    }
  }
}
