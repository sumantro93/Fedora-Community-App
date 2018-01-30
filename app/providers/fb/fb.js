import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Facebook } from 'fb';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';

/*
  Generated class for the Fb provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FB {
  constructor() {
    var FB_CONFIG = {
      accessToken: '1242536905766029|8btZ0cyO3iDWxl92d6pgj0xC3a8',
      xfbml: true,
      version: 'v2.6'
    };

    this.fb = new Facebook(FB_CONFIG);
  }

  api(urlParts) {
    return new Promise((resolve, reject) => {
      this.fb.api(urlParts.join('/'), res => {
        if (!res || res.error) {
          return reject(res);
        } else {
          return resolve(res);
        }
      });
    });
  }

  getPagePosts(page) {
    return new Promise((resolve, reject) => {
      this.api([page, 'posts']).then(res => {
        var posts = _.compact(_.map(res.data, p => {
          var post = {
            id: p.id,
            link: 'https://facebook.com/' + p.id,
            content: p.message,
            origin: 'facebook',
          };

          if (_.isEmpty(post.content)) {
            return null;
          } else {
            return post;
          }
        }));

        return resolve(posts);
      }).catch(reject);
    });
  }
}
