import { Component, OnInit, ComponentRef, PLATFORM_ID, Inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute ,Router} from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private apiService: ApiserviceService, @Inject(PLATFORM_ID) private platformId: Object, private activateRoute: ActivatedRoute, private sharedData: SharedataService,private route:Router) {

  }
  minPrice=20;
  maxPrice=100;
  public Array=Array;
  listOfProducts: any = [];
  userToken: any = '';
  productFamily = '';
  filteredProducts:any=[];
  searchInput='';
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userToken = sessionStorage.getItem('userToken');
      this.productFamily=window.location.pathname.split("/").reverse()[0]
    };
    // this.activateRoute.params.subscribe((val) => {
    //   this.productFamily = val['productFamily'];
    // })
    this.sharedData.loader.set(true);
    this.apiService.getAllProducts(this.productFamily).subscribe((res) => {
      this.sharedData.loader.set(false)
      this.listOfProducts = res;
      this.filteredProducts=res;
    },
      er => {
        this.sharedData.loader.set(false);
      })
  };
  filterByPrice=()=>{
    this.sharedData.loader.set(true)
    this.apiService.getAllProductsByPrice(this.productFamily,this.minPrice,this.maxPrice).subscribe((res)=>{
      this.sharedData.loader.set(false)
      this.listOfProducts=res;
      this.filteredProducts=res;
    },er=>{
      this.sharedData.loader.set(false)
      this.sharedData.setModalMsg(er.message);
    })
  }
    callCartCount=()=>{
    this.sharedData.loader.set(true);
    this.apiService.getCartCount().subscribe((res:any)=>{
      this.sharedData.loader.set(false);
      this.sharedData.cartCount.set(res.cartCount);
    },
  er=>{
    this.sharedData.loader.set(false);
  })
  }
  addToCart = (product: any) => {
    this.sharedData.loader.set(true);
    this.apiService.saveToCart({ ...product, userToken: this.userToken, quantity: 1 }).subscribe((res: any) => {
      this.sharedData.setModalMsg(res.message);
      this.sharedData.loader.set(false);
      this.callCartCount();
    },
      er => {
        this.sharedData.loader.set(false)
      })
  }
  searchProducts=()=>{
    this.filteredProducts=this.listOfProducts.filter((product:any)=>{
      if(product.productName.toLowerCase().includes(this.searchInput.toLowerCase())){
        return product;
      }
    });
  }
  navToCart=()=>{
    this.route.navigate(['/cart'])
  }
}

