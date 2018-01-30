import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

import { Request } from '../request/request';

/*
  Generated class for the AskFedora provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AskFedora {
  static get parameters(){
    return [[Request]]
  }

  constructor(request) {
    this.request = request;

    var API_ENDPOINT = 'https://ask.fedoraproject.org/en/api/v1';
    this.API = {
      base: [API_ENDPOINT],
      questions: [API_ENDPOINT, 'questions'],
    };

    this.questions = [];
  }

  getQuestions() {
    if (!_.isEmpty(this.questions)) {
      return Promise.resolve(this.questions);
    }

    return new Promise((resolve, reject) => {
      this.request.get(this.API.questions)
        .then(data => {
          this.questions = _.map(data.questions, q => {
            var question = {
              id: q.id,
              title: q.title,
              link: q.url,
              answers: q.answer_count,
              content: q.summary,
              timestamp: q.added_at,
              tags:q.tags,
              view:q.view_count,
              vote:q.score,
            };
            return question;
          });

          return resolve(this.questions);
        }).catch(reject);
    });
  }
}
