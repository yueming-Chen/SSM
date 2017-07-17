import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
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

  submit() {

  }

}
