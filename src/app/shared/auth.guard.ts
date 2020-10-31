import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private nativeStorage: NativeStorage) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      this.nativeStorage.getItem('skyeToken').then(
        (data) => {
          console.log(data);
          resolve(true);
        },
        (error) => {
          console.error(error);

          this.router.navigate(['/auth'], {
            queryParams: { returnUrl: state.url },
          });
          resolve(false);
        }
      );
    });
  }
}
