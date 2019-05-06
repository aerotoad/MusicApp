import { Component } from '@angular/core';
import { YoutubeSearchService } from './../../services/youtube-search.service';
import { Router } from '@angular/router';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private songs: Array<any>;
  private skeletonElements = [0, 1, 2, 3, 4];

  constructor(
    private youtubeSearch: YoutubeSearchService,
    private router: Router,
    private songService: SongService,
  ) {

  }

  async ionViewDidEnter() {
    this.songs = await this.youtubeSearch.searchByTitle('talco bella ciao');
  }

  playSong(song: any) {
    this.songService.set(song);
    this.router.navigateByUrl('/player');
  }

}
