import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, finalize } from "rxjs";
import { LoaderService } from "./loader.service";




@Injectable({
    providedIn :'root'
})
export class PostHttpInterceptorService implements HttpInterceptor{
    constructor(
        private _loaderService : LoaderService
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loaderService.loadingState$.next(true)

        const headers = new HttpHeaders({
            'content-type' : 'qwertyuiop using Interceoptors',
            'Authorization': ' JWT Token form local storage !!!'
          })
        const clonrReq = req.clone({headers})

        //Or

        // const clonrReq = req.clone()
        // clonrReq.headers.set('content-type','application/json')
        // clonrReq.headers.set('Authorization','application/json')


        //next => it send cloned request instead of original request
        return next.handle(clonrReq)
                    .pipe(
                        delay(1500),
                        finalize(()=>{
                            // when we got respoce form BE
                            this._loaderService.loadingState$.next(false)
                        })
                    )
    }
}