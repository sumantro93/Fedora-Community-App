import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { Browser } from '../../providers/browser/browser';
import { FedoraMag } from '../../providers/fedora-mag/fedora-mag';

/*
  Generated class for the MagazinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/magazine/magazine.html',
  providers: [Browser, FedoraMag],
})
export class MagazinePage {
  static get parameters() {
    return [[NavController], [Browser], [FedoraMag]];
  }

  constructor(nav, browser, fedoramag) {
    this.nav = nav;
    this.browser = browser;
    this.fedoramag = fedoramag;

    this.posts = [];
    //console.log("hiiiiiiiiiiiii "+post.image);
  }

  ngOnInit() {
    this.updatePosts();
  }

    //func_url(id) {
      //var API2='https://fedoramagazine.org/wp-json/wp/v2/media/'+id;
    //  console.log("hiiiiiiiiiiiii "+API2);
  //  }
  updatePosts() {
    this.fedoramag.getPosts().then(posts => {
      this.posts = posts;
    });
  }

  openPost(event) {
    this.browser.open(event.link);
  }

  sharePost(event) {
    SocialSharing.share(
      event.title, event.title,
      null, event.link
    );
  }
}
