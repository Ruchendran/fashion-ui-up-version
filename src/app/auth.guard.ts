import { inject,PLATFORM_ID} from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SharedataService } from './sharedata.service';
export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  let userName,userToken;
  const shareData=inject(SharedataService);
 const getReturnVal=()=>{
    if(isPlatformBrowser(platformId)){
      userName=sessionStorage.getItem('user');
      userToken=sessionStorage.getItem('userToken');
      if(userName &&userToken){
        return true;
      }
      else{
        shareData.setModalMsg('Please register or sign in')
        return router.navigate(['/'])
      }
    }
    return false;
  }
  return getReturnVal();
  
};
