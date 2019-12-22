import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ModalPagePageModule } from './modal-page/modal-page.module';
import {OrderPageModule} from './order/order.module';

import { SMS } from '@ionic-native/sms/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule ,IonicModule.forRoot(), AppRoutingModule, ModalPagePageModule, OrderPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SMS,
    Vibration,
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
