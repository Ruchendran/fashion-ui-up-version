import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef,PLATFORM_ID, Inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule,isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private apiService: ApiserviceService, private containerRef: ViewContainerRef,@Inject(PLATFORM_ID) private platformId:Object) {

  }
   @ViewChild('loaderContainer', { read: ViewContainerRef }) loaderContainer!: ViewContainerRef;
  listOfProducts: any = [];
   private loaderRef!: ComponentRef<LoaderComponent>;
   userToken:any='';
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.userToken=sessionStorage.getItem('userToken');
    }
    this.showLoader();
    this.apiService.getAllProducts().subscribe((res) => {
      this.hideLoader();
      this.listOfProducts = res;
    },
      er => {
        this.hideLoader();
      })
  }
  showLoader = () => {
    this.loaderRef = this.containerRef.createComponent(LoaderComponent)
  }
  hideLoader = () => {
      this.loaderRef.destroy();
  }
  addToCart=(product:any)=>{
    this.showLoader();
    this.apiService.saveToCart({...product,userToken:this.userToken,quantity:1}).subscribe((res:any)=>{
      alert(JSON.stringify(res.message))
      this.hideLoader();
    },
    er=>{
      this.hideLoader();
    })
  }
}
