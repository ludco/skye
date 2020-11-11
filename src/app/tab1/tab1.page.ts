import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AstroService } from '../services/astro.service';
import {sunsigns} from '../shared/datas';
import { SunsignComponent } from '../tab1/sunsign/sunsign.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sunsigns = sunsigns;
  horoscop = '';

  constructor(private astroService: AstroService, private router: Router) {}

  openSign(sign){
    this.astroService.getHoroscop(sign).subscribe(res => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
         horoscope : res.horoscope,
         sign : res.sunsign
        }
      };
      this.router.navigate(['tabs/tab1/sign'], navigationExtras );
    });
  }


}
