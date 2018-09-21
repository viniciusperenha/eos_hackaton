import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

/**
 * Generated class for the TokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-token',
  templateUrl: 'token.html',
})
export class TokenPage {

  conta = "jaqueline123";
  quantidade = 0;
  tokemname = "VIN";
  balance = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public eosServiceProvider:EosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenPage');
  }

  emitirTokens(){
    this.balance = this.eosServiceProvider.emitirToken(this.conta, this.quantidade, this.tokemname);
  }

}
