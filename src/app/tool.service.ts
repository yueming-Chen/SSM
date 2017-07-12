import { Injectable, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
@Injectable()
export class ToolService {
  private height: number;
  private windowHeight: number;
  private windowWidth: number;

  public windowresize = new EventEmitter();

  constructor(private router: Router) {
    this.detectWindowClient();
    this.resize();
  }

  detectWindowClient() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  getWindowClient() {
    return { height: this.windowHeight, width: this.windowWidth };
  }

  resize() {
    window.addEventListener('resize', (event) => {
      this.windowresize.next(event);
    });
  }

}
