import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  async GoogleSignIn(){
    console.log('zut');
    try{
    const googleUser = await Plugins.GoogleAuth.signIn({
      value: 'profile email'
    });
    console.log(googleUser);
    }
    catch (e){ console.log('gogogo', e); }
  }
}
