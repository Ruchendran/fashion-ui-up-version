import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NoRecordsFoundComponent } from '../no-records-found/no-records-found.component';
import { UnitPipe } from '../unit.pipe';
import { Router } from '@angular/router';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-favourites',
  imports: [
    NoRecordsFoundComponent,
    UnitPipe,
    CommonModule,
    EventModalComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss','../saved-products/saved-products.component.scss']
})
export class FavouritesComponent implements OnInit{
  deleteModal:boolean=false;
  modalMsg='';
  actionFor!: string;
  userToken:any='';
  productId:any='';
  user: any='';
  constructor(
    private apiService:ApiserviceService,
    private sharedData:SharedataService,
    @Inject(PLATFORM_ID) private platformId:Object,
    private route:Router
  ){

  }
  favouriteList:any;
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
    };
    this.user=this.sharedData.logInUser();
    this.userToken=this.sharedData.userToken();
    this.getFavouriteProducts();
  }
  getFavouriteProducts=()=>{
    this.apiService.getAllFavProductsFromPoductsDb(this.userToken).subscribe((res:any)=>{    
      this.favouriteList=res.favProducts;
      this.closeDeleteModal()
    },er=>{
      this.closeDeleteModal()
    })
  }

     addToCart = (favProd: any) => {
    if(this.user && this.userToken){
      this.sharedData.loader.set(true);
      this.apiService.saveToCart({ ...favProd.userFavourites, userToken: this.userToken, quantity: 1 }).subscribe((res: any) => {
        this.sharedData.setModalMsg(res.message);
        this.sharedData.loader.set(false);
        this.sharedData.callCartCount(this.userToken);
      },
        er => {
          this.sharedData.loader.set(false)
        })
    }
    else{
      this.sharedData.setModalMsg('Please register or sign in')
      this.route.navigate(['/'])
    }
  }

  deleteFromFav=(favProduct:any)=>{
    this.productId=favProduct.userFavourites._id;
    this.openDeleteModal('Are you sure want to delete from Favourites it later!','delete');
  }
  deleteAllFromFav=()=>{
     this.openDeleteModal('Are you sure want to delete all from Favourites it later!','delete-all');
  }
    openDeleteModal=(msg:string,action:string)=>{
    this.deleteModal=true;
    this.modalMsg=msg;
    this.actionFor=action;
  }
    closeDeleteModal=()=>{
    this.deleteModal=false;
  }

    receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit.eventVal){
      if(eventValEmit.actionFor == 'delete'){
        this.deleteProductFromFavourite(this.productId); 
      }
      else if(eventValEmit.actionFor == 'delete-all'){
        this.deleteAllProductsFromFavSpecificUser()
      }
    }else{
      this.closeDeleteModal();
    }
  }
  deleteProductFromFavourite=(productId:string)=>{
    this.sharedData.loader.set(true);
    this.apiService.delFromFavourites(this.userToken,productId).subscribe((res:any)=>{
      this.sharedData.setModalMsg(res.message);
      this.getFavouriteProducts();
    },er=>{
      this.sharedData.loader.set(false);
      this.sharedData.setModalMsg(er.message);
      this.closeDeleteModal();
    })
  }
  deleteAllProductsFromFavSpecificUser=()=>{
    this.sharedData.loader.set(true);
    this.apiService. deleteAllFromFvourites(this.userToken).subscribe((res:any)=>{
      this.sharedData.setModalMsg(res.message);
      this.getFavouriteProducts();
    },er=>{
       this.sharedData.loader.set(false);
        this.sharedData.setModalMsg('Server getting busy!try later');
        this.closeDeleteModal();
    })
  }
}
