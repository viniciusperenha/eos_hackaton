import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ComunicacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComunicacaoServiceProvider {
  host = "http://jungle.cryptolions.io:18888";
  //host = "https://jungle.eosio.cr:443";
  hosthistory = this.host+"/v1/history";
  hostproducer = this.host+"/v1/producer";  
  hostchain = this.host+"/v1/chain";
  smartContract = "eosio.token";


  constructor(public http: Http) {

  }

  errorHandler = error => {
    return Promise.reject(error.json());
  }

  getInfo() {
    return this.http.post(`${this.hostchain}/get_info`, {});
  }

  getGreyList() {
    return this.http.post(`${this.hostchain}/get_info`, {});
  }

  getAccount(idconta): Promise<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post(`${this.hostchain}/get_account`, JSON.stringify({ 'account_name': idconta }), { headers: header })
      .toPromise().then(response => response.json())
      .catch(this.errorHandler);
  }

  getAccountObj(idconta) {
    return this.http.post(`${this.hostchain}/get_account`, JSON.stringify({ 'account_name': idconta }));
  }

  getAccountCodeAndAbi(idconta) {
    return this.http.post(`${this.hostchain}/get_raw_code_and_abi`, JSON.stringify({ 'account_name': idconta }));
  }

  getAccountCode(idconta) {
    let header = new Headers();
    header.append('Access-Control-Allow-Headers', '*');
    return this.http.post(`${this.hostchain}/get_code`, JSON.stringify({ 'account_name': idconta }), {headers:header});
  }

  getKeyAccounts(idconta) {
    return this.http.post(`${this.hosthistory}/get_key_accounts`, JSON.stringify({ 'public_key': idconta }));
  }
  
  getActions(idconta){
    return this.http.post(`${this.hosthistory}/get_actions`, JSON.stringify({ 'account_name': idconta, 'pos':'0', 'offset':200 }));
  }

  getBalance(idconta, moeda){
    return this.http.post(`${this.hostchain }/get_currency_balance`, JSON.stringify({ 'code': this.smartContract, 'account': idconta, 'symbol':moeda}));
  }
  n

}
