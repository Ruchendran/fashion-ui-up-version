import { HttpInterceptorFn } from '@angular/common/http';
import { SharedataService } from '../sharedata.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const sharedData=inject(SharedataService);
  sharedData.loader.set(true);
  return next(req).pipe(
    finalize(()=>{
      sharedData.loader.set(false);
    })
  );
};
