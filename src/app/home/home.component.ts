import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

import { ShortenerService } from './shortener.service';

interface URLCards {
  hostname: string;
  long_url: string;
  short_url: string;
  created_at: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  inputURL: any = '';
  URLCard: URLCards[] = [];

  constructor(private shortenerService: ShortenerService, private translateService: TranslateService) {}

  ngOnInit() {
    this.isLoading = true;
    /*
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
      */
  }

  showURL(url: string) {
    this.shortenerService.postURL(url).subscribe((result: any) => {
      console.log(result);
      this.URLCard.push({
        hostname: result.url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/)[1],
        long_url: result.url,
        short_url: environment.serverUrl + '/' + result.code,
        created_at: result.created_at,
      });
    });
    console.log(url);
  }
}
