import { Component } from '@angular/core';
import { AstroService } from '../services/astro.service';
import {sunsigns} from '../shared/datas';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sunsigns = sunsigns;
  horoscop = '';

  constructor(private astroService: AstroService) {}

  openSign(sign){
    this.astroService.getHoroscop(sign).subscribe(res => {this.horoscop = res.horoscope; console.log(this.horoscop); });
  }
}
