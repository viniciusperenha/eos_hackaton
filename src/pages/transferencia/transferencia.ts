import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComunicacaoServiceProvider } from '../../providers/comunicacao-service/comunicacao-service';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

/**
 * Generated class for the TransferenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transferencia',
  templateUrl: 'transferencia.html',
})
export class TransferenciaPage {

  quantidade = 0;
  quantidadetoken = [];
  token = "";
  conta = "jaqueline123";
  
  
  contaObj = {};
  contaDestino = "uytrewq23edc";
  balance = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public comunicacaoServiceProvider:ComunicacaoServiceProvider, public eosServiceProvider:EosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaPage');
  }

  getBalance(){
    this.comunicacaoServiceProvider.getAccountObj(this.conta).subscribe(res => this.contaObj = res.json());        

    this.eosServiceProvider.getBalance(this.conta, this.token).then(r=> this.quantidadetoken = r);
    
  }

  confirmaTransferencia(){
    let arraybalance = this.quantidadetoken[0].split(' ');
    let fracao = arraybalance[0].split('.');
    let quantidadeformatada = this.quantidade+'.'+fracao[1]+' '+this.token;
    
    this.eosServiceProvider.transferAccounts(this.conta, this.contaDestino, quantidadeformatada).then((resp) => {
      console.log("EOS resp ", resp);
      this.getBalance();
    }); 
    
  }

}
