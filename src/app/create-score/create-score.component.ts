import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as Rx from 'rxjs';

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

  setDraggable(index) {
    let target = String(index);
    console.log(target);
    setTimeout(() => {

      this.scoreitem = document.getElementById(target);
      this.mouseDown = Rx.Observable.fromEvent(this.scoreitem, 'mousedown');
      console.log(this.scoreitem);
      this.mouseDown
        .map(e => this.mouseMove.takeUntil(this.mouseUp))
        .concatAll()
        .withLatestFrom(this.mouseDown, (move: any, down: any) => {
          return {
            x: this.validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
            y: this.validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0)
          }
        })
        .subscribe(pos => {
          this.scoreitem.style.top = pos.y + 'px';
          this.scoreitem.style.left = pos.x + 'px';
        });
    }, 30);


  }

  fileread(inputValue) {
    let file: File[] = inputValue.target.files;
    for (let index in file) {
      let val = file[index];
      if (file[index] instanceof File) {
        let myReader: FileReader = new FileReader();
        myReader.onloadend = function (e) {
          this.scoreitems.push({ index: this.scoreitems.length + 1, url: this.domSanitizer.bypassSecurityTrustStyle('url(' + myReader.result + ')') });
          this.setDraggable(index);
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
