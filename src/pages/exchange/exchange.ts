import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComunicacaoServiceProvider } from '../../providers/comunicacao-service/comunicacao-service';
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

  quantidadeeos = 0;
  quantidadejungle = 0;
  conta = "lioninjungle";
  saldoeos = "";
  saldojungle = "";
  contaObj = {};
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public comunicacaoServiceProvider:ComunicacaoServiceProvider) {
  }

 

  consultaSaldo(){
    /*
    this.comunicacaoServiceProvider.getAccountObj(this.conta).subscribe(res => this.contaObj = res.json());
    this.comunicacaoServiceProvider.getBalance(this.conta, 'EOS').subscribe(res => {
      let resultado = res.json();
      let valorsplit = resultado[0].split(' ');
      this.saldoeos = valorsplit[0];
      
    });
    this.comunicacaoServiceProvider.getBalance(this.conta, 'JUNGLE').subscribe(res => {
      let resultado = res.json();
      let valorsplit = resultado[0].split(' ');
      this.saldojungle = valorsplit[0];
    });
    */
   
  }

}
