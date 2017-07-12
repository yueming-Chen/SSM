import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolService } from '../tool.service';
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

  constructor(private toolservice: ToolService, private el: ElementRef) { }

  ngOnInit() {
    let { height } = this.toolservice.getWindowClient();
    this.el.nativeElement.style.minHeight = height + 'px';
    this.toolservice.windowresize.subscribe(
      (r) => {
        this.el.nativeElement.style.minHeight = r.target.innerHeight + 'px';
      },
      (err) => { console.log(err) },
      () => { console.log('complete.') }
    );
  }
}
