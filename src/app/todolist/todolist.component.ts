import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.pug',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  public today: number = Date.now();
  constructor() { }

  ngOnInit() {
  }

}
