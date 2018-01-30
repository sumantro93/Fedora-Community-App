import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CONFIG from '../../../ionic.config.json';

/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IonicConfig {
  constructor() {
    this.config = CONFIG;
  }

  get(key) {
    return this.config[key];
  }
}
