import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {BodyRequestsService} from '../../services/bodyRequests.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent implements OnInit{

  @Input() channels: []
  @Input() epgList: []
  @Input() filteredList: []
  @Output() manageStream: EventEmitter<any> = new EventEmitter();

  filtered: [];
  epgChannel: [] = []

  constructor(
    private reqService: RequestsService,
    private bodyReq: BodyRequestsService
  ) { }

  ngOnInit(): void {
    this.filtered = this.filteredList && this.filteredList.length ? this.filteredList : this.channels;
  }

  getTvChannels(token){
    this.reqService.mainRequestPost('GetChannels',this.bodyReq.sendBodyTvReq(token))
      .subscribe((res) => {
        this.channels = res.list;
        console.log(this.channels);
        this.reqService.mainRequestGet(res.epg_url)
          .subscribe(data => {
            this.epgList = data.epg;
            this.epgChannel = data.epg[res.list[0].id];
            console.log('epg',this.epgChannel);
          })
      }, error => {
        console.log(error, 'failed req');
      });
  }

}
