import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { SharedataService } from '../sharedata.service';
import { UnitPipe } from '../unit.pipe';
import { Router } from '@angular/router';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { NoRecordsFoundComponent } from '../no-records-found/no-records-found.component';
@Component({
  selector: 'app-saved-products',
  imports: [CommonModule,UnitPipe,EventModalComponent,NoRecordsFoundComponent],
  templateUrl: './saved-products.component.html',
  styleUrl: './saved-products.component.scss'
})
export class SavedProductsComponent implements OnInit {
  userToken:any='';
  savedProductsList:any=[];
  user: any='';
  deleteModal:boolean=false;
  productId:any='';
  modalMsg='';
  actionFor!: string;
  constructor(@Inject(PLATFORM_ID) private platformId:Object,private apiService:ApiserviceService,private sharedData:SharedataService,private route:Router){

  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
      // this.userToken=sessionStorage.getItem('userToken');
      // this.user=sessionStorage.getItem('user')
    };
    this.user=this.sharedData.logInUser();
    this.userToken=this.sharedData.userToken();
    this.getSaveProdFromProductsModel(this.userToken)
  }
  getSaveProdFromProductsModel=(token:string)=>{
    // this.sharedData.loader.set(true);
    this.apiService.getSaveProdFromProductsModel(token).subscribe((res:any)=>{
      this.savedProductsList=res.savedProducts;
      //  this.sharedData.loader.set(false);
       this.closeDeleteModal();
    },er=>{
      // this.sharedData.loader.set(false);
      this.closeDeleteModal()
    })
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
  deleteAllFromSavedProducts=()=>{
     this.openDeleteModal('Are you sure want to delete all from saved it later!','delete-all');
  }
   receiveEvent=(eventValEmit:any)=>{
    if(eventValEmit.eventVal){
      if(eventValEmit.actionFor == 'delete'){
        this.deleteProductFromSaveLater(this.productId); 
      }
      else if(eventValEmit.actionFor == 'delete-all'){
        this.deleteAllProductsFromSaveLterSpecificUser()
      }
    }else{
      this.closeDeleteModal();
    }
  }
  deleteAllProductsFromSaveLterSpecificUser=()=>{
      // this.sharedData.loader.set(true);
      this.apiService.deleteAllFromSavedProducts(this.userToken).subscribe((res:any)=>{
        // this.sharedData.loader.set(false);
        this.sharedData.setModalMsg(res.message);
          this.getSaveProdFromProductsModel(this.userToken);
      },er=>{
        // this.sharedData.loader.set(false);
        this.sharedData.setModalMsg('Server getting busy!try later');
        this.closeDeleteModal();
      })
  }
  deleteProductFromSaveLater=(productId:any)=>{
    // this.sharedData.loader.set(true);
    this.apiService.deleteFromSavedProducts(this.userToken,productId).subscribe((res:any)=>{
      // this.sharedData.loader.set(false);
      this.sharedData.setModalMsg(res.message);
      this.getSaveProdFromProductsModel(this.userToken);
    },er=>{
      // this.sharedData.loader.set(false);
      this.sharedData.setModalMsg(er.message);
      this.closeDeleteModal();
    })
  }
  closeDeleteModal=()=>{
    this.deleteModal=false;
  }
  openDeleteModal=(msg:string,action:string)=>{
    this.deleteModal=true;
    this.modalMsg=msg;
    this.actionFor=action;
  }
  deleteFromSave=(data:any)=>{
    this.productId=data._id;
    this.openDeleteModal('Are you sure want to delete from sve it later!','delete');
  }
}
