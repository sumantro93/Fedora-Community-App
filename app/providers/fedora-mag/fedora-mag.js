import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

import { Request } from '../request/request';

/*
  Generated class for the FedoraMag provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FedoraMag {
  static get parameters(){
    return [[Request]]
  }

  constructor(request) {
    this.request = request;

    var API_ENDPOINT = 'https://fedoramagazine.org/wp-json/wp/v2';
    this.API = {
      base: [API_ENDPOINT],
      posts: [API_ENDPOINT, 'posts'],
    //  media_url: [API_ENDPOINT, 'media'],
    };

    this.posts = [];
    this.media_url = [];
  }

  getPosts() {
    if (!_.isEmpty(this.posts)) {
      return Promise.resolve(this.posts);
    }

    return new Promise((resolve, reject) => {
      this.request.get(this.API.posts)
        .then(data => {
          this.posts = _.map(data, p => {
            var excerpt = p.excerpt.rendered;
            var post = {
              id: p.id,
              link: p.guid.rendered,
              title: p.title.rendered,
              image: p.featured_media,
              excerpt: _.truncate(
                _.truncate(excerpt, {
                  length: excerpt.length,
                  separator: '<a', omission: ''
                }), { length: 150, separator: ' ' }
              ),
              content: p.content.rendered,
              date: p.date_gmt,
            };
            //image_url = func_url(post.image);
            return post;
          });

          return resolve(this.posts);
        }).catch(reject);
    });
  }
/*  getMedia_url(posts) {
    if (!_.isEmpty(this.media_url[posts])) {
      return Promise.resolve(this.media_url[posts]);
    }

    return new Promise((resolve, reject) => {
      this.request.get(this.API.media_url,{ posts : posts })
        .then(data => {
          this.media_url[posts] = _.map(data, i => {
          //  var excerpt = p.excerpt.rendered;
            var img_url = {
              img_id: i.id,
              img_link: i.guid.rendered,
            };
            //image_url = func_url(post.image);
            return post;
          });

          return resolve(this.posts);
        }).catch(reject);
    });
  }*/
}
