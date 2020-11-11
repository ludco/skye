import { Component, OnInit } from '@angular/core';
import { Shake } from '@ionic-native/shake/ngx';
import {responses} from '../shared/datas';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  response = '';

  constructor(
    private shake: Shake,
    public modalController: ModalController) {}

  ngOnInit() {
    const watch = this.shake.startWatch(60).subscribe(() => {
      console.log('shaked!');
      const chance = this.getRandomInt(responses.length);
      this.response =  responses[chance];
      });

    // watch.unsubscribe();
  }

getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: HoroscopPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



}
