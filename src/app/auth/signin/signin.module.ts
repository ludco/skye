import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { ManualSigninComponent } from './manual-signin/manual-signin.component';
import { FBsigninComponent } from './fbsignin/fbsignin.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninPageRoutingModule
  ],
  declarations: [
    SigninPage,
    ManualSigninComponent,
    FBsigninComponent,
    GoogleSigninComponent, ]
})
export class SigninPageModule {}
