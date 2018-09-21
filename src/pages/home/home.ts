import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EosServiceProvider } from '../../providers/eos-service/eos-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance = 0;


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['pietropietro'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [    
    {data: [this.balance, 1000000, 0], label: 'VIN'}
  ];
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  

  constructor(public navCtrl: NavController, public eosServiceProvider:EosServiceProvider) {
    this.eosServiceProvider.getBalance('pietropietro', 'VIN').then(r=> {
      let ar = r[0].split('.');
      this.balance = ar[0];
      console.log(this.balance);
      
      this.barChartData = [{data: [this.balance, 100000, 0], label: 'VIN'}];
    });
  }

}
