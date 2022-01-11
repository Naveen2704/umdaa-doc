import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { EMPTY, from, Observable } from "rxjs";
import { catchError, delay, finalize, map, retryWhen, switchMap, tap, timeout } from "rxjs/operators";
import { LoaderService } from './loader.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService,private loadingController: LoadingController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.loadingPresent();
        return next.handle(req).pipe(
            
            finalize(() => this.loaderService.loadingDismiss())
        );
    //     let defaultTimeout = 5000;
    //     this.loaderService.loadingPresent();
    //     return next.handle(req).pipe(timeout(defaultTimeout),
    //       retryWhen(err=>{
    //           console.log(err)
    //         let retries = 1;
    //         return err.pipe(
    //           delay(500),
    //           map(error=>{
    //             if (retries++ ===3){
    //                 console.log(error)
    //               throw error
    //             }
    //             return error;
    //           })
    //         )
    //       }),catchError(err=>{
    //         console.log(err)
    //         return EMPTY
    //       }), finalize(()=>{
    //         this.loaderService.loadingDismiss()
    //       })
    //     )
    //   };
        // }

    //     if (req.url.indexOf('http') !== 0) {
    //         return next.handle(req);
    //     }
    
    //     return from(this.loadingController.create())
    //         .pipe(
    //             tap((loading) => {
    //                 return this.loaderService.loadingPresent();
    //             }),
    //             switchMap((loading) => {
    //                 return next.handle(req).pipe(
    //                     finalize(() => {
    //                         this.loaderService.loadingDismiss()
    //                     })
    //                 );
    //             })
    //         );
    // }

    }
}