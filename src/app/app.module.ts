import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { NgxsModule } from '@ngxs/store';
import { UserStore } from './stores/user.store';
import { RemoteDevToolsProxy } from './../../devtool-hack/redux-devtool-hack';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// Register our remote devtools if we're on-device and not in a browser
// tslint:disable: no-string-literal
if (!window['devToolsExtension'] && !window['__REDUX_DEVTOOLS_EXTENSION__']) {
  const remoteDevToolsProxy = new RemoteDevToolsProxy({
    connectTimeout: 300000, // extend for pauses during debugging
    ackTimeout: 120000, // extend for pauses during debugging
    secure: false // dev only
  });

  // support both the legacy and new keys, for now
  window['devToolsExtension'] = remoteDevToolsProxy;
  window['__REDUX_DEVTOOLS_EXTENSION__'] = remoteDevToolsProxy;
  console.log(`window: `, window);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    NgxsModule.forRoot([UserStore]),
    NgxsReduxDevtoolsPluginModule.forRoot(), ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
