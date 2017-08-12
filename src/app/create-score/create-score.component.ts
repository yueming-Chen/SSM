import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DraggableDirective } from '../draggable-directive.directive';
import * as Rx from 'rxjs';
declare var process;
@Component({
  selector: 'app-create-score',
  templateUrl: './create-score.component.pug',
  styleUrls: ['./create-score.component.scss']
})
export class CreateScoreComponent implements OnInit {
  private scoreitem: any;
  private mouseDown: Rx.Observable<any>;
  private mouseUp: Rx.Observable<any>;
  private mouseMove: Rx.Observable<any>;
  private borrowClick: boolean = false;
  private cover = 'cover';
  public scorename: string = '';
  public scoreitems = [];
  constructor(private domSanitizer: DomSanitizer) {
    console.log(process.env.NODE_ENV);
  }

  ngOnInit() {
    this.mouseUp = Rx.Observable.fromEvent(document, 'mouseup');
    this.mouseMove = Rx.Observable.fromEvent(document, 'mousemove');

  }

  validValue(value, max, min) {
    return Math.min(Math.max(value, min), max)
  }

  uploadNewScore($event) {
    this.fileread($event);
  }

  fileread(inputValue) {
    let file: File[] = inputValue.target.files;
    for (let index in file) {
      let val = file[index];
      if (file[index] instanceof File) {
        let myReader: FileReader = new FileReader();
        myReader.onloadend = function (e) {
          this.scoreitems.push({ index: this.scoreitems.length + 1, url: this.domSanitizer.bypassSecurityTrustStyle('url(' + myReader.result + ')') });

        }.bind(this);
        myReader.readAsDataURL(val);
      }
    }

  }

  remove(index) {
    this.scoreitems = this.scoreitems
      .filter(val => { return val.index !== index })
      .map((val, index) => { val.index = index; return val });
  }
}
