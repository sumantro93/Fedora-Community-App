import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

import { Request } from '../request/request';

/*
  Generated class for the Tw provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Tw {
  static get parameters(){
    return [[Request]]
  }

  constructor(request) {
    this.request = request;

    var API_ENDPOINT = 'https://api.twitter.com/1.1/';
    this.API = {
      base: [API_ENDPOINT],
      statuses: [API_ENDPOINT, 'statuses'],
    }
    this.API.timeline = this.API.statuses.concat(['user_timeline.json']);

    this.BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAMmWwAAAAAAA9tGRvIFnIR8XYXmIFTFaEGagjX0%3Dup2JDIi9hjbCJKGaEGDqkLMtYSGumkyMa6SbwXx0FMB1vOlvN0';
  }

  getTimelineTweets(user) {
    return new Promise((resolve, reject) => {
      this.request.get(
        this.API.timeline, { screen_name: user },
        { 'Authorization': 'Bearer ' + this.BEARER_TOKEN }
      ).then(data => {
          var tweets = _.map(data, t => {
            return {
              id: t.id,
              link: 'https://twitter.com/statuses/' + t.id_str,
              content: t.text,
              origin: 'twitter',
            };
          });
          return resolve(tweets);
      }).catch(reject);
    });
  }
}

