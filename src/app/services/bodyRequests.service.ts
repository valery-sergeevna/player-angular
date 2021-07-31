import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class BodyRequestsService{
  authReq: object = {
    'device': { 'mac' : '71:7C:ad:31:C2:67', 'type': 'DT_Web_Browser'}
  };

  sendBodyTvReq(token){
    return {
      'auth':token,
      'need_icons':false,
      'need_big_icons':false,
      'need_epg':false,
      'need_categories':true,
      'need_offsets':false
    }
  }

  sendBodyStream(token, id){
    return {
      'auth': token,
      'channel_id':id,
      'accept_scheme':["HTTP_HLS"],
      "epg_id": undefined,
      'multistream':true
    }
  }

  sendBodyStreamUpdate(token, idStream){
    return {
      'auth': token,
      'stream_id':idStream
    }
  }
}
