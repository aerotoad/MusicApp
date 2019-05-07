import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SongService } from '../../services/song.service';

declare var apikeys;

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage {

  private song: any;
  private streamUrl: SafeUrl;
  private loadComplete = false;
  private progress = 0;
  private currentTime = '0:00';
  private duration = '0:00';
  private paused = false;

  constructor(
    private router: Router,
    private songService: SongService,
    private domSanitizer: DomSanitizer,
  ) { }

  ionViewDidEnter() {
    this.song = this.songService.get();
    this.generateStreamUrl();
  }

  generateStreamUrl() {
    const youtubeUrl = 'https://www.youtube.com/watch?v=' + this.song.id;
    this.streamUrl = this.domSanitizer.bypassSecurityTrustUrl(apikeys.SERVER_URL + youtubeUrl);
  }

  startedPlaying() {
    this.loadComplete = true;
    const player = document.getElementById('playerAudioElement') as HTMLAudioElement;
    this.duration = this.formatTime((player.duration).toFixed(0));
  }

  updateTime() {
    const player = document.getElementById('playerAudioElement') as HTMLAudioElement;
    this.currentTime = this.formatTime((player.currentTime).toFixed(0));

    this.progress = parseFloat((player.currentTime / player.duration).toFixed(4));
  }

  playPause() {
    const player = document.getElementById('playerAudioElement') as HTMLAudioElement;
    if (this.paused) {
      player.play();
      this.paused = false;
    } else {
      player.pause();
      this.paused = true;
    }
  }

  formatTime(seconds) {
    const h = parseFloat((Math.floor(seconds / 3600)).toFixed(2));
    const m = parseFloat((Math.floor((seconds % 3600) / 60)).toFixed(2));
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(a => a)
      .join(':');
  }

}
