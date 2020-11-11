import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sunsign',
  templateUrl: './sunsign.component.html',
  styleUrls: ['./sunsign.component.scss'],
})
export class SunsignComponent implements OnInit {

  horoscope = '';
  sign = '';
  imgUri  = '';

  constructor(private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.horoscope) {
        console.log('zut', params);
        this.horoscope = params.horoscope;
        this.sign = params.sign;
        this.imgUri = `assets/sunsigns/${params.sign}.png`;
      }
    });

  }

  goBack(){
    this.router.navigate(['/tabs/']);
  }
}
