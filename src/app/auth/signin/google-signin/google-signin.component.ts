import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/models/User';
import { UserLoad } from 'src/app/stores/user.store';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent implements OnInit {

  user: User = new User();
  constructor(private router: Router,
              private store: Store,
              private authService: AuthService,
              private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  async GoogleSignIn(){
    try{
    const googleUser: any = await Plugins.GoogleAuth.signIn({
      value: 'profile email'
    });
    console.log(googleUser);
    this.nativeStorage
          .setItem('userToken', {
            token: googleUser.idToken,
            id: googleUser.userId,
            origin : 'Google'
          });
    this.store.dispatch(new UserLoad( this.authService.setGoogleUser(googleUser)));
    this.router.navigate(['tabs/']);

    }
    catch (e){ console.log('gogogo', e); }
  }
}
