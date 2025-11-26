import { Injectable, OnInit, signal,PLATFORM_ID, Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedataService implements OnInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId:Object) { }

  logInUser=signal('');
  ngOnInit(): void {

  }
  orderCount=signal(0);
  cartCount=signal(0);
  inputMsg=signal('')
  getAdminData=()=>{
    if(isPlatformBrowser(this.platformId)){
        return  sessionStorage.getItem('adminUser')=='true'?true:false;
      }
      else{
        return false;
      }
  }
  setLogInUserVal=(user:string)=>{
    this.logInUser.set(user);
  }
  setModalMsg=(msg:string)=>{
    this.inputMsg.set(msg);
  }
  loader=signal(false);

}
