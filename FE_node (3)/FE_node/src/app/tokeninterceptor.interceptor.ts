import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiserviceService } from './apiservice.service';


@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(private service:ApiserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // const getToken = this.service.getToken();
    // console.log("interceptor token", getToken)
    // let setheadertoken = request.clone({
    //   setHeaders:{
    //     token: `${getToken}`
    //   }
    // });  

    let getToken = this.service.getToken();
    let setheadertoken = request.clone({
      setHeaders:{
        token:`${getToken}`
      }
    });

    return next.handle(setheadertoken);
  }
}
