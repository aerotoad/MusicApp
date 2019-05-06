import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private song: any;

  constructor() { }

  set(song) {
    this.song = song;
  }

  get() {
    return this.song;
  }

  unset() {
    this.song = undefined;
  }
}
