import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TransferenciaPage } from '../pages/transferencia/transferencia';
import { WalletsPage } from '../pages/wallets/wallets';
import { ChartsModule } from 'ng2-charts';
import { TokenPage } from '../pages/token/token';
import { ExchangePage } from '../pages/exchange/exchange';
import { ComunicacaoServiceProvider } from '../providers/comunicacao-service/comunicacao-service';
import { HttpModule } from '@angular/http';
import { EosServiceProvider } from '../providers/eos-service/eos-service';
import { ContaPage } from '../pages/conta/conta';
import { SaldoTokenPipe } from '../pipes/saldo-token/saldo-token';


@NgModule({
  declarations: [
    MyApp,
    HomePage,    
    TransferenciaPage,
    WalletsPage,
    TokenPage,
    ExchangePage,
    ContaPage,
    SaldoTokenPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,    
    TransferenciaPage,
    WalletsPage,
    TokenPage,
    ExchangePage,
    ContaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComunicacaoServiceProvider,
    EosServiceProvider
  ]
})
export class AppModule {}
