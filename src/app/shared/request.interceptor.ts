import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
  } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { tap } from 'rxjs/operators';


@Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private httpNative: HTTP) {}
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const headers = {};
      const params = {};
      const body = request.body;

      const { method, url } = request;

      const platform = 'hybrid'; // Get this value from platform status  like android, ios...etc

      return (platform === 'hybrid'
        ? this.callNative(url, method, headers, params, body)
        : next.handle(request)
      ).pipe(
        tap(
          (event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) {
              if (event.type === 4) {
              }
            }
          },
          (error: any) => {
            console.log('error event', error);
            if (error instanceof HttpErrorResponse) {
            }
          }
        )
      );
    }
    callNative(url, method, headers, params, body) {
      return new Observable((ob) => {
        this.httpNative.setDataSerializer('json');

        switch (method) {
          case 'GET':
            this.httpNative.get(url, params, headers).then(
              (res) => this.successCallback( ob , res ),
              (err) => this.errorCallback(ob , err)
          );
            break;
          case 'POST':

            this.httpNative.post(url, body, params).then(
                (res) => this.successCallback( ob , res ),
                (err) => this.errorCallback(ob , err)
            );
            break;
          case 'PUT':
            this.httpNative.put(url, headers, params).then(
              (res) => this.successCallback( ob , res ),
              (err) => this.errorCallback(ob , err)
          );
            break;
          case 'DELETE':
            this.httpNative.delete(url, headers, params).then(
              (res) => this.successCallback( ob , res ),
              (err) => this.errorCallback(ob , err)
          );
            break;
        }
      });
    }
    successCallback(ob , res) {

      ob.next(new HttpResponse({ body: JSON.parse(res.data) }));
      ob.complete();
      return ob;
    }
    errorCallback(ob , response) {
      console.log(response);
      ob.error(new HttpErrorResponse(response));
      ob.complete();
      return ob;
    }
  }

export class InterceptorModule {}
