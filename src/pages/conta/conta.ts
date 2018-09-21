import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

/**
 * Generated class for the ContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html',
})
export class ContaPage {

  projeto = false;
  keys: any = {};
  nome:string = "";
  senha:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public eosServiceProvider:EosServiceProvider) {
  }



  getKeyPair(){
    this.keys = this.eosServiceProvider.generateKeyPair(this.nome);
    
   }

}
