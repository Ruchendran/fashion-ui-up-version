import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  constructor(private apiService: ApiserviceService, private containerRef: ViewContainerRef) {

  }
   @ViewChild('loaderContainer', { read: ViewContainerRef }) loaderContainer!: ViewContainerRef;
  listOfProducts: any = [];
   private loaderRef!: ComponentRef<LoaderComponent>;
  ngOnInit(): void {
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
    this.apiService.saveToCart(product).subscribe((res)=>{
      console.log(res,"20001");
      this.hideLoader();
    },
    er=>{
      this.hideLoader();
    })
  }
}
