import { Component, OnInit, ComponentRef, PLATFORM_ID, Inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedataService } from '../sharedata.service';
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private apiService: ApiserviceService, @Inject(PLATFORM_ID) private platformId: Object, private activateRoute: ActivatedRoute, private sharedData: SharedataService) {

  }
  public Array=Array;
  listOfProducts: any = [];
  userToken: any = '';
  productFamily = '';
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userToken = sessionStorage.getItem('userToken');
      this.productFamily=window.location.pathname.split("/").reverse()[0]
    };
    // this.activateRoute.params.subscribe((val) => {
    //   this.productFamily = val['productFamily'];
    // })
    this.sharedData.loader = true;
    this.apiService.getAllProducts(this.productFamily).subscribe((res) => {
      this.sharedData.loader = false;
      this.listOfProducts = res;
    },
      er => {
        this.sharedData.loader = false;
      })
  }
  addToCart = (product: any) => {
    this.sharedData.loader = true;
    this.apiService.saveToCart({ ...product, userToken: this.userToken, quantity: 1 }).subscribe((res: any) => {
      this.sharedData.setModalMsg(res.message);
      this.sharedData.loader = false;
    },
      er => {
        this.sharedData.loader = false;
      })
  }
}
