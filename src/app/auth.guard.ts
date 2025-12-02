import { inject,PLATFORM_ID} from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  let userName,userToken;
  if(isPlatformBrowser(platformId)){
    userName=sessionStorage.getItem('user');
    userToken=sessionStorage.getItem('userToken');
  }
  
  if(userName &&userToken){
     return true;
  }
  else{
    return router.navigate(['/sign-in'])
  }
};
