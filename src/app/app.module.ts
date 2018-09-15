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

@NgModule({
  declarations: [
    MyApp,
    HomePage,    
    TransferenciaPage,
    WalletsPage,
    TokenPage,
    ExchangePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,    
    TransferenciaPage,
    WalletsPage,
    TokenPage,
    ExchangePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
