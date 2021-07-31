import { Component, OnInit } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent{

  constructor() { }

  loadVideoStream(url) {
    if (Hls.isSupported()) {
      var video = <HTMLVideoElement> document.querySelector('.video');
      video.controls = true;
      video.muted = false;
      const hls = new Hls();
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        hls.attachMedia(video);
        video.play();
      });
    } else {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }
}
