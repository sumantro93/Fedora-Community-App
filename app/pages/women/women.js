import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { Browser } from '../../providers/browser/browser';
import { FedoraMag } from '../../providers/fedora-mag/fedora-mag';
import {MagazinePage} from '../magazine/magazine';
import {AskPage} from '../ask/ask';
import {CalendarPage} from '../calendar/calendar';
import {SocialPage} from '../social/social';

/*
  Generated class for the MagazinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/women/women.html',
  providers: [Browser, FedoraMag],
})
export class WomenPage {
  static get parameters() {
    return [[NavController], [Browser], [FedoraMag]];
  }

  constructor(nav, browser, fedoramag) {
    this.nav = nav;
    this.browser = browser;
    this.fedoramag = fedoramag;

    this.posts = [];


  }

  ngOnInit() {
    this.updatePosts();
  }

  updatePosts() {
    this.fedoramag.getPosts().then(posts => {
      this.posts = posts;
    });
  }

  openPost(event) {
    this.browser.open(event.link);
  }

  openMag(){
      this.nav.push(MagazinePage);
    }
  openAsk(){
      this.nav.push(AskPage);
    }
  openSocial(){
      this.nav.push(SocialPage);
    }
  openCal(){
      this.nav.push(CalendarPage);
    }




  login(event){

  }

  sharePost(event) {
    SocialSharing.share(
      event.title, event.title,
      null, event.link
    );
  }
}
