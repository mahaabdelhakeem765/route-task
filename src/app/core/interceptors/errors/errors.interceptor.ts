import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req).pipe( catchError( (err)=>{
    // logic error
    console.log(err);

    return throwError( ()=> err )
  } ) ); //logic -> response
};
 