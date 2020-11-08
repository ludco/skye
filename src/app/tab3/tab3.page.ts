import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { UserUnLoad } from '../stores/user.store';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private store: Store, private authService: AuthService, private router: Router) {}

  signOut(){
    this.authService.removeUserToken();
    this.store.dispatch(new UserUnLoad());
    this.router.navigate(['']);
  }
}
