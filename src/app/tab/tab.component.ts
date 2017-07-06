import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ym-tab',
  templateUrl: './tab.component.pug',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  private selected: string = 'home';
  contains(index) {
    return (index === this.selected) ? true : false;
  }

  tabClick($event) {
    this.selected = $event.target.id;
  }

  constructor() { }

  ngOnInit() {
  }

}
