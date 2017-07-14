import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-score',
  templateUrl: './create-score.component.pug',
  styleUrls: ['./create-score.component.scss']
})
export class CreateScoreComponent implements OnInit {
  private borrowClick: boolean = false;
  public scorename: string = "";
  public items = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',];
  constructor() { }

  ngOnInit() {
  }

}
