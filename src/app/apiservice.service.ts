import { Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { serverVal } from '../../environment';
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
    getPlaceOrderDetail:serverVal.server+'/cart'
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
  getAllProducts(){
    return this.http.get(this.apiConstants.getAllProducts);
  }
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
  getPlaceOrderDetail(productId:any){
    let url=this.apiConstants.getPlaceOrderDetail+"/place-order/"+productId;
    return this.http.get(url);
  }
}
