import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-create-score',
  templateUrl: './create-score.component.pug',
  styleUrls: ['./create-score.component.scss']
})
export class CreateScoreComponent implements OnInit {

  private borrowClick: boolean = false;
  private cover = 'cover';
  public scorename: string = '';
  public scoreitems = [];
  constructor(private domSanitizer: DomSanitizer) {

  }

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
          this.scoreitems.push({ index: this.scoreitems.length + 1, url: this.domSanitizer.bypassSecurityTrustStyle('url(' + myReader.result + ')') });
          console.log(this.scoreitems);
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
