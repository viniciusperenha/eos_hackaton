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
  //admKey = "5Jdw1B5W9mQaTKxnL4R33WYTkurVgpBwmqcXwkpw5HUmBr8q9k1";
  admKey = "5JgNNafJpcimV8iseZRG9tQjSg2MBw7TSW8RwxcQ6Wx8XW6sSCV";
  admAccount = "pietropietro";
  eosconfig: EosTestnetConnectionConfig;


  constructor() {
    this.eosconfig = new EosTestnetConnectionConfig();
    this.eosconfig.setKeyProvider(this.admKey);
    this.eos = Eos(this.eosconfig);

    this.ecc = Eos.modules['ecc'];
  }

  generateKeyPair(nome): Promise<any> {
    return new Promise((resolve) => {
      this.ecc.randomKey().then(privateKey => {
        let keys = {
          privatek: privateKey,
          publick: this.ecc.privateToPublic(privateKey)
        };
        resolve(keys);
        this.createAccount(nome, keys);
      });
    });
  }

  createAccount(nome, keys) {
    this.eos.transaction(tr => {
      tr.newaccount({
        creator: this.admAccount,
        name: nome,
        owner: keys.publick,
        active: keys.publick
      });

      tr.buyrambytes({
        payer: this.admAccount,
        receiver: nome,
        bytes: 8192
      });
      tr.delegatebw({
        from: this.admAccount,
        receiver: nome,
        stake_net_quantity: '10.0000 EOS',
        stake_cpu_quantity: '10.0000 EOS',
        transfer: 0
      })

    }).then((resp) => {
      console.log("EOS resp ", resp);
    });
  }

  transferAccounts(origem, destino, quantidade) {
    //return this.eos.transfer(origem, destino, quantidade, '');
    return this.eos.transaction(
      {
        // ...headers,
        // context_free_actions: [],
        actions: [
          {
            account: 'pietropietro',
            name: 'transfer',
            authorization: [{
              actor: origem,
              permission: 'active'
            }],
            data: {
              from: origem,
              to: destino,
              quantity: quantidade,
              memo: ''
            }
          }
        ]
      }
      // config -- example: {broadcast: false, sign: true}
    )
    
    
  }

  getBalance(conta, tokenname){
    return this.eos.getCurrencyBalance(this.eosconfig.mainContractName, conta, tokenname);
  }

  emitirToken(conta, quantidade, tokenname){
    this.eos.transaction(this.admAccount, myaccount => {
     
      // Issue some of the max supply for circulation into an arbitrary account
      myaccount.issue(this.admAccount, quantidade+'.000 '+tokenname, 'issue')
    });
     
    const balance = this.getBalance(conta, tokenname);
    return balance;
  }

  burnToken(quantidade){
    this.eos.transaction(

      {        
        actions: [
          {
            account: 'pietropietro',
            name: 'burn',
            authorization: [{
              actor: this.admAccount,
              permission: 'active'
            }],
            data: {              
              quantity: quantidade,
              memo: ''
            }
          }
        ]
      }

    );
  }

}
