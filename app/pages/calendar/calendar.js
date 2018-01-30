import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Calendar } from 'ionic-native';

import { FedoCal } from '../../providers/fedo-cal/fedo-cal';

/*
  Generated class for the CalendarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
  providers: [FedoCal],
})
export class CalendarPage {
  static get parameters() {
    return [[NavController], [FedoCal]];
  }

  constructor(nav, fedocal) {
    this.nav = nav;
    this.fedocal = fedocal;

    this.calendars = [];
    this.meetings = [];

    var DEFAULT_CALENDAR = 'QA';
    this.selectedCalendar = DEFAULT_CALENDAR;
  }

  ngOnInit() {
    this.updateCalendars();
    this.updateMeetings();
  }

  updateCalendars() {
    this.fedocal
      .getCalendars()
      .then(calendars => {
        this.calendars = calendars;
      });
  }

  updateMeetings() {
    this.fedocal
      .getMeetings(this.selectedCalendar)
      .then(meetings => {
        this.meetings = meetings;
      });
  }

  addToCalendar(event) {
    Calendar.createEventInteractively(
      event.name,
      event.location,
      event.real_description,
      event.datetime_start,
      event.datetime_end
    );
  }
}
