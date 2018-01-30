import { Injectable } from '@angular/core';
import { InAppBrowser, SpinnerDialog, Toast } from 'ionic-native';

/*
  Generated class for the Browser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Browser {
  constructor() {
    this.browser = null;
  }

  startHandler() {
    SpinnerDialog.show();
  }

  stopHandler() {
    SpinnerDialog.hide();
  }

  errorHandler(error) {
    Toast.showShortBottom('Something went wrong.');
    this.browser.close();
    SpinnerDialog.hide();
    this.browser = null;
  }

  open(link) {
    var browser = InAppBrowser.open(encodeURI(link), '_blank');
    this.browser = browser;

    browser.addEventListener('loadstart', this.startHandler);
    browser.addEventListener('loadstop', this.stopHandler);
    browser.addEventListener('loaderror', this.errorHandler);
  }
}

