import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { GenericProductCardComponent } from '../generic-product-card/generic-product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-cards',
  imports: [GenericProductCardComponent,CommonModule],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss'
})
export class HomeCardsComponent implements OnInit {
  constructor(
    private apiService: ApiserviceService,
    private sharedData: SharedataService
  ) { }
  trendingProducts: any;
  ngOnInit(): void {
    this.initializeTrendingProducts();
  }


  initializeTrendingProducts() {
      this.sharedData.loader.set(true);
      this.apiService.getTrendingProducts().subscribe((data:any) => {
          this.sharedData.loader.set(false);
          this.trendingProducts = data?.trendingProducts;
      },
      er=>{
        this.sharedData.loader.set(false);
        console.error('Error fetching trending products:', er);
      })
  }
}
