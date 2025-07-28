import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, pipe } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const ngxSpinnerService = inject(NgxSpinnerService);

  ngxSpinnerService.show()
  

  return next(req).pipe( finalize( ()=>{
    // ngxSpinnerService.hide()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      ngxSpinnerService.hide();
    }, 1000);
  } ) );
};
