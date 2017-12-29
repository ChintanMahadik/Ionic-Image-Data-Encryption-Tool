import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import { MyApp } from './app.component';
import { SendPage } from '../pages/send/send';
import {FIREBASE_CONFIG} from './app.firebase.config';
import{Camera} from '@ionic-native/camera';
import {EmailComposer} from '@ionic-native/email-composer'
import { HomePage } from '../pages/home/home';
import { RetrievePage } from '../pages/retrieve/retrieve';
import {File} from '@ionic-native/file'
import {FileChooser} from '@ionic-native/file-chooser'

@NgModule({
  declarations: [
    MyApp,
    SendPage,
    HomePage,
    RetrievePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SendPage,
    HomePage,
    RetrievePage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    EmailComposer,
    File,
    FileChooser
  ]
})
export class AppModule {}
