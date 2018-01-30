import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

import { Request } from '../request/request';

/*
  Generated class for the FedoCal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FedoCal {
  static get parameters(){
    return [[Request]]
  }

  constructor(request) {
    this.request = request;

    var API_ENDPOINT = 'https://apps.fedoraproject.org/calendar/api/';
    this.API = {
      base: [API_ENDPOINT],
      calendars: [API_ENDPOINT, 'calendars'],
      meetings: [API_ENDPOINT, 'meetings'],
    };

    this.DATE_FORMAT = 'dddd, MMMM Do YYYY';
    this.TIME_FORMAT = 'h:mm a z';

    this.calendars = [];
    this.meetings = [];
  }

  getCalendars() {
    if (!_.isEmpty(this.calendars)) {
      return Promise.resolve(this.calendars);
    }

    return new Promise((resolve, reject) => {
      this.request.get(this.API.calendars)
        .then(data => {
          this.calendars = _.map(data.calendars, c => {
            return {
              real_name: c.calendar_name,
              display_name: _.camelCase(c.calendar_name),
              description: c.calendar_description,
              contact: c.calendar_contact,
            };
          });

          return resolve(this.calendars);
        }).catch(reject);
    });
  }

  getMeetings(calendar) {
    if (!_.isEmpty(this.meetings[calendar])) {
      return Promise.resolve(this.meetings[calendar]);
    }

    return new Promise((resolve, reject) => {
      this.request.get(this.API.meetings, { calendar: calendar })
        .then(data => {
          this.meetings[calendar] = _.map(data.meetings, m => {
            var meeting = {
              name: m.meeting_name,
              real_description: m.meeting_information,
              display_description: _.truncate(
                m.meeting_information,
                { length: 120, separator: ' ' }
              ),
              date_start: m.meeting_date,
              time_start: m.meeting_time_start,
              date_end: m.meeting_date_end,
              time_end: m.meeting_time_end,
              timezone: m.meeting_timezone,
              location: m.meeting_location,
            };

            var start = dateToMoment(
              meeting.date_start, meeting.time_start, meeting.timezone);
            meeting.moment_start = start;
            meeting.datetime_start = start.toDate();

            var end = dateToMoment(
              meeting.date_end, meeting.time_end, meeting.timezone);
            meeting.moment_end = end;
            meeting.datetime_end = end.toDate();

            meeting.display_date = start.format(this.DATE_FORMAT);
            meeting.display_time = start.format(this.TIME_FORMAT);

            return meeting;
          });

          return resolve(this.meetings[calendar]);
        }).catch(reject);
    });
  }
}


function dateToMoment(date, time, timezone) {
  return moment.tz(date + 'T' + time + 'Z', timezone).tz('Etc/UTC');
}
