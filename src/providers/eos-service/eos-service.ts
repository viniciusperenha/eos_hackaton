import { Injectable } from '@angular/core';
import * as Eos from 'eosjs';
import { EosTestnetConnectionConfig } from '../chains/eos-testnet-connection-config';

/*
  Generated class for the EosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EosServiceProvider {
  ecc: any;
  eos: any;
  admKey = "5Jdw1B5W9mQaTKxnL4R33WYTkurVgpBwmqcXwkpw5HUmBr8q9k1";
  admAccount = "lionteucu132";


  constructor() {
    let eosconfig = new EosTestnetConnectionConfig();
    eosconfig.setKeyProvider(this.admKey);
    this.eos = Eos(eosconfig);
    
    this.ecc = Eos.modules['ecc'];
  }

  generateKeyPair(): Promise<any> {
    return new Promise((resolve) => {
      this.ecc.randomKey().then(privateKey => {
        let keys = {
          privatek: privateKey,
          publick: this.ecc.privateToPublic(privateKey)
        };
        resolve(keys);
      });
    });
  }

  createAccount(nome, senha, keys){
    
    
    this.eos.transaction(tr => {
      tr.newaccount({
        creator: this.admAccount,
        name: nome,
        owner: keys.__zone_symbol__value.privatek,
        active: keys.__zone_symbol__value.publick
      })
    
      tr.buyrambytes({
        payer: this.admAccount,
        receiver: nome,
        bytes: 8192
      })          
    })
  }
}
