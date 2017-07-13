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

  }

}
