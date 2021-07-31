import {Component, Injectable, Input, OnInit} from '@angular/core';
/*import moment from "moment";*/

@Component({
  selector: 'app-epg',
  templateUrl: './epg.component.html',
  styleUrls: ['./epg.component.scss']
})
export class EpgComponent implements OnInit {

  @Input() epgList

  constructor(

  ) { }

  ngOnInit(): void {

  }

  add(){
    console.log(this.epgList, 'epgList');
  }

}
