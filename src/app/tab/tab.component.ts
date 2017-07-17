import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolService } from '../_service/tool.service';
@Component({
  selector: 'ym-tab',
  templateUrl: './tab.component.pug',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TabComponent implements OnInit {
  public settingDisplay: boolean = false;
  private selected: string = 'todolist';
  contains(index) {
    return (index === this.selected) ? true : false;
  }

  tabClick($event) {
    this.selected = $event.target.id;
  }

  constructor(private toolservice: ToolService, private el: ElementRef) { }

  ngOnInit() {

  }
}
