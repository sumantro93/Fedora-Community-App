import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { Browser } from '../../providers/browser/browser';
import { FB } from '../../providers/fb/fb';
import { Tw } from '../../providers/tw/tw';

/*
  Generated class for the SocialPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/social/social.html',
  providers: [Browser, FB, Tw],
})
export class SocialPage {
  static get parameters() {
    return [[NavController], [Browser], [FB], [Tw]];
  }

  constructor(nav, browser, fb, tw) {
    this.nav = nav;
    this.browser = browser;
    this.fb = fb;
    this.tw = tw;

    this.posts = [];
    this.tweets = [];
    this.updates = [];

    this.USER = {
      FB: 'fedoraqa',
      TW: 'fedora_qa',
    };
  }

  ngOnInit() {
    this.updateUpdates();
  }

  updateUpdates() {
    this.fb
      .getPagePosts(this.USER.FB)
      .then(posts => {
        this.posts = posts;
        this.mergeUpdates();
      }).catch((err) => console.log(err + "kanika"));

    this.tw
      .getTimelineTweets(this.USER.TW)
      .then(tweets => {
        this.tweets = tweets;
        this.mergeUpdates();
      }).catch((err) => console.log(err));
  }

  mergeUpdates() {
    this.updates = _.concat(this.posts, this.tweets);
  }

  openUpdate(event) {
    this.browser.open(event.link);
  }

  shareUpdate(event) {
    SocialSharing.share(
      event.title,
      event.title,
      null,
      event.link
    );
  }
}
