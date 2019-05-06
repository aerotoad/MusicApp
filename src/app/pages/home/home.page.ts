import { Component } from '@angular/core';
import { YoutubeSearchService } from './../../services/youtube-search.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private videos: Array<any>;
  private skeletonElements = [0, 1, 2, 3, 4];

  private selectedSong: any = {};
  private selectedSongUrl: SafeUrl;

  constructor(
    private youtubeSearch: YoutubeSearchService,
    private domSanitizer: DomSanitizer,
  ) {

  }

  async ionViewDidEnter() {
    this.videos = await this.youtubeSearch.searchByTitle('talco bella ciao');
    console.log(this.videos);
  }

  selectSong(song: any) {
    this.selectedSong = song;
    const youtubeUrl = 'https://www.youtube.com/watch?v=' + song.id;
    this.selectedSongUrl = this.domSanitizer.bypassSecurityTrustUrl('http://apps.ene.es:23700/get-audio?url=' + youtubeUrl);
  }

}
