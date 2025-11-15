import { CanActivateFn} from '@angular/router';
import { SharedataService } from './sharedata.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const admin=inject(SharedataService);
  // console.log(admin.getAdminData)
  return admin.getAdminData();
};
