import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

/**
 * Generated class for the WalletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  projeto = false;
  keys: any = {};
  nome:string = "";
  senha:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public eosServiceProvider:EosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
  }

  getKeyPair(){
   this.keys = this.eosServiceProvider.generateKeyPair();
   console.log(this.keys);
  }

  createAccount(){
    this.eosServiceProvider.createAccount(this.nome, this.senha, this.keys);
  }

}
