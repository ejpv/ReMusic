import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  artists: any[] = [];
  albums: any[] = [];
  songs: any[] = [];
  song: {
    preview_url: string;
    name: string;
  };
  img: any[] = [];
  color = '';
  nameIcon = 'play';
  currentSong = new Audio();
  newTime = 0;
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  constructor(private musicService: PlatziMusicService, private modalController: ModalController, private loadingCtrl: LoadingController)
  { }

  ionViewDidEnter() {
    this.loader('Cargando');
    this.musicService.getNewReleases().then((newReleases) => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(
        e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(
        e => e.album_type === 'album');
    });
  }

  async showSongArtist(artist) {
    this.loader('Cargando Artista');
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        name: artist.name,
        img: artist.images[0],
        text: ' - Top Tracks'
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });

    return await modal.present();
  }

  async showSongAlbum(album) {
    this.loader('Cargando Album');
    const songs = await this.musicService.getAlbumTracks(album.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.items,
        name: album.name,
        img: album.images[0],
        text: ' - Tracks'
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });

    return await modal.present();
  }

  playOrPause() {
    if (this.nameIcon === 'play') {
      this.currentSong = new Audio(this.song.preview_url);
      this.currentSong.play();
      this.currentSong.addEventListener('timeupdate', () => {
        this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
      });
      this.nameIcon = 'pause';
    } else {
      this.currentSong.pause();
      this.nameIcon = 'play';
    }
  }

  likeOrNot() {
    if (this.color === '') {
      this.color = 'success';
    } else {
      this.color = '';
    }
  }

  parseTime(time: number) {
    if (time) {
      console.log(this.song);
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }

  async loader(mensaje) {
    let loading = await this.loadingCtrl.create({
      message: mensaje,
      spinner: 'dots'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 4000);
  }
}
