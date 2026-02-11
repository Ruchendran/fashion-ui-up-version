import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { serverVal } from '../environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService implements OnInit {

  constructor(private http:HttpClient) { }

  apiConstants={
    registerUser:serverVal.server+'/auth/register',
    loginUser:serverVal.server+'/auth/login',
    getAllProducts:serverVal.server+'/products',
    saveToCart:serverVal.server+'/cart/save',
    getCartProducts:serverVal.server+'/cart/list',
    appendOrder:serverVal.server+'/order/append',
    getOrderList:serverVal.server+'/order/list',
    getOrderDetail:serverVal.server+'/order',
    getPlaceOrderDetail:serverVal.server+'/cart',
    getAdminUser:serverVal.server+'/auth/admin/verify',
    delFromCart:serverVal.server+'/cart/delete',
    // getAllProductsByPrice:serverVal.server+'/products/filterPrice',
    chatbotService:serverVal.server+'/chatbot/query-text',
    resetPassword:serverVal.server+'/auth/reset',
    getCartCount:serverVal.server+'/cart/cart-count',
    getOrderCount:serverVal.server+'/order/order-count',
    postalCodeApi:serverVal.server+'/generic/postal',
    getUserAddress:serverVal.server+'/auth/get-address',
    getTotalRecord:serverVal.server+'/products/totalRecords'
  }

  ngOnInit(): void {
      
  }

  adminUpload(data: any): Observable<any> {
    return this.http.post(serverVal.server+"/admin/upload", data);  // POST request
  }

  registerUser(data:any){
    return this.http.post(this.apiConstants.registerUser,data);
  }
  loginUser(data:any){
    return this.http.post(this.apiConstants.loginUser,data);
  }
  getAllProducts(productFamily:String,page:number){
    let group=productFamily=='products'?'all':productFamily;
    return this.http.get(this.apiConstants.getAllProducts+`/${group}/${page}`);
  };
  // getAllProductsByPrice(productFamily:String,min:any,max:any){
  //   let fam=productFamily=='products'?'all':productFamily;
  //   return this.http.get(this.apiConstants.getAllProductsByPrice,{params:{minPrice:min,maxPrice:max,productFamily:fam.toString()}})
  // }
  saveToCart(payload:any){
    return this.http.post(this.apiConstants.saveToCart,payload);
  }
  getCartProducts(userToken: string){
    let url=this.apiConstants.getCartProducts+"/"+userToken;
    return this.http.get(url);
  }
  appendOrder(payloadObj:any){
    return this.http.post( this.apiConstants.appendOrder,payloadObj);
  }
  getOrderList(userToken: string){
    let url=this.apiConstants.getOrderList+"/"+userToken;
    return this.http.get(url);
  } 
  getOrderDetail(orderId:any){
    let url=this.apiConstants.getOrderDetail+"/"+orderId;
    return this.http.get(url);
  }
  getPlaceOrderDetail(productId:any,userId:any){
    let placeOrderParams=new HttpParams();
    let url=this.apiConstants.getPlaceOrderDetail+"/place-order";
    return this.http.get(url,{params:{userId:userId,productId:productId}});
  }
  getAdminUser(adminMail:any){
    let url=this.apiConstants.getAdminUser;
    return this.http.post(url,{userMail:adminMail});
  }
  delFromCart(productId:any,userId:any){
    let url=this.apiConstants.delFromCart+`/${productId}/${userId}`;
    return this.http.delete(url);
  }
  chatbotService(queryText:string){
    let url=this.apiConstants.chatbotService;
    return this.http.post(url,{queryText:queryText});
  }
  resetPassword(mail:string,pas:string){
    return this.http.put(this.apiConstants.resetPassword,{userMail:mail,password:pas})
  }
  getCartCount(token:any){
    return this.http.get(this.apiConstants.getCartCount,{params:{userToken:token}});
  }
  getOrderCount(token:any){
    return this.http.get(this.apiConstants.getOrderCount,{params:{userToken:token}});
  }
  postalCodeApi(code:any){
    return this.http.get(this.apiConstants.postalCodeApi+`/${code}`);
  }
  getUserAddress(token:any){
    return this.http.get(this.apiConstants.getUserAddress+`/${token}`);
  }
  getTotalRecords(productFamily:string){
    let group=productFamily=='products'?'all':productFamily;
    return this.http.get(this.apiConstants.getTotalRecord+`/${group}`);
  }
}
