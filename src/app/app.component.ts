import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import '@codetrix-studio/capacitor-google-auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Store } from '@ngxs/store';

import { UserLoad } from './stores/user.store';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private store: Store,
    private authService: AuthService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.nativeStorage
      .getItem('userToken')
      .then(async (userToken) => {
        if (userToken.origin === 'FB'){
          const response = await fetch(`https://graph.facebook.com/${userToken.id}?fields=id,email,name,gender,link,picture&type=large&access_token=${userToken.token}`);
          const myJson = await response.json();
          this.store.dispatch(new UserLoad(this.authService.setFBUser(myJson)));
        }
        else if (userToken.origin === 'Google'){
          const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${userToken.token}`);
          this.store.dispatch(new UserLoad( this.authService.setGoogleUser(response)));
        }
        console.log('token found !', userToken);
      });

    });
  }
}
