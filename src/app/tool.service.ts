import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
@Injectable()
export class ToolService {

  
  private height: number;
  private windowHeight: number;
  private windowWidth: number;

  constructor(private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .delay(500)
      .subscribe((event) => {
        let routeroutlet = document.getElementsByTagName('router-outlet');
        let routerHeight = routeroutlet[0].nextElementSibling.children[0];
        this.height = routerHeight.scrollHeight;
      });
    this.detectWindowClient();
  }

  detectWindowClient() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
  }

  getWindowClient() {
    return { height: this.windowHeight, width: this.windowWidth };
  }

}
