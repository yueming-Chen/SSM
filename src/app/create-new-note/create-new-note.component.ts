import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as Rx from 'rxjs';
@Component({
  selector: 'app-create-new-note',
  templateUrl: './create-new-note.component.pug',
  styleUrls: ['./create-new-note.component.scss']
})
export class CreateNewNoteComponent implements OnInit {

  private important: string;
  private submitted: boolean = false;
  private name: string = "";
  private date: string;
  private borrowClick: boolean;
  private urgent: string = "--選擇緊迫度--";
  private listitem = [];

  public simpleDrop: any = null;
  public scoreitem: any;
  private mouseDown: Rx.Observable<any>;
  private mouseUp: Rx.Observable<any>;
  private mouseMove: Rx.Observable<any>;

  constructor(private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.mouseUp = Rx.Observable.fromEvent(document, 'mouseup');
    this.mouseMove = Rx.Observable.fromEvent(document, 'mousemove');
  }

  setDraggable(index) {
    let target = String(index);
    setTimeout(() => {
      this.scoreitem = document.getElementById(target);
      this.mouseDown = Rx.Observable.fromEvent(this.scoreitem, 'mousedown');
      this.mouseDown
        .map(e => this.mouseMove.takeUntil(this.mouseUp))
        .concatAll()
        .withLatestFrom(this.mouseDown, (move: any, down: any) => {
          return {
            x: this.validValue(move.clientX - down.offsetX, window.innerWidth - 240, 0),
            y: this.validValue(move.clientY - down.offsetY, window.innerHeight - 176, 0)
          }
        })
        .subscribe(pos => {
          this.scoreitem.style.top = pos.y + 'px';
          this.scoreitem.style.left = pos.x + 'px';
        });
    }, 30);
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
          this.listitem.push({ index: this.listitem.length + 1, url: this.domSanitizer.bypassSecurityTrustStyle('url(' + myReader.result + ')') });
          this.setDraggable(0);

        }.bind(this);
        myReader.readAsDataURL(val);
      }
    }
  }

  remove(index) {
    this.listitem = this.listitem
      .filter(val => { return val.index !== index })
      .map((val, index) => { val.index = index; return val });
  }

  submit(userForm: NgForm) {
    console.log(userForm);
    console.log('Name:' + userForm.controls['name'].value);
    console.log('Form Valid:' + userForm.valid);
    console.log('Form Submitted:' + userForm.submitted);
  }

}
