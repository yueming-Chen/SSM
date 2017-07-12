import { Component } from '@angular/core';
import { ToolService } from './tool.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private toolService: ToolService) { }

  onResize(event) {
    console.log('innerHeight', event.target.innerHeight);
  }

}
