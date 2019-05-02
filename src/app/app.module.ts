import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VendasProvider } from '../providers/vendas/vendas';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireDatabaseModule } from "angularfire2/database";
import config from "./firebase.config"; //https://console.firebase.google.com/project/curso-pbh-ionic/overview?hl=pt-br
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { CadpacotesPageModule } from '../pages/cadpacotes/cadpacotes.module';
import { PacotesProvider } from '../providers/pacotes/pacotes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    CadpacotesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VendasProvider,
    PacotesProvider
  ]
})
export class AppModule {}
