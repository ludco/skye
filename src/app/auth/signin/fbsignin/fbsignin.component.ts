import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-fbsignin',
  templateUrl: './fbsignin.component.html',
  styleUrls: ['./fbsignin.component.scss'],
})
export class FBsigninComponent implements OnInit {

  user: any = null;
  userinfo: any = null;
  usertoken: any = null;
  constructor(private router: Router) { }

  ngOnInit() {

   this.getUserInfo();


  }
  ionViewWillEnter() {
    this.getCurrentState();
  }

  async getCurrentState() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    try {
      console.log(result);
      if (result && result.accessToken) {
        const user = { token: result.accessToken.token, userId: result.accessToken.userId };
        const navigationExtras: NavigationExtras = {
          queryParams: {
            userinfo: JSON.stringify(user)
          }
        };
        this.router.navigate([''], navigationExtras);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async FBSignIn(): Promise<void> {

    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];




    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    console.log('KeyHash:', result.KeyHash);
    if (result && result.accessToken) {
      console.log('laaaaa', result);
      const user = { token: result.accessToken.token, userId: result.accessToken.userId };

      const response = await fetch(`https://graph.facebook.com/${result.accessToken.userId}?fields=id,email,name,gender,link,picture&type=large&access_token=${result.accessToken.token}`);
      const myJson = await response.json();
      this.user = myJson;
      console.log('user :', this.user);
      // this.router.navigate(['/home'], navigationExtras);
    }
  }

  async FBSignOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.router.navigate(['']);
  }

  async getUserInfo() {

  }
}
