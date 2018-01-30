import {Component, ViewChild} from '@angular/core';
import {Http, ConnectionBackend, HTTP_PROVIDERS} from '@angular/http';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {IonicConfig} from './providers/ionic-config/ionic-config';
import {Request} from './providers/request/request';

import {MagazinePage} from './pages/magazine/magazine';
import {AskPage} from './pages/ask/ask';
import {CalendarPage} from './pages/calendar/calendar';
import {SocialPage} from './pages/social/social';
import {WomenPage} from './pages/women/women';
import {FirstPage} from './pages/first/first';

@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.platform = platform;

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: FirstPage },
      { title: 'Magazine', component: MagazinePage },
      { title: 'Social', component: SocialPage },
      { title: 'Ask', component: AskPage },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Women', component: WomenPage }

    ];

    this.rootPage = FirstPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [
  Http, ConnectionBackend, HTTP_PROVIDERS, Request, IonicConfig,
], {
  prodMode: window.hasOwnProperty('cordova'),
});
