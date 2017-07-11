import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
@Injectable()
export class ToolService {
  private height: number;

  constructor(private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        //get router-outlet height
      });
  }

}
