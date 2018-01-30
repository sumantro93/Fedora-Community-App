import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { InAppBrowser, SpinnerDialog, Toast } from 'ionic-native';

import * as _ from 'lodash';
import * as querystring from 'query-string';

import { IonicConfig } from '../ionic-config/ionic-config';

/*
  Generated class for the Request provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Request {
  static get parameters(){
    return [[Http], [IonicConfig]]
  }

  constructor(http, config) {
    this.http = http;
    this.config = config;
    this.proxies = config.get('proxies');

    this.isCordova = window.hasOwnProperty('cordova');
    this.isLiveReload = false;

    this.http
      .get('http://localhost:8100')
      .subscribe(
        res => this.isLiveReload = !_.isEmpty(res),
        err => console.log(this.useProxy())
      );
  }

  startHandler() {
    SpinnerDialog.show();
  }

  stopHandler() {
    SpinnerDialog.hide();
  }

  errorHandler(error, reject) {
    Toast.showShortBottom('Something went wrong.');
    SpinnerDialog.hide();
    return reject(error);
  }

  useProxy() {
    if (this.isLiveReload || !this.isCordova) {
      return true;
    } else {
      return false;
    }
  }

  buildURL(parts) {
    return _.map(
      parts, part => _.trim(part, '/')
    ).join('/');
  }

  processURL(urlParts) {
    var url = this.buildURL(urlParts);

    var finalURL = url;

    if (this.useProxy()) {
      _.forEach(this.proxies, proxy => {
        if (_.startsWith(url, proxy.proxyUrl)) {
          finalURL = _.replace(
            url, proxy.proxyUrl, proxy.path
          );
          return false;
        }
      });

      finalURL = _.trim(finalURL + '/');
    }

    return finalURL;
  }

  get(urlParts, query, headers = {}) {
    var url = this.processURL(urlParts);

    if (!_.isEmpty(query)) {
      url = _.trimEnd(url, '/');
      var query = querystring.stringify(query);
      url += '?' + query;
    }

    var options = new RequestOptions({
      headers: new Headers(headers)
    });

    this.startHandler();
    return new Promise((resolve, reject) => {
      this.http
        .get(url, options)
        .map(res => res.json() || {})
        .subscribe(
          response => resolve(response),
          error => this.errorHandler.bind(this, error, reject),
          this.stopHandler
        );
    });
  }

  post(urlParts, data = {}, headers = {}) {
    var url = this.processURL(urlParts);
    var body = JSON.stringify(data);

    _.defaults(headers, {
      'Content-Type': 'application/json'
    });

    var options = new RequestOptions({
      headers: new Headers(headers)
    });

    this.startHandler();
    return new Promise((resolve, reject) => {
      this.http
        .post(url, body, options)
        .map(res => res.json() || {})
        .subscribe(
          response => resolve(response),
          error => this.errorHandler.bind(this, error, reject),
          this.stopHandler
        );
    });
  }
}

