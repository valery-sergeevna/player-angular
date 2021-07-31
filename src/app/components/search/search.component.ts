import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @Input() channels
  @Input() filteredList: []

  constructor() { }

  filterList = (e) => {
    this.filteredList = this.channels.filter((channel)=> channel.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
  }

}
