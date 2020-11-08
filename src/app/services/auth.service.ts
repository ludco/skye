import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = new User();
constructor(private nativeStorage: NativeStorage, private router: Router){ }

  setFBUser(FBUser) {
    this.user.id = FBUser.id;
    this.user.name = FBUser.name;
    this.user.email = FBUser.email;
    return  this.user;
    }

  setGoogleUser(googleUser){
    this.user.id = googleUser.id;
    this.user.name = googleUser.givenName;
    this.user.email = googleUser.email;
    return  this.user;

  }

removeUserToken(){
    this.nativeStorage.remove('userToken').then(
      (data) => {
        console.log('disconnected');
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
