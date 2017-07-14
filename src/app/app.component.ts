import { Component } from '@angular/core';
import { ToolService } from './_service/tool.service';
import { AuthenticationService } from './_service/authentication-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private login: boolean = true;;
  constructor(private toolService: ToolService, private auth: AuthenticationService) {
    this.auth.loginStatusChange.subscribe((val) => {
      console.log(val)
      this.login = val;
    });
  }

  onResize(event) {
    console.log('innerHeight', event.target.innerHeight);
  }

}
