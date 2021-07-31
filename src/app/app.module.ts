import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RequestsService} from './services/requests.service';
import {HttpClientModule} from '@angular/common/http';
import {ChannelsComponent} from './components/channels/channels.component';
import {VideoComponent} from './components/video/video.component';
import { SearchComponent } from './components/search/search.component';
import { EpgComponent } from './components/epg/epg.component';

@NgModule({
  declarations: [AppComponent, ChannelsComponent, VideoComponent, SearchComponent, EpgComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
