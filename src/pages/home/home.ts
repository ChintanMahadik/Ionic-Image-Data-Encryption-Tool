import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SendPage } from '../send/send';
import { RetrievePage } from '../retrieve/retrieve';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public base64Image:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.base64Image='./assets/imgs/main.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  send(){
this.navCtrl.push(SendPage);
  }

  retrieve(){
this.navCtrl.push(RetrievePage);
  }
}
