import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { Browser } from '../../providers/browser/browser';
import { AskFedora } from '../../providers/ask-fedora/ask-fedora';

/*
  Generated class for the AskPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/ask/ask.html',
  providers: [Browser, AskFedora],
})
export class AskPage {
  static get parameters() {
    return [[NavController], [Browser], [AskFedora]];
  }

  constructor(nav, browser, askfedora) {
    this.nav = nav;
    this.browser = browser;
    this.askfedora = askfedora;

    this.questions = [];
  }

  ngOnInit() {
    this.updateQuestions();
  }

  updateQuestions() {
    this.askfedora
      .getQuestions()
      .then(questions => {
        this.questions = questions;
      });
  }

  openQuestion(event) {
    this.browser.open(event.link);
  }

  shareQuestion(event) {
    SocialSharing.share(
      event.title,
      event.title,
      null,
      event.link
    );
  }
}
