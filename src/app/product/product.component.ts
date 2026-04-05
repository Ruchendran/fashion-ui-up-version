import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { GenericPaginationComponent } from '../generic-pagination/generic-pagination.component';
import { UnitPipe } from '../unit.pipe';
import { ProductInterface } from '../generic-interfaces/interfaces-model';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule,GenericPaginationComponent,UnitPipe,EventModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  metaData: any;
  user: any;
  modalMsg=''
  actionFor='';
  showEventModal:boolean=false;
  constructor(private apiService: ApiserviceService, @Inject(PLATFORM_ID) private platformId: Object, private activateRoute: ActivatedRoute, private sharedData: SharedataService, private route: Router, private metaService: Meta, private titleService: Title) {

  }
  minPrice = 20;
  maxPrice = 100;
  public Array = Array;
  listOfProducts: ProductInterface[] = [];
  userToken: any = '';
  productFamily = '';
  filteredProducts: ProductInterface[] = [];
  searchInput = '';
  updFavProd:any;
  favouritesList:any;
  updMeta(metaData: any) {
    // Ensure you're setting the correct <title> tag as well
    this.titleService.setTitle(metaData.title);
    this.metaService.updateTag({ property: 'og:title', content: metaData.title });
    this.metaService.updateTag({ property: 'og:description', content: metaData.description });
    // Use the image from the resolved data if available, otherwise use a fallback
    this.metaService.updateTag({ property: 'og:image', content: metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg' })
  }
  ngOnInit(): void {
    const resolvedSeoData = this.activateRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
      this.userToken = sessionStorage.getItem('userToken');
      this.user=sessionStorage.getItem('user')
      this.productFamily = window.location.pathname.split("/").reverse()[0]
    };
    this.getTotalRecords();
    // this.activateRoute.params.subscribe((val) => {
    //   this.productFamily = val['productFamily'];
    // })
  };
  getTotalRecords=()=>{
    // this.sharedData.loader.set(true);
    this.apiService.getTotalRecords(this.productFamily).subscribe((res:any)=>{
      // this.sharedData.loader.set(false);
      this.paginationDetails.totalRecords=res?.totalRecords;
    },
  er=>{
    //  this.sharedData.loader.set(false);
  })
  }
  getProducts=(page:number)=>{
    // this.sharedData.loader.set(true);
    this.apiService.getAllProducts(this.productFamily,page).subscribe((res:ProductInterface[]) => {
      // this.sharedData.loader.set(false);
      if(this.favouritesList.length){
          this.favouritesList.forEach((favProd:any)=>{
          res.find((prod:any)=>{
           if(prod._id == favProd.productId){
            prod.favourite=true
           }
          })
       })
      }
      this.listOfProducts = res;
      this.filteredProducts = res;
    },
    er => {
      // this.sharedData.loader.set(false);
    })
  }
  filterByPrice = () => {
    // this.sharedData.loader.set(true)
    // this.apiService.getAllProductsByPrice(this.productFamily, this.minPrice, this.maxPrice).subscribe((res) => {
    //   this.sharedData.loader.set(false)
    //   this.listOfProducts = res;
    //   this.filteredProducts = res;
    // }, er => {
    //   this.sharedData.loader.set(false)
    //   this.sharedData.setModalMsg(er.message);
    // })
    this.filteredProducts=this.listOfProducts.filter((product:any)=>{
      return product.productPrice>this.minPrice && product.productPrice<this.maxPrice 
    })
    // this.sharedData.loader.set(false);
  }
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
  searchProducts = () => {
    this.filteredProducts = this.listOfProducts.filter((product: any) => {
      if (product.productName.toLowerCase().includes(this.searchInput.toLowerCase())) {
        return product;
      }
    });
  }
  navToCart = () => {
    this.route.navigate(['/cart'])
  }
  paginationDetails={
    totalRecords:null,
    styles:{
      normalColor:'#f2b50c',
      activeColor:'#ffffff',
    }
  }
  capturePage=async(page:any)=>{
    // this.sharedData.loader.set(true);
    try{
    this.favouritesList=await lastValueFrom(this.apiService.getAllFavourites(this.userToken));
      // this.sharedData.loader.set(false);
    }catch(e){
      // this.sharedData.loader.set(false); 
    }
    this.getProducts(page);
  }

  clickFav=(product:ProductInterface)=>{
    if(this.user && this.userToken){
      this.updFavProd=product;
      //when click the un fav to fav.its initial false.f initial false means its goint un-fav to fav.
      if(!this.updFavProd.favourite){
        this.openDeleteModal('Are you sure want add to favourites!.','add')
      }else{
        this.openDeleteModal('Are you sure want delete from favourites!.','delete')
      }
    }
    else{
       this.sharedData.setModalMsg('Please register or sign in')
    }
  }
  receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit.eventVal){
      if(eventValEmit.actionFor == 'add'){
        this.addToFavourites();
      }else if(eventValEmit.actionFor == 'delete'){
        this.delFromFavourites();
      }
    }else{
      this.closeDeleteModal();
    }
  }

  closeDeleteModal=()=>{
    this.showEventModal=false;
  }
  openDeleteModal=(msg:string,action:string)=>{
    this.showEventModal=true;
    this.modalMsg=msg;
    this.actionFor=action;
  }
  addToFavourites=()=>{
    this.showEventModal=false;
    // this.sharedData.loader.set(true);
    this.apiService.addToFavourites(this.userToken,this.updFavProd._id).subscribe((res:any)=>{
      // this.sharedData.loader.set(false);
      //set the fav to true fter api success
      this.filteredProducts.forEach((prod:ProductInterface)=>{
        if(prod._id==this.updFavProd._id){
          prod.favourite=true;
        }
      });
      this.listOfProducts=this.filteredProducts;
      this.sharedData.setModalMsg(res.message);
    },er=>{
      // this.sharedData.loader.set(false);
      this.sharedData.setModalMsg('Server busy please try after.');
    })
  }


  delFromFavourites=()=>{
    this.showEventModal=false;
    // this.sharedData.loader.set(true);
    this.apiService.delFromFavourites(this.userToken,this.updFavProd._id).subscribe((res:any)=>{
      // this.sharedData.loader.set(false);
      //set the fav to false fter api success
      this.filteredProducts.forEach((prod:ProductInterface)=>{
        if(prod._id==this.updFavProd._id){
          prod.favourite=false;
        }
      });
      this.listOfProducts=this.filteredProducts;
      this.sharedData.setModalMsg(res.message);
    },er=>{
      // this.sharedData.loader.set(false);
      this.sharedData.setModalMsg('Server busy please try after.');
    })
  }


  navToFavourites=()=>{
    this.route.navigate(['/favourites'])
  }
}

