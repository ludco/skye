import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/User';
import { UserLoad , UserUnLoad} from 'src/app/stores/user.store';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-fbsignin',
  templateUrl: './fbsignin.component.html',
  styleUrls: ['./fbsignin.component.scss'],
})
export class FBsigninComponent implements OnInit {

  user: User = new User();
  userinfo: any = null;
  usertoken: any = null;
  constructor(private router: Router,
              private store: Store,
              private nativeStorage: NativeStorage,
              private authService: AuthService
             ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  async getCurrentState() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    try {
      console.log(result);
      if (result && result.accessToken) {
        const user = { token: result.accessToken.token, userId: result.accessToken.userId };
        this.router.navigate(['']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async FBSignIn(): Promise<void> {

    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
      const FBuser = { token: result.accessToken.token, userId: result.accessToken.userId };
      const response = await fetch(`https://graph.facebook.com/${FBuser.userId}?fields=id,email,name,gender,link,picture&type=large&access_token=${FBuser.token}`);
      this.nativeStorage
          .setItem('userToken', {
            token: FBuser.token,
            id: FBuser.userId,
            origin : 'FB'
          });
      const myJson = await response.json();
      console.log('jsosn', myJson);
      this.store.dispatch(new UserLoad( this.authService.setFBUser(myJson)));
      this.router.navigate(['tabs/']);
      console.log('user :', this.user);
    }
  }

  async FBSignOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.store.dispatch(new UserUnLoad());
    this.router.navigate(['']);
  }

  async getUserInfo() {

  }
}
