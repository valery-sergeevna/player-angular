import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from './services/requests.service';
import {BodyRequestsService} from './services/bodyRequests.service';
import Hls from 'hls.js';
import {ChannelsComponent} from './components/channels/channels.component';
import {VideoComponent} from './components/video/video.component';
import {EpgComponent} from './components/epg/epg.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild(ChannelsComponent) childChannel: ChannelsComponent
  @ViewChild(VideoComponent) childVideo: VideoComponent

  authToken: string = null;
  channels: [] = [];
  stream: string = null;
  streamId: number = null;
  channelId: number = null;
  updateStream: string = null;
  updateStreamTimerId: any = null;
  filteredList: [];
  epgList: {} = {}

  constructor(
    private reqService: RequestsService,
    private bodyReq: BodyRequestsService) {
  }

  ngOnInit(): void {
      this.reqService.mainRequestPost('Auth', this.bodyReq.authReq)
        .subscribe((res) => {
            this.authToken = res.auth_token;
            console.log(this.authToken);
            this.childChannel.getTvChannels(this.authToken)
            this.openStream(45);
        }, error => {
          console.log(error, 'wrong user');
          });
  }

  openStream(id: number) {
    this.reqService.mainRequestPost('OpenStream',this.bodyReq.sendBodyStream(this.authToken,id))
      .subscribe((res) => {
        this.stream = `https://${res.http_stream.host.address + res.http_stream.url}`;
        this.streamId = res.stream_id;
        this.updateStream = res.update_interval;
        this.channelId = id;
        this.childVideo.loadVideoStream(this.stream);
        this.updateStreamFunction(this.streamId);
      }, error => {
        console.log(error, 'failed req');
      });
  }

  updateStreamFunction(idStream: number){
    if(!this.updateStreamTimerId){
      this.updateStreamTimerId = this.reqService.mainRequestPost('UpdateStream',this.bodyReq.sendBodyStreamUpdate(this.authToken, idStream))
        .subscribe((res) => {
          if(res.result === 'ReopenStream'){
            this.manageStream(this.channelId);
          }
        }, error => {
          console.log(error, 'failed req');
        });
    }
  }

  manageStream(channel_id: number){
    if(this.stream){
      this.closeStream(this.streamId);
      this.openStream(channel_id);
    }else {
      this.openStream(channel_id);
    }
  }

  closeStream(idStream: number) {
    this.reqService.mainRequestPost('CloseStream',this.bodyReq.sendBodyStreamUpdate(this.authToken, idStream))
      .subscribe((res) => {
        this.stream = null;
        this.streamId = null;
        this.updateStream = null;
        this.updateStreamTimerId = null;
      }, error => {
        console.log(error, 'failed close');
      });
  }

}
