import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var apikeys;

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  private apiKey = apikeys.YOUTUBE_API_KEY;
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(
    private http: HttpClient,
  ) { }

  searchByTitle(query: string): Promise<any> {
    return new Promise((resolve, reject) => {

      const params: string = [
        `q=${encodeURIComponent(query)}`,
        `key=${this.apiKey}`,
        `part=snippet`,
        `type=video`,
        `maxResults=10`
      ].join('&');
      const queryUrl = `${this.apiUrl}?${params}`;

      this.http.get(queryUrl)
        .subscribe((result: any) => {
          const resultArray =  result.items.map((item) => {
            const newObj = {
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url
            };
            return newObj;
          });
          resolve(resultArray);
        });

    });
  }
}
