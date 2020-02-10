import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  songs: any[];
  img: string;
  text: string;
  name: string;
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ionViewDidEnter() {
    this.name = this.navParams.data.name;
    this.songs = this.navParams.data.songs;
    this.img = this.navParams.data.img.url;
    this.text = this.navParams.data.text;
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }

}
