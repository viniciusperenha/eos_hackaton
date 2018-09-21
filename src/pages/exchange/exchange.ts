import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {

  conta = "pietropietro";
  quantidade = 0;
  quantidadetoken = [];
  token = "";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eosServiceProvider:EosServiceProvider) {
  }

  getBalance(){    
    this.eosServiceProvider.getBalance(this.conta, this.token).then(r=> this.quantidadetoken = r);
   
  }

  burnTokens(){
    let arraybalance = this.quantidadetoken[0].split(' ');
    let fracao = arraybalance[0].split('.');
    let quantidadeformatada = this.quantidade+'.'+fracao[1]+' '+this.token;
    
    this.eosServiceProvider.burnToken(quantidadeformatada);
  }

}
