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

}
